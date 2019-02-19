---
title: "插件设计"
---

# 核心概念：Vue-cli 插件开发

本质上是一个调用`vue-cli-service`的`API`函数

## API 方法

- `extendPackage`方法

- `onCreateComplete`方法

- `resolve`方法

## 入口

本质上是一个带有两个参数`api, projectOptions`的函数

::: warning 这里是大坑
这里的 api 是`generatorAPI`，不是`serviceAPI`

所有的路径解析，都是以`template/...`为相对目录

`api.resolve`是目标目录的根目录`./...`

因此`api.render("./template/index.js")`，实际上是将其拷贝到`./index.js`
:::

- `index.js`

```js
module.exports = (api, projectOptions) => {};
```

## 输入选项

- `prompts`

```js
module.exports = [
  {
    type: "input",
    name: "rootDoc", // 作为配置选项
    message: "input docs directory",
    default: "docs",
  },
  {
    type: "input",
    name: "title", // 作为配置选项
    message: "Title for the site (default project name)",
  },
  {
    type: "input",
    name: "output", // 作为配置选项
    message: "Output directory",
    default: "vuepress",
  },
];
```

## 生成器

### `generator`文件夹下包含`template`

- `generator/index.js`

```js
module.exports = (api, options, rootOptions) => {
  const fs = require("fs");
  const util = require("util");

  // 修改项目包配置文件 modify package.json fields
  api.extendPackage({
    scripts: {
      "docs:dev": `vuepress dev ${options.rootDoc}`, // 调用配置选项
      "docs:build": `vuepress build ${options.rootDoc}`, // 调用配置选项
    },
    devDependencies: {
      vuepress: "^0.7.0",
    },
  });
  //package.json content
  const package = JSON.parse(fs.readFileSync(api.resolve("package.json"), { encoding: "utf8" }));
  //get initial config
  let conf = require("./templates/config.js");
  //add prompts values to config
  conf.title = options.title || package.name;
  conf.dest = options.output;
  //convert file to string
  conf = `module.exports = ${util.inspect(conf, { depth: null, compact: false })}`;

  // 拷贝模板文件 copy templates
  api.onCreateComplete(() => {
    const path = require("path");
    const shell = require("shelljs");
    // 创建 .vuepress 文件夹
    shell.mkdir("-p", path.resolve(options.rootDoc + "/.vuepress"));
    // 拷贝模板文件到.vuepress 文件夹
    const cpFiles = ["README.md", "page1.md", "page2.md", "page3.md"];
    for (const f of cpFiles) {
      shell.cp(
        path.resolve(__dirname + "/templates/" + f),
        path.resolve(options.rootDoc + "/" + f),
      );
    }
    // 写入 config js 配置文件
    fs.writeFile(path.resolve(options.rootDoc + "/.vuepress/config.js"), conf, error => {
      if (error) throw error;
    });
  });
};
```
