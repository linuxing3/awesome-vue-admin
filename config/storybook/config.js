/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue'

import Vue from "vue";
import Vuex from "vuex"; // Vue plugins
import VueRx from "vue-rx"; // Vue plugins
import Vuetify from "vuetify/lib"; // Vue plugins
import "vuetify/src/stylus/app.styl";

const req = require.context("../../src/stories", true, /.stories.js$/);

// Install Vue plugins.
Vue.use(Vuex);
Vue.use(VueRx);
Vue.use(Vuetify);

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
