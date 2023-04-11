import "react-native-gesture-handler";
import "reflect-metadata";

import { AppRegistry } from "react-native";

import "./src/utils/setup-debug";
import { name as appName } from "./app.json";
import App from "./src";

import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "./service";

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
