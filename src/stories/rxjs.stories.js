/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { linkTo } from '@storybook/addon-links'

import RxSearch from '../components/widgets/RxSearch.vue'

storiesOf('Rxjs Search', module).add('Rx Search', () => ({
  components: { RxSearch },
  template: '<rx-search></rx-search>'
}))
