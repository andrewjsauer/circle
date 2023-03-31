import { Resource } from "i18next";
import { LanguageCodes, Languages } from "../constants/langauge";
import enJSON from "../locales/en_US.json";
import esJSON from "../locales/es_ES.json";

export const languageResources: Resource = {
  [Languages.en]: {
    translation: enJSON,
  },
  [Languages.es]: {
    translation: esJSON,
  },
};

export const languageFromLanguageCode = {
  [LanguageCodes.en]: Languages.en,
  [LanguageCodes.es]: Languages.es,
};

export const languageCodeFromLanguage = {
  [Languages.en]: LanguageCodes.en,
  [Languages.es]: LanguageCodes.es,
};
