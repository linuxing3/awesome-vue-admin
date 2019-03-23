// module.exports = {
//   presets: [
//     '@vue/app'
//   ]
// }

module.exports = api => ({
  presets: ['@vue/app'],
  ...(api.env('test') && { plugins: ['require-context-hook'] })
})
