const isElectron = process.env.NODE_ENV === 'production'

const dependencies = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}

function changeTarget (config) {
  if (isElectron) {
    config.target = 'electron-renderer'
  }
  return config
}

/* add entry file */
function addEntry (config) {
  // 修改程序入口文件
  config
    .entry('app')
    .clear()
    .add('./src/main.ts')
    .end()
}

const i18n = {
  locale: 'cn',
  fallbackLocale: 'en',
  localeDir: 'locales',
  enableInSFC: true
}

const devServer = {
  host: '0.0.0.0',
  port: '8080'
}

const storybook = {
  allowedPlugins: ['define']
}

module.exports = {
  // configureWebpack: config => {
  //   changeTarget(config);
  // },
  dependencies,
  pluginOptions: {
    i18n
  }
}
