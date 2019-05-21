import Vue from 'vue'
import store from '@/store'
import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB
} from '@/store/mutation-types'
import config from '@/defaultSettings'

export default function Initializer() {
  store.commit('SET_SIDEBAR_TYPE', (Vue as any).ls.get(SIDEBAR_TYPE, true))
  store.commit('TOGGLE_THEME', (Vue as any).ls.get(DEFAULT_THEME, config.navTheme))
  store.commit('TOGGLE_LAYOUT_MODE', (Vue as any).ls.get(DEFAULT_LAYOUT_MODE, config.layout))
  store.commit('TOGGLE_FIXED_HEADER', (Vue as any).ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader))
  store.commit(
    'TOGGLE_FIXED_SIDERBAR',
    (Vue as any).ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar)
  )
  store.commit(
    'TOGGLE_CONTENT_WIDTH',
    (Vue as any).ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth)
  )
  store.commit(
    'TOGGLE_FIXED_HEADER_HIDDEN',
    (Vue as any).ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader)
  )
  store.commit('TOGGLE_WEAK', (Vue as any).ls.get(DEFAULT_COLOR_WEAK, config.colorWeak))
  store.commit('TOGGLE_COLOR', (Vue as any).ls.get(DEFAULT_COLOR, config.primaryColor))
  store.commit('TOGGLE_MULTI_TAB', (Vue as any).ls.get(DEFAULT_MULTI_TAB, config.multiTab))
  store.commit('entities/member/SET_TOKEN', (Vue as any).ls.get(ACCESS_TOKEN))
}
