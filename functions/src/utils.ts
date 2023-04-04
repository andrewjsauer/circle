/* eslint-disable max-len */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ssmlCheck = require("ssml-check");

export const generateContent = (data) => {
  const { focus, technique, goals, time } = data;

  const checkDataForNoPreference = (value) =>
    value === "no-preference" ? null : value;

  const breakTime = (value) => {
    switch (value) {
      case "short":
        return "60";
      case "medium":
        return "90";
      case "long":
        return "120";
      case "very-long":
        return "150";
      default:
        return "90";
    }
  };

  const lengthTime = (value) => {
    switch (value) {
      case "short":
        return "2-5 minutes";
      case "medium":
        return "5-10 minutes";
      case "long":
        return "10-20 minutes";
      case "very-long":
        return "20+ minutes";
      default:
        return "5-10 minutes";
    }
  };

  const focusContent = checkDataForNoPreference(technique);
  const techniqueContent = checkDataForNoPreference(focus);
  const goalsContent = checkDataForNoPreference(goals);
  const breakInSeconds = breakTime(time);
  const lengthInMinutes = lengthTime(time);

  const content = `Create a meditation in Speech Synthesis Markup Language. Make meditation ${lengthInMinutes} long. Add 6 or more breaks of at least ${breakInSeconds} seconds, i.e. <break time="${breakInSeconds}s" />. Do not include a <voice /> tag.`;
  const systemContent = `You are a professional meditation teacher or a meditation instructor. You are creating a meditation for a client who is looking for a ${
    data.type
  } meditation with the following preferences:
    ${techniqueContent && `technique of ${techniqueContent},`}
    ${focusContent && `focus on ${focusContent},`}
    ${goalsContent && `goal of ${goalsContent},`}
    .`;

  return { content, systemContent };
};

const breakTimes = (value) => {
  switch (value) {
    case "short":
      return "120s";
    case "medium":
      return "300s";
    case "long":
      return "720s";
    case "very-long":
      return "1200s";
    default:
      return "300s";
  }
};

export const generateTextForAudio = async (
  content,
  functions,
  time,
): Promise<any> => {
  let textForAudio = content;

  const doesContentStartWithXMLorSpeak = /^<(xml|speak)>/;
  const isContentValid = doesContentStartWithXMLorSpeak.test(content);

  if (!isContentValid) {
    const parseGPTCommentary = /<speak>[\s\S]*<\/speak>/;
    const didParseGPTCommentary = content.match(parseGPTCommentary);

    if (didParseGPTCommentary) textForAudio = didParseGPTCommentary[0];
  }

  functions.logger.info(`Modified: ${textForAudio}`);

  try {
    const result = await ssmlCheck.verifyAndFix(textForAudio);

    if (result?.fixedSSML) {
      functions.logger.info(`SSML fixed: ${result.fixedSSML}`);
      textForAudio = result.fixedSSML;
    } else if (result.errors) {
      functions.logger.info(`SSML Error: ${JSON.stringify(result.errors)}`);
    } else {
      functions.logger.info("SSML is clean");
    }
  } catch (error) {
    functions.logger.info(`SSML Catch Error: ${error}`);
  }

  const breakTimeSeconds = breakTimes(time);

  const regex = new RegExp("<break time=(['\"])(\\d+\\w*)\\1 />", "g");
  textForAudio = textForAudio.replace(
    regex,
    () => `<break time="${breakTimeSeconds}" />`,
  );

  return textForAudio;
};

export const getVoice = (voice) => {
  const isMale = voice === "male";
  const ssmlVoice = isMale ? "en-US-Neural2-J" : "en-US-Neural2-F";

  return ssmlVoice;
};
