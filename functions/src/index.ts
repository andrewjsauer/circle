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
  createSilenceBuffer,
  getVoice,
  generateTextForAudio,
  generateContent,
} from "./utils";

admin.initializeApp();

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

      functions.logger.info(`Content: ${content}`);
      functions.logger.info(`System content: ${systemContent}`);

      const completion: any = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemContent,
          },
          {
            role: "assistant",
            content: content,
          },
        ],
        temperature: 0.2,
      });

      const textForAudio = generateTextForAudio(
        completion.data.choices[0].message.content,
        functions,
      );

      functions.logger.info(
        `Text: ${textForAudio}. Is array: ${Array.isArray(
          textForAudio,
        )}. Length: ${textForAudio.length}`,
      );

      const textToSpeechKeys = JSON.parse(process.env.TEXT_TO_SPEECH_KEY);
      const client = new textToSpeech.TextToSpeechClient({
        credentials: {
          client_email: textToSpeechKeys.client_email,
          private_key: textToSpeechKeys.private_key,
        },
      });

      const voiceName = getVoice(data.voice);
      const silenceBuffer = createSilenceBuffer(data.time);

      ffmpeg.setFfmpegPath(ffmpegInstaller.path);
      ffmpeg.setFfprobePath(ffprobeInstaller.path);

      const audioBuffers = [];

      for (const text of textForAudio) {
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
        audioBuffers.push(response.audioContent);

        if (text !== textForAudio[textForAudio.length - 1]) {
          audioBuffers.push(silenceBuffer);
          functions.logger.info("Adding silence buffer");
        }
      }

      const combinedAudioBuffer = Buffer.concat(audioBuffers);
      const audioStream = Readable.from(combinedAudioBuffer);

      const file = bucket.file("output.mp3");

      const uploadPromise = new Promise<string>((resolve, reject) => {
        const writeStream = file.createWriteStream({
          metadata: {
            contentType: "audio/mpeg",
          },
        });

        ffmpeg(audioStream)
          .inputFormat("s16le")
          .inputOptions(["-ar 16000", "-ac 1"]) // Set input sample rate and channels
          .audioCodec("libmp3lame")
          .audioBitrate(128)
          .outputOptions("-f mp3") // Set output format to MP3
          .pipe(writeStream);

        writeStream.on("finish", async () => {
          functions.logger.info("Finished upload", file);

          try {
            const currentDate = new Date();
            const expirationDate = new Date(
              currentDate.getTime() + 24 * 60 * 60 * 1000,
            );

            const url = await file.getSignedUrl({
              action: "read",
              expires: expirationDate,
            });

            functions.logger.info("Signed url: " + JSON.stringify(url));

            resolve(url[0]);
          } catch (error) {
            functions.logger.info("Error getting signed url: " + error);
            reject(error);
          }
        });

        writeStream.on("error", (error) => {
          reject(error);
        });
      });

      try {
        const audioUrl = await uploadPromise;
        return audioUrl;
      } catch (error) {
        functions.logger.info("Error uploading: " + error);
        return error;
      }
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
