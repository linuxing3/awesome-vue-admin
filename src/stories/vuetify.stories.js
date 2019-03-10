/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

// vuetify
import { VBtn, VIcon } from 'vuetify/lib'

storiesOf('Vuetify', module)
  .add('Vuetify Button', () => ({
    components: { VBtn },
    template: '<v-btn flat @click="action">Story Vuetify Button</v-btn>',
    methods: { action: action('clicked') }
  }))
  .add('Vuetify Icon', () => ({
    components: { VIcon },
    template: '<v-icon @click="action">fas fa-dashboard</v-icon>',
    methods: { action: action('clicked') }
  }))
