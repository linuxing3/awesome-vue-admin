import ormPlugin from './store-orm.dva'
import pathifyPlugin from './pathifyPlugin'
// import persistPlugin from './persistPlugin'

export default [
  pathifyPlugin.plugin,
  ormPlugin
  // persistPlugin.plugin
]
