import { MMKV } from "react-native-mmkv";

export enum AppStorageKeys {
  LANGUAGE = "language",
}

// Customization: https://github.com/mrousavy/react-native-mmkv#customize
export default new MMKV();
