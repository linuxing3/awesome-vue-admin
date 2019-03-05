import { removeSync } from 'fs-extra'

requiredModels.keys().forEach(fileName => {
  if (fileName.match(/.*\.(py|js)$/)) {
    removeSync(filaName)
    console.log(`${fileName} deleted`)
  } else {
    console.log('not deleted')
  }
})
