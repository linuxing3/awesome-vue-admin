const isElectron = process.env.NODE_ENV === 'production'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const transpileDependencies = ['vue-echarts', 'resize-detector']

function changeTarget(config) {
  if (isElectron) {
    config.target = 'electron-renderer'
  }
  return config
}

/* add entry file */
function addEntry(config) {
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
  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies,
  pluginOptions: {
    i18n
  }
}
