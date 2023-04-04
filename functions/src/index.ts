/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { defineSecret } from "firebase-functions/params";
import textToSpeech from "@google-cloud/text-to-speech";

import { Readable } from "stream";

import { Configuration, OpenAIApi } from "openai";

import { getVoice, generateTextForAudio, generateContent } from "./utils";

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

      const gptContent = completion.data.choices[0].message.content.replace(
        /\n/g,
        "",
      );
      functions.logger.info(`GPT content: ${gptContent}`);

      const textForAudio = await generateTextForAudio(
        gptContent,
        functions,
        data.time,
      );

      functions.logger.info(`TextForAudio: ${textForAudio}`);

      const textToSpeechKeys = JSON.parse(process.env.TEXT_TO_SPEECH_KEY);
      const client = new textToSpeech.TextToSpeechClient({
        credentials: {
          client_email: textToSpeechKeys.client_email,
          private_key: textToSpeechKeys.private_key,
        },
      });

      const ssmlVoice = getVoice(data.voice);

      const request: any = {
        input: { ssml: textForAudio },
        voice: {
          languageCode: "en-US",
          name: ssmlVoice,
        },
        audioConfig: {
          audioEncoding: "MP3",
        },
      };

      functions.logger.info(`Request: ${JSON.stringify(request)}`);

      const [response] = await client.synthesizeSpeech(request);

      functions.logger.info(`Response: ${JSON.stringify(response)}`);

      const audioStream = new Readable();
      audioStream.push(response.audioContent);
      audioStream.push(null);

      const file = bucket.file("output.mp3");
      audioStream.pipe(
        file.createWriteStream({
          metadata: {
            contentType: "audio/mpeg",
          },
        }),
      );

      return "done";
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
