import { Configuration, OpenAIApi } from "openai";
import * as functions from "firebase-functions";

export const createMeditation = functions
  .runWith({ secrets: ["OPEN_AI_API_KEY"] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Endpoint requires authentication!",
      );
    }

    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello!" }],
      });

      functions.logger.info(completion.data.choices[0].text, {
        structuredData: true,
      });
    } catch (error) {
      if (error.response) {
        functions.logger.info(error.response.status, { structuredData: true });
        functions.logger.info(error.response.data, { structuredData: true });
      } else {
        console.log(error.message);
        functions.logger.info(error.message, { structuredData: true });
      }
    }
  });
