---
title: "Development"
---

# Development

+ npm script

```bash
npm run dev
```

+ Write Renderer files with `vue-cli-service`

```js
const { spawn } = require("child_process");
vueProcess = spawn(
  path.join(
    __dirname + "/../node_modules/.bin/vue-cli-service" + extension
  ),
  ["serve"],
  {
    cwd: path.join(__dirname + "/..")
  }
);
```

+ Write Main file (add dev configuration is *development environment*)

```js
mainConfig.entry.main = [
  path.join(__dirname, "../src/main/index.dev.js")
].concat(mainConfig.entry.main);

electronLog(mainConfig.entry.main, "yellow");

const compiler = webpack(mainConfig);

// do compipler debug stuff
```

+ start Electron with the packed `main.js` under `dist/electron` directory

```js
function startElectron() {
  electronProcess = spawn(electron, [
    "--inspect=5858",
    path.join(__dirname, "../dist/electron/main.js")
  ]);

  electronProcess.stdout.on("data", data => {
    electronLog(data, "blue");
  });
  electronProcess.stderr.on("data", data => {
    electronLog(data, "red");
  });

  electronProcess.on("close", () => {
    if (!manualRestart) process.exit();
  });
}
```