---
title: "Build Distribution"
---

# Build Distribution Executable

- Bundle app with `electron-packager`

```js
const packager = require("electron-packager");
const buildConfig = require("./build.config");

function bundleApp() {
  packager(buildConfig, (err, appPaths) => {
    if (err) {
      console.log(`\n${errorLog}${chalk.yellow("`electron-packager`")} says...\n`);
      console.log(err + "\n");
    } else {
      console.log(`\n${doneLog}\n`);
    }
  });
}
```

- Build options

```js
const path = require("path");
module.exports = {
  arch: "x64", // ia32, mac, etc
  asar: true,
  dir: path.join(__dirname, "../"), // show not be electron/dist directory
  icon: path.join(__dirname, "../build/icons/icon"),
  ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.join(__dirname, "../build"),
  overwrite: true,
  platform: process.env.BUILD_TARGET || "all",
};
```
