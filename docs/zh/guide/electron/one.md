---
title: "Webpack"
---

# Webpack configuration

**Output**

## Webpack Setting

::: tip

- Customize output directory as `../dist/electron`
- Customize output file name as `entry.main` = `[name]`
- Must set target as **`electron-main`** if you are about to build a electron app
- Must set target as **`electron-renderer`** if you are about to build a electron renderer
  :::

In the file `../dist/electron`

```js
"use strict";

process.env.BABEL_ENV = "main";

const path = require("path");
const { dependencies } = require("../package.json");
const webpack = require("webpack");

const BabiliWebpackPlugin = require("babili-webpack-plugin");

let mainConfig = {
  entry: {
    main: path.join(__dirname, "../src/main/index.js"),
  },
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "../dist/electron"),
  },
  target: "electron-main",
  externals: [...Object.keys(dependencies || {})],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
        },
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: "node-loader",
      },
    ],
  },
  node: {
    __dirname: process.env.NODE_ENV !== "production",
    __filename: process.env.NODE_ENV !== "production",
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  resolve: {
    extensions: [".js", ".json", ".node"],
  },
};

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== "production") {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      __static: `"${path.join(__dirname, "../static").replace(/\\/g, "\\\\")}"`,
    }),
  );
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === "production") {
  mainConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
  );
}

module.exports = mainConfig;
```

## Main file

`main.js`

```js
"use strict";

import { app, protocol, BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import { createProtocol, installVueDevtools } from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
  // Don't load any native (external) modules until the following line is run:
  require("module").globalPaths.push(process.env.NODE_MODULES_PATH);
}

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: any;
let storyWindow: any;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(["app"], { secure: true });
function createMainWindow() {
  const window = new BrowserWindow();

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) window.webContents.openDevTools();
  } else {
    createProtocol("app");
    //   Load the index.html when not in development
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      }),
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

function createStoryWindow() {
  const window = new BrowserWindow();

  if (isDevelopment) {
    // Load the url of the story server if in development mode
    window.loadURL("http://127.0.0.1:6006");
  }

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  mainWindow = createMainWindow();
  storyWindow = createStoryWindow();
});
```

## Renderer

`index.html`

```html
<!DOCTYPE html>
<html lang="zh-Hans">
  <head>
    <% if (BASE_URL === './') { %><base href="app://./" /><% } %>
    <% if (VUE_APP_NODE_MODULES_PATH !== "false") { %><script>require('module').globalPaths.push('<%= VUE_APP_NODE_MODULES_PATH %>')</script><% } %>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>cp-general-manager</title>
  </head>
  <body>
    <noscript>
      <strong>Some notes.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected, like app.js -->
  </body>
</html>
```
