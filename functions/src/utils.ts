/* eslint-disable max-len */
export const generateContent = (data) => {
  const { technique, typeOfDay, time, goal, type } = data;

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

  const contentLength = lengthTime(time);
  const day = typeOfDay === "no-preference" ? "" : typeOfDay;

  const systemContent = `You are a highly skilled ${type} meditation instructor with expertise in ${technique} techniques. Your task is to provide guidance on how to practice this meditation effectively.`;
  const content = `Please create a ${contentLength}, guided ${day} ${type} meditation script, focusing on ${goal}. Provide the script as an array of 3-4 strings, like this: "[string 1, string 2, string 3]". Do not include apologies, notes, or commentary, only return an array of strings.`;

  return { content, systemContent };
};

export const getVoice = (voice) => {
  const isMale = voice === "male";
  const voiceName = isMale ? "en-US-Studio-M" : "en-US-Studio-O";

  return voiceName;
};

const SAMPLE_RATE_HERTZ = 16000;
const CHANNELS = 2;
const ONE_MINUTE_DURATION_SECONDS = 60;

// ADD

export const applyFadeInOut = (buffer, fadeDurationInMs = 20) => {
  const fadeDurationInSeconds = fadeDurationInMs / 1000;
  const fadeDurationInSamples = Math.floor(
    fadeDurationInSeconds * SAMPLE_RATE_HERTZ * CHANNELS,
  );

  for (let i = 0; i < fadeDurationInSamples; i++) {
    const fadeFactor = i / fadeDurationInSamples;
    buffer.writeInt16LE(buffer.readInt16LE(i * 2) * fadeFactor, i * 2);
    buffer.writeInt16LE(
      buffer.readInt16LE(buffer.length - i * 2 - 2) * fadeFactor,
      buffer.length - i * 2 - 2,
    );
  }

  return buffer;
};

export const createSilenceBuffer = (maxMinutes, numberOfDivisions) => {
  const maxSeconds = maxMinutes * ONE_MINUTE_DURATION_SECONDS;
  const silenceDurationInSeconds = maxSeconds / numberOfDivisions;
  const size = silenceDurationInSeconds * SAMPLE_RATE_HERTZ * CHANNELS * 2;

  const buffer = Buffer.alloc(size, 0);
  return applyFadeInOut(buffer);
};
