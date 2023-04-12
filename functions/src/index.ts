/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { defineSecret } from "firebase-functions/params";
import textToSpeech from "@google-cloud/text-to-speech";

import * as ffmpeg from "fluent-ffmpeg";
import * as ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import * as ffprobeInstaller from "@ffprobe-installer/ffprobe";

import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";
import { Configuration, OpenAIApi } from "openai";

import {
  applyFadeInOut,
  createSilenceBuffer,
  generateContent,
  getVoice,
} from "./utils";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "gs://circle-5fafc.appspot.com",
});

const bucket = admin.storage().bucket();

const openApiKey = defineSecret("OPEN_AI_API_KEY");
const googleTextToSpeech = defineSecret("TEXT_TO_SPEECH_KEY");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const createMeditation = functions
  .runWith({ secrets: [openApiKey, googleTextToSpeech] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!",
      );
    }

    try {
      const { content, systemContent } = generateContent(data);
      let userContent = content;

      functions.logger.info(`Content: ${content}`);
      functions.logger.info(`System content: ${systemContent}`);

      let isValid = false;
      let numOfRetries = 0;
      let isTryingAgain = false;
      let meditation = null;

      while (!isValid) {
        try {
          if (numOfRetries > 3) {
            functions.logger.info("Too many retries, throwing error");
            throw new functions.https.HttpsError(
              "invalid-argument",
              "Invalid response received from OpenAI",
            );
          }

          if (isTryingAgain) {
            userContent = `Just format the meditation as an array of strings with no commentary or apology. Try this prompt again: ${content}`;
          }

          functions.logger.info(`User content: ${userContent}`);

          const completion: any = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: systemContent,
              },
              {
                role: "assistant",
                content: userContent,
              },
            ],
            temperature: 0.5,
          });

          functions.logger.info(
            "OpenAI response",
            completion.data.choices[0].message.content,
          );

          try {
            const parsedJSON = JSON.parse(
              completion.data.choices[0].message.content,
            );

            if (
              Array.isArray(parsedJSON) &&
              parsedJSON.every((item) => typeof item === "string")
            ) {
              meditation = parsedJSON;
              isValid = true;
            } else {
              numOfRetries += 1;
              isTryingAgain = true;
              functions.logger.info(
                "Invalid response received, trying again...",
              );
            }
          } catch (error) {
            numOfRetries += 1;
            isTryingAgain = true;
            functions.logger.info("JSON parsing error, trying again...");
          }
        } catch (e) {
          functions.logger.info("Invalid something", e);

          throw new functions.https.HttpsError(
            "invalid-argument",
            "Invalid content returned from OpenAI!",
          );
        }
      }

      const textToSpeechKeys = JSON.parse(process.env.TEXT_TO_SPEECH_KEY);
      const client = new textToSpeech.TextToSpeechClient({
        credentials: {
          client_email: textToSpeechKeys.client_email,
          private_key: textToSpeechKeys.private_key,
        },
      });

      const voiceName = getVoice(data.voice);
      const silenceBuffer = createSilenceBuffer(data.time, meditation.length);

      ffmpeg.setFfmpegPath(ffmpegInstaller.path);
      ffmpeg.setFfprobePath(ffprobeInstaller.path);

      const audioBuffers = [];

      for (const text of meditation) {
        const request: any = {
          input: { text: text },
          voice: {
            languageCode: "en-US",
            name: voiceName,
          },
          audioConfig: {
            audioEncoding: "LINEAR16",
            sampleRateHertz: 16000,
            speakingRate: 0.6,
          },
        };

        const [response] = await client.synthesizeSpeech(request);
        const speechBuffer = applyFadeInOut(response.audioContent);
        audioBuffers.push(speechBuffer);

        if (text !== meditation[meditation.length - 1]) {
          audioBuffers.push(silenceBuffer);
          functions.logger.info("Adding silence buffer");
        }
      }

      const combinedAudioBuffer = Buffer.concat(audioBuffers);
      const audioStream = Readable.from(combinedAudioBuffer);

      const meditationId = uuidv4();
      const file = bucket.file(`audio/${meditationId}.mp3`);

      const uploadPromise = new Promise<void>((resolve, reject) => {
        try {
          const writeStream = file.createWriteStream({
            metadata: {
              contentType: "audio/mpeg",
            },
          });

          const ffmpegCommand = ffmpeg(audioStream)
            .inputFormat("s16le")
            .inputOptions(["-ar 16000", "-ac 1"])
            .audioCodec("libmp3lame")
            .audioBitrate(128)
            .outputOptions("-f mp3");

          functions.logger.info(
            "FFmpeg command:",
            ffmpegCommand._getArguments(),
          );

          ffmpegCommand.pipe(writeStream).on("error", (error) => {
            functions.logger.error("Error during FFmpeg processing:", error);
          });

          writeStream.on("finish", () => {
            functions.logger.info("Finished upload");
            resolve();
          });

          writeStream.on("error", (error) => {
            functions.logger.error(
              "Error during write stream processing:",
              error,
            );

            reject(new Error(`Error during write stream: ${error.message}`));
          });
        } catch (error) {
          functions.logger.error("Unhandled error:", error);
          reject(new Error(`Unhandled error: ${error.message}`));
        }
      });

      try {
        await uploadPromise;
      } catch (error) {
        functions.logger.error("Error uploading audio:", error.message);
        functions.logger.error("Stack trace:", error.stack);
        throw error;
      }

      return meditationId;
    } catch (error: any) {
      if (error.response) {
        functions.logger.info(`Error status ${error.response.status}`);
        functions.logger.info(
          `Error data ${JSON.stringify(error.response.data)}`,
        );
      } else {
        functions.logger.info(`Error message ${error}`);
      }

      return error;
    }
  });
