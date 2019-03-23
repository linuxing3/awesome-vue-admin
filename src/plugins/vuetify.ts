import Vue from 'vue'
import Vuetify, { VFlex, VLayout, VContainer, VImg, VDatePicker } from 'vuetify/lib'

import 'vuetify/src/stylus/app.styl'

// fonts
import 'roboto-fontface/css/roboto/roboto-fontface.css'
// If using DMI
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import '../styles/default.styl'
import '../styles/main.css'

Vue.use(Vuetify, {
  components: {
    VFlex,
    VLayout,
    VContainer,
    VImg,
    VDatePicker
  },
  iconfont: 'md'
})
