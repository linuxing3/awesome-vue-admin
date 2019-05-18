import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/defaultSettings'

Vue.use(VueStorage, config.storageOptions)
