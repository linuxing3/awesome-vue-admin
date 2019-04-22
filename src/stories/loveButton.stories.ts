import { storiesOf } from '@storybook/vue'
import { VApp, VContent } from 'vuetify/lib' // <-- add the import

import LoveButton from './LoveButton.vue'

import DatePickerDate from '../components/examples/vuetify/date-pickers/datePickerDate.vue'

// add the decorator
const appDecorator = () => {
  return {
    components: { VApp, VContent },
    template: `
      <v-app>
        <div style="background-color: rgb(134, 212, 226); padding: 20px; width: 100%; height: 100%;">
          <v-content>
            <story/>
          </v-content>
        </div>
      </v-app>
    `
  }
}

storiesOf('LoveButton', module)
  .addDecorator(appDecorator) // <-- decorate the stories
  .add('default', () => ({
    components: { LoveButton },
    template: `<love-button love="Love vue & vuetify"/>`
  }))

storiesOf('DatePickerDate', module)
  .addDecorator(appDecorator) // <-- decorate the stories
  .add('default', () => ({
    components: { DatePickerDate },
    template: `<date-picker-date />`
  }))
