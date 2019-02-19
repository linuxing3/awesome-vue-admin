---
title: "Intro"
---

# cp-general-manager

[![GitHub open issues](https://img.shields.io/github/issues/linuxing3/cp-general-manager.svg?maxAge=2592000)](https://github.com/linuxing3/cp-general-manager/issues)
[![Npm version](https://img.shields.io/npm/v/cp-general-manager.svg?maxAge=2592000)](https://www.npmjs.com/package/cp-general-manager)

**基于 vue 构造 electron 应用程序**

<div align="center">
<br>
<img width="500" src="https://vuepress.vuejs.org/hero.png" alt="electron-vue">
<br>
<br>
</div>

## Overview

充分利用 `vue-cli` 作为脚手架工具，加上拥有 `vue-loader` 的 `webpack`、`electron-packager` 或是 `electron-builder`，以及一些最常用的插件，如`vue-router`、`vuex` 等等。

你会在本样板代码中找到的东西...

- 基本的项目结构与 **单一的** `package.json` 设置
- 详细的 [文档](https://linuxing3.gitbooks.io/electron-vue/content/)
- 使用 [vue-cli](https://github.com/vuejs/vue-cli) 作为项目脚手架
- 立即可用的 Vue-cli 插件 \([electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/upgrading.html), [storybook](http://github.com/storybooks/vue-cli-plugin-storybook), [apollo](https://github.com/Akryum/vue-cli-plugin-apollo), [vue-router](https://github.com/vuejs/vue-router),[component](https://github.com/David-Desmaisons/vue-cli-plugin-component), [i18n](https://github.com/kazupon/vue-cli-plugin-i18n), [vuex](https://github.com/vuejs/vuex)\)\*
- 预装开发工具 [vue-devtools](https://github.com/vuejs/vue-devtools) 和 [devtron](https://github.com/electron/devtron)
- 使用[electron-builder](https://github.com/electron-userland/electron-builder) 轻松打包你的应用程序\*
- `appveyor.yml` 与 `.travis.yml` 配置用于 [electron-builder](https://github.com/electron-userland/electron-builder) 的自动部署\*
- 能够生成用于浏览器的网页输出
- 便利的 [NPM 脚本](/npm_scripts.md)
- 使用携带模块热更新 (Hot Module Replacement) 的 [webpack](https://github.com/webpack/webpack) 和 [vue-loader](https://github.com/vuejs/vue-loader)
- 在工作在 electron 的 `main` 主进程时重启进程
- 支持使用 [vue-loader](https://github.com/vuejs/vue-loader/) 的 HTML/CSS/JS 预处理器
- ESLint \(支持 [`standard`](https://github.com/feross/standard) 和 [`airbnb-base`](https://github.com/airbnb/javascript)\)\*

## Usage

### Installation

```
vue create cp-general-manager
```

### Install more plugins

```
vue add electron-builder
vue add vuetify
vue add apollo
vue add storybook
vue add component
```

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Lints and fixes files

```
yarn run lint
```

### Update the API section of README.md with generated documentation

```
yarn run doc:build
```

### Run style guide dev server

```
yarn run styleguide
```

### Generate a static HTML style guide

```
yarn run styleguide:build
```

::: tip
请务必查看 [文档](https://github.com/linuxing3/cp-general-manager/blob/master/docs/README.md)。
在这里，你将找到有关项目配置、项目结构和构建应用程序的有用信息。
:::
