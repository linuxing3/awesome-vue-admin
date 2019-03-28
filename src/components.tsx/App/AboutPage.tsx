import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

import {
  VCard,
  VCardTitle,
  VLayout,
  VFlex,
  VBtn,
  VIcon,
  VCardText,
  VCardActions
} from 'vuetify-tsx'

const AboutComponent = component({
  name: 'App',
  render (): VNode {
    return (
      <VLayout>
        <VFlex>
          <VCard>
            <VCardTitle>关于</VCardTitle>
            <VCardText>Vuetify is awesome material desing</VCardText>
            <VCardActions>
              <VBtn>
                <VIcon>edit</VIcon>
              </VBtn>
            </VCardActions>
          </VCard>
        </VFlex>
      </VLayout>
    )
  }
})

export default AboutComponent
