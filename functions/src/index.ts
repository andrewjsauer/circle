/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { defineSecret } from "firebase-functions/params";

import * as ssmlCheck from "ssml-check";
import axios from "axios";
import { camelizeKeys } from "humps";

import { v4 as uuidv4 } from "uuid";
import { Configuration, OpenAIApi } from "openai";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

import { getVoice, streamToBuffer } from "./utils";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "gs://circle-5fafc.appspot.com",
});

const bucket = admin.storage().bucket();
const storage = admin.firestore();
const { FieldValue } = admin.firestore;

const openApiKey = defineSecret("OPEN_AI_API_KEY");
const awsAccessKey = defineSecret("AWS_TEXT_TO_SPEECH_ACCESS_KEY");
const awsSecretKey = defineSecret("AWS_TEXT_TO_SPEECH_KEY");
const appleSharedSecret = defineSecret("APPLE_SHARED_SECRET");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getContent = functions
  .runWith({ secrets: [openApiKey], timeoutSeconds: 5 * 60 })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!",
      );
    }

    let content = null;
    const { prompt } = data;

    const systemContent =
      // eslint-disable-next-line quotes
      `You are an expert in meditation practices, teaching, and scripting. Your assignment is to generate a top-tier meditation script adhering to the SSML format. Here's an example: "<speak><prosody rate="slow"><p><s>example sentence</s><break time="10s"/></p></prosody></speak>". It is important to integrate suitable pauses between sentences, like this: <break time="5s" />, and to incorporate extended silent intervals during the session for contemplation, like this: <break time="30s" />. Your output should exclusively be a meditation script in the SSML format.`;

    try {
      const openAIResponse = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemContent,
          },
          {
            role: "assistant",
            content: prompt,
          },
        ],
        max_tokens: 800,
        temperature: 0.8,
      });

      ({ content } = openAIResponse.data.choices[0].message);
      functions.logger.info("OpenAI response", content);

      ssmlCheck.verifyAndFix(content).then((result) => {
        if (result.fixedSSML) {
          functions.logger.info("Fixed SSML response", result.fixedSSML);
          content = result.fixedSSML;
        } else if (result.errors) {
          throw new Error("Invalid parsed response received from OpenAI");
        } else {
          functions.logger.info("No errors or fixes found in SSML response");
        }
      });

      return { content, usage: openAIResponse.data.usage };
    } catch (error: any) {
      if (error.response) {
        functions.logger.info(`Error status ${error.response.status}`);
        functions.logger.info(
          `Error data ${JSON.stringify(error.response.data)}`,
        );
      } else {
        functions.logger.info(`Error message ${error}`);
      }

      return { error: JSON.stringify(error) };
    }
  });

export const getAudio = functions
  .runWith({ secrets: [awsAccessKey, awsSecretKey] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!",
      );
    }

    const { content } = data;

    try {
      const polly = new PollyClient({
        credentials: {
          accessKeyId: process.env.AWS_TEXT_TO_SPEECH_ACCESS_KEY,
          secretAccessKey: process.env.AWS_TEXT_TO_SPEECH_KEY,
        },
        region: "us-west-2",
      });

      const request = {
        OutputFormat: "mp3",
        Text: content,
        TextType: "ssml",
        VoiceId: getVoice(data.voice),
        Engine: "neural",
      };

      functions.logger.info("Requesting audio from AWS Polly");

      const response = await polly.send(new SynthesizeSpeechCommand(request));
      const audioContent: any = await streamToBuffer(response.AudioStream);

      const audioId = uuidv4();
      const file = bucket.file(`audio/${audioId}.mp3`);

      await file.save(audioContent, {
        metadata: {
          contentType: "audio/mpeg",
        },
      });

      functions.logger.info("Audio uploaded successfully");
      return { audioId };
    } catch (error: any) {
      if (error.response) {
        functions.logger.error(`Error status ${error.response.status}`);
        functions.logger.error(
          `Error data ${JSON.stringify(error.response.data)}`,
        );
      } else {
        functions.logger.error(`Error message ${error}`);
      }

      return { error: JSON.stringify(error) };
    }
  });

export const validateReceipt = functions
  .runWith({ secrets: [appleSharedSecret] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!",
      );
    }

    const { receipt, isTest, userId, isSubscribed } = data;
    functions.logger.info("Validating receipt", JSON.stringify(data));

    let result;

    const url = isTest
      ? "https://sandbox.itunes.apple.com/verifyReceipt"
      : "https://buy.itunes.apple.com/verifyReceipt";

    const request = {
      "receipt-data": receipt,
      password: process.env.APPLE_SHARED_SECRET,
      exclude_old_transactions: true,
    };

    functions.logger.info("Apple request", request);

    try {
      const response = await axios.post(url, request);
      result = camelizeKeys(response.data);

      functions.logger.info("Apple response", result);
    } catch (error: any) {
      functions.logger.error(`Error ${error}`);
      return { error: JSON.stringify(error) };
    }

    if (result.status === 0) {
      functions.logger.info("Receipt is valid");

      if (!isSubscribed) {
        try {
          const subscriptionRef = storage
            .collection("subscriptions")
            .doc(userId);
          await subscriptionRef.set(
            {
              isSubscribed: true,
            },
            { merge: true },
          );

          const subscriptionCollectionRef = storage
            .collection("subscriptions")
            .doc(userId)
            .collection("subscriptions")
            .doc();
          await subscriptionCollectionRef.set(
            {
              subscriptions: FieldValue.arrayUnion(result),
            },
            { merge: true },
          );
        } catch (error: any) {
          functions.logger.error(`Error updating receipt: ${error}`);
          return { error: JSON.stringify(error) };
        }
      } else {
        functions.logger.info("User already subscribed");
      }

      return true;
    } else if (result.status === 21006) {
      functions.logger.info("Receipt is valid, but subscription has expired");

      try {
        const subscriptionRef = storage.collection("subscriptions").doc(userId);
        await subscriptionRef.set({ isSubscribed: false }, { merge: true });
      } catch (error: any) {
        functions.logger.error(`Error updating subscription: ${error}`);
        return { error: JSON.stringify(error) };
      }

      return { error: "Subscription has expired" };
    } else if (result.status === 21007 || result.status === 21008) {
      functions.logger.info("Receipt is invalid or could not be authenticated");

      try {
        const subscriptionRef = storage.collection("subscriptions").doc(userId);
        await subscriptionRef.set({ isSubscribed: false }, { merge: true });
      } catch (error: any) {
        functions.logger.error(`Error updating subscription: ${error}`);
        return { error: JSON.stringify(error) };
      }

      return { error: "Receipt is invalid or could not be authenticated" };
    } else if (result.status === 21100 || result.status === 21199) {
      functions.logger.info("Internal error occurred");
      return { error: "Internal error occurred" };
    } else if (result.status === 21010) {
      functions.logger.info("Subscription has been cancelled");

      try {
        const subscriptionRef = storage.collection("subscriptions").doc(userId);
        await subscriptionRef.set({ isSubscribed: false }, { merge: true });
      } catch (error: any) {
        functions.logger.error(`Error updating subscription: ${error}`);
        return { error: JSON.stringify(error) };
      }

      return { error: "Subscription has been cancelled" };
    }
  });

// export const getAudio = functions
//   .runWith({ secrets: [googleTextToSpeech] })
//   .https.onCall(async (data, context) => {
//     if (!context.auth) {
//       throw new functions.https.HttpsError(
//         "unauthenticated",
//         "Endpoint requires authentication!",
//       );
//     }

//     const { content } = data;

//     try {
//       const textToSpeechKeys = JSON.parse(process.env.TEXT_TO_SPEECH_KEY);
//       const client = new textToSpeech.TextToSpeechClient({
//         credentials: {
//           client_email: textToSpeechKeys.client_email,
//           private_key: textToSpeechKeys.private_key,
//         },
//       });

//       const request: any = {
//         input: { ssml: content },
//         voice: {
//           languageCode: "en-US",
//           name: getVoice(data.voice),
//         },
//         audioConfig: {
//           audioEncoding: "MP3",
//           speakingRate: 0.75,
//         },
//       };

//       const [response] = await client.synthesizeSpeech(request);
//       const audioContent: any = response.audioContent;

//       const audioId = uuidv4();
//       const file = bucket.file(`audio/${audioId}.mp3`);

//       await file.save(audioContent, {
//         metadata: {
//           contentType: "audio/mpeg",
//         },
//       });

//       functions.logger.info("Audio uploaded successfully");
//       return { audioId };
//     } catch (error: any) {
//       if (error.response) {
//         functions.logger.error(`Error status ${error.response.status}`);
//         functions.logger.error(
//           `Error data ${JSON.stringify(error.response.data)}`,
//         );
//       } else {
//         functions.logger.error(`Error message ${error}`);
//       }

//       return { error: JSON.stringify(error) };
//     }
//   });

// export const createMeditation = functions
//   .runWith({ secrets: [openApiKey, googleTextToSpeech] })
//   .https.onCall(async (data, context) => {
//     if (!context.auth) {
//       throw new functions.https.HttpsError(
//         "unauthenticated",
//         "Endpoint requires authentication!",
//       );
//     }

//     try {
//       const { content, systemContent } = generateContent(data);
//       let userContent = content;

//       functions.logger.info(`Content: ${content}`);
//       functions.logger.info(`System content: ${systemContent}`);

//       let isValid = false;
//       let numOfRetries = 0;
//       let isTryingAgain = false;
//       let meditation = null;

//       while (!isValid) {
//         try {
//           if (numOfRetries > 3) {
//             functions.logger.info("Too many retries, throwing error");
//             throw new functions.https.HttpsError(
//               "invalid-argument",
//               "Invalid response received from OpenAI",
//             );
//           }

//           if (isTryingAgain) {
//             userContent = `Just format the meditation as an array of strings with no commentary or apology. Try this prompt again: ${content}`;
//           }

//           functions.logger.info(`User content: ${userContent}`);

//           const completion: any = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: [
//               {
//                 role: "system",
//                 content: systemContent,
//               },
//               {
//                 role: "assistant",
//                 content: userContent,
//               },
//             ],
//             temperature: 0.5,
//           });

//           functions.logger.info(
//             "OpenAI response",
//             completion.data.choices[0].message.content,
//           );

//           try {
//             const parsedJSON = JSON.parse(
//               completion.data.choices[0].message.content,
//             );

//             if (
//               Array.isArray(parsedJSON) &&
//               parsedJSON.every((item) => typeof item === "string")
//             ) {
//               meditation = parsedJSON;
//               isValid = true;
//             } else {
//               numOfRetries += 1;
//               isTryingAgain = true;
//               functions.logger.info(
//                 "Invalid response received, trying again...",
//               );
//             }
//           } catch (error) {
//             numOfRetries += 1;
//             isTryingAgain = true;
//             functions.logger.info("JSON parsing error, trying again...");
//           }
//         } catch (e) {
//           functions.logger.info("Invalid something", e);

//           throw new functions.https.HttpsError(
//             "invalid-argument",
//             "Invalid content returned from OpenAI!",
//           );
//         }
//       }

//       const textToSpeechKeys = JSON.parse(process.env.TEXT_TO_SPEECH_KEY);
//       const client = new textToSpeech.TextToSpeechClient({
//         credentials: {
//           client_email: textToSpeechKeys.client_email,
//           private_key: textToSpeechKeys.private_key,
//         },
//       });

//       const voiceName = getVoice(data.voice);
//       const silenceBuffer = createSilenceBuffer(data.time, meditation.length);

//       ffmpeg.setFfmpegPath(ffmpegInstaller.path);
//       ffmpeg.setFfprobePath(ffprobeInstaller.path);

//       const audioBuffers = [];

//       for (const text of meditation) {
//         const request: any = {
//           input: { text: text },
//           voice: {
//             languageCode: "en-US",
//             name: voiceName,
//           },
//           audioConfig: {
//             audioEncoding: "LINEAR16",
//             sampleRateHertz: 16000,
//             speakingRate: 0.6,
//           },
//         };

//         const [response] = await client.synthesizeSpeech(request);
//         const speechBuffer = applyFadeInOut(response.audioContent);
//         audioBuffers.push(speechBuffer);

//         if (text !== meditation[meditation.length - 1]) {
//           audioBuffers.push(silenceBuffer);
//           functions.logger.info("Adding silence buffer");
//         }
//       }

//       const combinedAudioBuffer = Buffer.concat(audioBuffers);
//       const audioStream = Readable.from(combinedAudioBuffer);

//       const meditationId = uuidv4();
//       const file = bucket.file(`audio/${meditationId}.mp3`);

//       const uploadPromise = new Promise<void>((resolve, reject) => {
//         try {
//           const writeStream = file.createWriteStream({
//             metadata: {
//               contentType: "audio/mpeg",
//             },
//           });

//           const ffmpegCommand = ffmpeg(audioStream)
//             .inputFormat("s16le")
//             .inputOptions(["-ar 16000", "-ac 1"])
//             .audioCodec("libmp3lame")
//             .audioBitrate(128)
//             .outputOptions("-f mp3");

//           functions.logger.info(
//             "FFmpeg command:",
//             ffmpegCommand._getArguments(),
//           );

//           ffmpegCommand.pipe(writeStream).on("error", (error) => {
//             functions.logger.error("Error during FFmpeg processing:", error);
//           });

//           writeStream.on("finish", () => {
//             functions.logger.info("Finished upload");
//             resolve();
//           });

//           writeStream.on("error", (error) => {
//             functions.logger.error(
//               "Error during write stream processing:",
//               error,
//             );

//             reject(new Error(`Error during write stream: ${error.message}`));
//           });
//         } catch (error) {
//           functions.logger.error("Unhandled error:", error);
//           reject(new Error(`Unhandled error: ${error.message}`));
//         }
//       });

//       try {
//         await uploadPromise;
//       } catch (error) {
//         functions.logger.error("Error uploading audio:", error.message);
//         functions.logger.error("Stack trace:", error.stack);
//         throw error;
//       }

//       return meditationId;
//     } catch (error: any) {
//       if (error.response) {
//         functions.logger.info(`Error status ${error.response.status}`);
//         functions.logger.info(
//           `Error data ${JSON.stringify(error.response.data)}`,
//         );
//       } else {
//         functions.logger.info(`Error message ${error}`);
//       }

//       return error;
//     }
//   });
