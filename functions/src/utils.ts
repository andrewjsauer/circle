/* eslint-disable max-len */

export const generateContent = (data) => {
  const { focus, technique, goals, time, experience } = data;

  const checkDataForNoPreference = (value) =>
    value === "no-preference" ? null : value;

  const lengthTime = (value) => {
    switch (value) {
      case "short":
        return "short in length";
      case "medium":
        return "medium in length";
      case "long":
        return "long in length";
      case "very-long":
        return "very long in length";
      default:
        return "medium in length";
    }
  };

  const focusContent = checkDataForNoPreference(technique);
  const techniqueContent = checkDataForNoPreference(focus);
  const goalsContent = checkDataForNoPreference(goals);
  const contentLength = lengthTime(time);

  const content = `Create a meditation as an array of 3 strings. Make content ${contentLength}. Do not include notes or commentary, only the array.`;
  const systemContent = `You are a professional meditation teacher and instructor. You are creating a meditation for a ${experience} client in meditation who is looking for a ${
    data.type
  } meditation with the following preferences:
    ${techniqueContent && `technique of ${techniqueContent},`}
    ${focusContent && `focus on ${focusContent},`}
    ${goalsContent && `goal of ${goalsContent}`}.`;

  return { content, systemContent };
};

const isValid = (arr) => {
  if (arr.length >= 10) {
    return false;
  }

  return arr.every((item) => typeof item === "string");
};

export const generateTextForAudio = (content, functions): any => {
  const arrayOfStrings = JSON.parse(content);

  if (!isValid(arrayOfStrings)) {
    functions.logger.info(
      "Invalid content returned from OpenAI!",
      arrayOfStrings,
    );

    throw new functions.https.HttpsError(
      "invalid-argument",
      "Invalid content returned from OpenAI!",
    );
  }

  return arrayOfStrings;
};

export const getVoice = (voice) => {
  const isMale = voice === "male";
  const voiceName = isMale ? "en-US-Studio-M" : "en-US-Studio-O";

  return voiceName;
};

const SAMPLE_RATE_HERTZ = 16000;
const CHANNELS = 2;
const ONE_MINUTE_DURATION_SECONDS = 60;

export const createSilenceBuffer = (minutesOfSilence) => {
  const size =
    minutesOfSilence *
    ONE_MINUTE_DURATION_SECONDS *
    SAMPLE_RATE_HERTZ *
    CHANNELS *
    2;

  return Buffer.alloc(size, 0);
};
