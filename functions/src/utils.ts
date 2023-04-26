/* eslint-disable max-len */
export const getVoice = (voice) => {
  const isMale = voice === "male";
  const voiceName = isMale ? "Matthew" : "Joanna";

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

export const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
};
