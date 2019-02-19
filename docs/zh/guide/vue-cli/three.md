# 实战练习

<a href="https://npmjs.com/package/vue-cli-plugin-vuex-nedb-module-generator">
    <img alt="" src="https://img.shields.io/npm/v/vue-cli-plugin-vuex-module-generator/latest.svg?style=flat-square">
</a>
<a href="https://npmjs.com/package/vue-cli-plugin-vuex-nedb-module-generator">
    <img alt="" src="https://img.shields.io/npm/dm/vue-cli-plugin-vuex-module-generator.svg?style=flat-square">
</a>

## Vuex module generator

## 基本描述

- [vue-cli 3](https://github.com/vuejs/vue-cli)插件，用于生成 Vuex store 模块和相应组件

- 主要面向`electron`应用，存储`nedb`的持久化数据到用户数据目录下的`data`文件夹内

- 面向`typescript`应用

- 使用了`vuex-pathify`简化操作流程

## 使用方法

- 使用`vue-cli`进行安装其他插件

```sh
$ vue add typescript
$ vue add vue-cli-plugin-electron-builder
```

- 使用`vue-cli`进行安装本插件

```sh
$ vue add vue-cli-plugin-vuex-nedb-module-generator
```

- 使用`Invoke`可生成新的存储模块和对应的组件:

```sh
$ vue invoke vue-cli-plugin-vuex-nedb-module-generator
? Where's your store's root directory? ./src/store
? Where's your component's root directory? ./src/components
? What's your new module's name? code
? What's your router's path? ./src/router
```

## 自动生成的主要文件

请注意：如果上述文件已经存在，将不覆盖现有文件

**存储入口文件**
`store/index.ts`

**路由文件**
`router/index.ts`
`router/path.ts`

**基本的数据模型**
`store/Model/BaseModel.ts`

**使用命名空间的存储模块**

```sh
store/modules/Base/index.ts
store/modules/Base/actions.ts
store/modules/Base/mutations.ts
store/modules/Base/getters.ts
store/modules/code.ts
```

**Nedb 的 API，主要在 actions 中异步调用**

`store/api/NedbSDK.ts`

**Store 插件，加入了 pathify 和 persistent**

```sh
store/plugins/index.ts
store/plugins/PersistentPlugin.ts
```

**自动生成的组件**

```sh
components/code/codeTable.ts
components/code/codeInfo.ts
```

## 代码

- `generator/index.js`

```js
const fs = require("fs");
const path = require("path");

const debug = require("debug")("vuex-nedb:generator");

// Helper functions
const {
  checkInstalled,
  exists,
  writeFile,
  readEnv,
  buildEnvContent,
  capitalizeFirstLetter,
  uncapitalizeFirstLetter,
} = require("../util");

module.exports = (api, options, rootOptions) => {
  debug("options", options);
  debug("rootOptions", rootOptions);
  const templatesRoot = "./templates";
  // 如果vue.config.js中有预设置，使用预设置，否则使用prompts输入设置
  const { moduleName, storeRootDir, routerRootDir, componentRootDir, apiRootDir } =
    options.pluginOptions && options.pluginOptions.vuexModuleGenerator
      ? options.pluginOptions.vuexModuleGenerator
      : options;
  const lang = api.hasPlugin("typescript") ? "ts" : "js";
  const classComponent =
    checkInstalled("./node_modules/vue-class-component/package.json") &&
    checkInstalled("./node_modules/vue-property-decorator/package.json");
  const additionalOptions = {
    ...options,
    ...{ lang, moduleName },
  };
  debug("additionalOptions", additionalOptions);

  try {
    // 确认使用typescript
    if (!lang === "ts") {
      console.log("This plugin should be used with typescript");
      console.log("Please install it: vue add typescript ");
    }
    // 确认使用electron
    const usesELECTRON = api.hasPlugin("electron-builder");
    if (!usesELECTRON) {
      console.log("This plugin should be used with electron");
      console.log("Please install it: vue add electron-builder ");
    }
    // 安装依赖包
    const pkg = {
      dependencies: {
        nedb: "^1.8.0",
        "nedb-promise": "^2.0.1",
        "vue-router": "^3.0.1",
        vuex: "^3.0.1",
      },
      devDependencies: {
        "@types/nedb": "^1.8.6",
        "vuex-class": "^0.3.1",
        "vuex-pathify": "^1.1.3",
      },
    };
    debug("pkg", pkg);
    api.extendPackage(pkg);

    /**
     * 拷贝模板
     */
    const files = {};

    // 根目录 Store root directory
    // @/store/index.ts
    const storeRootIndexPath = path.join(storeRootDir, "index.ts");
    debug("storeRootIndexPath", storeRootIndexPath);
    console.log("--------------------------------------------------------");
    if (!fs.existsSync(storeRootIndexPath)) {
      files[storeRootIndexPath] = `${templatesRoot}/store/index.ts`;
    }

    // 存储器类型定义Store types
    // @/store/types.ts
    const storeRootTypesPath = path.join(storeRootDir, "types.ts");
    debug("storeRootTypesPath is: ", storeRootTypesPath);
    console.log("--------------------------------------------------------");
    if (!fs.existsSync(storeRootTypesPath)) {
      files[storeRootTypesPath] = `${templatesRoot}/store/types.ts`;
    }

    // 存储器数据模型Store model
    // @/store/Model/*
    const apiModelPath = path.join(apiRootDir, `models/${moduleName}.ts`);
    console.log("apiModelPath is: " + apiModelPath);
    console.log("--------------------------------------------------------");
    if (!fs.existsSync(apiModelPath)) {
      files[apiModelPath] = `${templatesRoot}/api/models/Activity.ts`;
    }

    // 数据库接口api
    // @/api/*
    const apiNedbPath = path.join(apiRootDir, "nedb/index.ts");
    console.log("apiNedbPath is:" + apiNedbPath);
    if (!fs.existsSync(apiNedbPath)) {
      files[apiNedbPath] = `${templatesRoot}/api/nedb/index.ts`;
    }

    // 存储器模块Store module
    // moduleDirIndexPath from @/store/modules/module.ts
    const moduleDirPath = path.join(storeRootDir, "modules");

    const moduleDirModulePath = path.join(moduleDirPath, `${moduleName}.ts`);
    console.log("moduleDirModulePath is:" + moduleDirModulePath);
    if (!fs.existsSync(moduleDirModulePath)) {
      // to @/store/modules/activity.ts
      files[moduleDirModulePath] = `${templatesRoot}/store/modules/module.ts`;
    } else {
      console.warn("Store SubModule file exists");
    }

    const moduleDirIndexPath = path.join(moduleDirPath, `index.ts`);
    console.log("moduleDirIndexPath is:" + moduleDirIndexPath);
    if (!fs.existsSync(moduleDirIndexPath)) {
      // to @/store/modules/index.ts with require.context for auto import modules
      files[moduleDirIndexPath] = `${templatesRoot}/store/modules/index.ts`;
    } else {
      console.warn("Store Module Index file exists");
    }

    // 存储器共享根模块的模板文件,包含对NEDB统一的CRUD操作，可被其他模块引用和扩展
    // Modules templates
    // moduleBaseDir from @store/modules/Base/*
    // Each file under the dir will be rendered, as base module to be extented
    const moduleBaseDir = path.join(moduleDirPath, "Base");
    console.warn(`Checking Module Dir Path ...`);
    console.log("--------------------------------------------------------");
    if (!fs.existsSync(moduleBaseDir)) {
      ["index", "actions", "mutations", "getters"].forEach(template => {
        let fileName = `${template}.ts`;
        let filePath = path.join(moduleBaseDir, fileName);
        console.log("module files generated in " + filePath);
        files[filePath] = `${templatesRoot}/store/modules/Base/${fileName}`;
      });
    } else {
      console.warn(`Store Module ${moduleBaseDir} exists`);
    }

    // 存储器插件的模板文件 Plugin templates
    // pluginBaseDir @/store/plugin/*
    const pluginBaseDir = path.join(storeRootDir, "plugin");
    console.warn(`Checking Plugin Dir Path ...`);
    console.log("--------------------------------------------------------");
    if (!fs.existsSync(pluginBaseDir)) {
      ["index", "persistentPlugin", "pathify"].forEach(template => {
        let fileName = `${template}.ts`;
        let filePath = path.join(pluginBaseDir, fileName);
        console.log("Plugin files generated in " + filePath);
        files[filePath] = `${templatesRoot}/store/plugin/${fileName}`;
      });
    } else {
      console.warn(`Store plugin ${pluginBaseDir} exists`);
    }

    // 路由器的模板文件 Router templates
    // routerBaseDir from @/store/routers/*
    const routerBaseDir = routerRootDir;
    console.warn(`Checking Plugin Dir Path ...`);
    console.log("--------------------------------------------------------");
    // index is router entry and path is routes array
    if (!fs.existsSync(routerBaseDir)) {
      ["index", "path"].forEach(template => {
        let fileName = `${template}.ts`;
        let filePath = path.join(routerBaseDir, fileName);
        console.log("Plugin files generated in " + filePath);
        // to @/store/rotuer/*
        files[filePath] = `${templatesRoot}/router/${fileName}`;
      });
    } else {
      console.warn(`Router ${routerBaseDir} exists, only add new module route!`);
    }
    // module route to be added
    const moduleRouterPath = path.join(routerBaseDir, `${moduleName}.ts`);
    files[moduleRouterPath] = `${templatesRoot}/router/Activity.ts`;

    // 组件Components
    // 如果组件已存在，直接退出
    // from @/components/activity/Table.vue
    const componentsDir = path.join(componentRootDir, moduleName) || componentRootDir;
    console.warn(`Checking Components Dir Path ${componentsDir} ...`);
    if (!fs.existsSync(componentsDir)) {
      ["Table", "Info"].forEach(template => {
        let fileName = `${template}.vue`;
        // @/components/activity/activityTable.vue
        let filePath = path.join(componentsDir, `${moduleName}${fileName}`);
        console.log("Components files generated in " + filePath);
        files[filePath] = `${templatesRoot}/components/module/${fileName}`;
      });
    } else {
      console.warn(`Components Module ${componentsDir} exists`);
    }

    // 拷贝模块文件到项目文件中, 根据additionalOptions替换变量
    console.log("文件准备完毕，拷贝到相应目录！");
    debug("Files", files);

    api.render(files, { ...additionalOptions });

    console.log("文件拷贝完毕，进行后续处理！");
  } catch (e) {
    api.exitLog(`unexpected error in vue-cli-plugin-i18n: ${e.message}`, "error");
    return;
  }

  api.postProcessFiles(files => {
    debug("postProcessFiles called");
    console.log("安装插件前，对模板文件进行后期处理");
    // 编辑根模块，添加模块 Edit store's root module
  });

  api.onCreateComplete(() => {
    debug("onCreateComplete called");
    console.log("安装插件后，对已生成模板文件进行处理，替换为示例名称为相应模块的名称！");
    const filePaths = [
      `${storeRootDir}/modules/${moduleName}.ts`,
      `${routerRootDir}/${moduleName}.ts`,
      `${componentRootDir}/${moduleName}/${moduleName}Table.vue`,
      `${componentRootDir}/${moduleName}/${moduleName}Info.vue`,
      `${apiRootDir}/models/${moduleName}.ts`,
    ];

    filePaths.forEach(filePath => {
      console.log("更新[" + filePath + "]文件中的模块名称");
      // 读取文件内容
      let realPath = api.resolve(filePath);
      if (!exists(realPath)) {
        api.exitLog("File not exites!", "error");
      } else {
        fileContent = fs.readFileSync(realPath, "utf8");
        // 动态替换模块名称
        fileContent = fileContent.replace(/Activity/g, capitalizeFirstLetter(moduleName));
        fileContent = fileContent.replace(/activity/g, uncapitalizeFirstLetter(moduleName));
        // 重新写入到对应文件中
        fs.writeFileSync(realPath, fileContent);
      }
    });

    // 环境变量
    const envPath = api.resolve(".env");
    const envVars = exists(envPath) ? readEnv(envPath) : {};

    if (envVars["VUE_APP_VUEX_NEDB_DIR"]) {
      api.exitLog(`overwrite VUE_APP_VUEX_NEDB_DIR at ${envPath}`, "info");
    }
    envVars["VUE_APP_VUEX_NEDB_DIR"] = "data";

    if (!writeFile(envPath, buildEnvContent(envVars))) {
      api.exitLog(`cannot write to ${envPath}`, "error");
      return;
    }
  });
};
```

- `prompts.js`

```js
module.exports = [
  {
    type: "input",
    name: "storeRootDir",
    message: "Where's your store's root directory?",
    default: "./src/store",
  },
  {
    type: "input",
    name: "componentRootDir",
    message: "Where's your component's root directory?",
    default: "./src/components",
  },
  {
    type: "input",
    name: "routerRootDir",
    message: "Where's your router's root directory?",
    default: "./src/router",
  },
  {
    type: "input",
    name: "apiRootDir",
    message: "Where's your api's root directory, holds nedb and models?",
    default: "./src/api",
  },
  {
    type: "input",
    name: "moduleName",
    message: "What's your new module's name?",
    default: "activity",
  },
];
```

## 借鉴

[vue-cli-plugin-vuex-module-generator](https://github.com/paulgv/vue-cli-plugin-vuex-module-generator)
