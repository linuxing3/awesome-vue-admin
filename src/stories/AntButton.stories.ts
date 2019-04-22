import { storiesOf } from '@storybook/vue'
import AntButton from './AntButton.vue'

storiesOf('AntButton', module)
  .add('default', () => ({
    components: { AntButton },
    template: `<AntButton name="Love vue & vuetify"/>`
  }))
