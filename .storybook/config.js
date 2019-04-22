import { configure } from '@storybook/vue'

import '../src/plugins/vuetify'
import '../src/plugins/ant-design'

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.(j|t)s$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
