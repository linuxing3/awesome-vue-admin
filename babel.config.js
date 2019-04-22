module.exports = api => ({
  presets: ['@vue/app'],
  plugins: [
    ['import', {
      'libraryName': 'ant-design-vue',
      'libraryDirectory': 'es',
      'style': 'css'
    }] // `style: true` for less
  ],
  ...(api.env('test') && { plugins: ['require-context-hook'] })
})
