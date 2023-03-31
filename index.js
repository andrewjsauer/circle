import "react-native-gesture-handler";
import "reflect-metadata";

import { AppRegistry } from "react-native";

import "./src/utils/setup-debug";
import { name as appName } from "./app.json";
import App from "./src";

AppRegistry.registerComponent(appName, () => App);
