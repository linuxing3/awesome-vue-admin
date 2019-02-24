import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import keys from 'lodash/keys'

/**
 * Global registerd components
 */
const requireComponent = require.context(
  '@/components/helpers', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))
  Vue.component(componentName, componentConfig.default || componentConfig)
  console.log('GlobalRegistered ' + componentName)
})

/**
 * Global Examples
 */

// const examples = {}
// const requireExamples = require.context(
//   '@/components/examples', true, /\.vue$/
// )

// requireExamples.keys().forEach(fileName => {
//   const componentExample = requireExamples(fileName)
//   const componentName = 'Example' + upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))
//   examples[componentName] = () => componentExample.default || componentExample
// })

// export const exampleList = keys(examples)
// console.log('Lazy Registered Components:')
// console.table(exampleList)

// export default examples
