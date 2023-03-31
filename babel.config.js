module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
  plugins: [
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    [
      "module:react-native-dotenv",
      {
        moduleName: "react-native-dotenv",
        path: ".env",
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: true,
      },
    ],
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".ios.js",
          ".android.js",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "*": ".",
          "@assets": "./src/assets",
          "@config": "./src/config",
          "@lib": "./src/lib",
          "@localization": "./src/localization",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@utils": "./src/utils",
          "@screens": "./src/screens",
          "@store": "./src/store",
          "@constants": "./src/constants",
          "@types": "./src/types",
        },
      },
    ],
    [
      "react-native-reanimated/plugin",
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
