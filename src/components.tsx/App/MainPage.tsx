import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

import { VCard, VCardTitle, VLayout, VFlex, VBtn, VCardText, VCardActions } from 'vuetify-tsx'

const MainPage = component({
  name: 'MainPage',
  render (): VNode {
    return (
      <VLayout row wrap>
        <VFlex>
          <VCard>
            <VCardTitle class="primary white--text">
              <h1>主页</h1>
            </VCardTitle>
            <VCardText>Vuetify is awesome material desing</VCardText>
            <VCardActions>
              <VBtn to={{ name: 'about' }}>
                <div>About</div>
              </VBtn>
              <VBtn to={{ name: 'user' }}>
                <div>User</div>
              </VBtn>
              <VBtn to={{ name: 'document' }}>
                <div>Dcoument</div>
              </VBtn>
            </VCardActions>
          </VCard>
        </VFlex>
      </VLayout>
    )
  }
})

export default MainPage
