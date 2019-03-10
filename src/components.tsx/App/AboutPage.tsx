import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

import {
  VCard,
  VCardTitle,
  VLayout,
  VFlex,
  VBtn,
  VCardText,
  VCardActions
} from 'vuetify-tsx'

const AboutComponent = component({
  name: 'App',
  render (): VNode {
    return (
      <VLayout row wrap>
        <VFlex>
          <VCard>
            <VCardTitle class="primary white--text">
              <h1 class="pa-2">关于</h1>
            </VCardTitle>
            <VCardText>Vuetify is awesome material desing</VCardText>
            <VCardActions>
              <VBtn to={{ name: 'home' }}>
                <div>主页</div>
              </VBtn>
            </VCardActions>
          </VCard>
        </VFlex>
      </VLayout>
    )
  }
})

export default AboutComponent
