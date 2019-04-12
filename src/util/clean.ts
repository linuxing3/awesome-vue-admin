import { unlinkSync } from 'fs'

let models = require.context('.', true, /\.json$/)

models.keys().forEach(fileName => {
  if (fileName.match(/.*\.(py|js)$/)) {
    unlinkSync(fileName)
    console.log(`${fileName} deleted`)
  } else {
    console.log('not deleted')
  }
})
