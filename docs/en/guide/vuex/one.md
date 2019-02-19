---
title: "Vuex Entry"
---
# Store

## Index

`src/store/index.ts`

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import User from "./modules/User";
import plugins from "./plugin";

import { dbInit } from "@/store/api/Nedb";
dbInit();

interface IState {
    title: string;
}

const state: IState = {
    title: "xing wenju",
};

export default new Vuex.Store({
    state,
    plugins,
    modules: {
        User,
    },
    getters: {
        mytitle: state => state.title,
    },
    mutations: {},
    actions: {},
});

```
