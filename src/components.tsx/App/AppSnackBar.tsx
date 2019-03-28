import { VNode } from 'vue'
import { componentFactoryOf, ofType } from 'vue-tsx-support'

import { VCard, VCardText, VBtn, VIcon } from 'vuetify-tsx'
import { VSnackbar } from 'vuetify/lib'

interface Data {
  model: any
}

interface Events {
  onOk: void
  onError: { code: number; detail: string }
}

const AppSnackBar = componentFactoryOf<Events>().create({
  name: 'AppSnackBar',
  props: {
    text: String
  },
  /**
    |---------------------------------------------------------------------------
    | Data is typesafed
    |---------------------------------------------------------------------------
    */
  data (): Data {
    return {
      model: {
        message: 'Alert',
        color: 'red',
        show: false
      }
    }
  },
  created () {},
  methods: {
    handleClick () {
      this.model.show = !this.model.show
    }
  },
  render (): VNode {
    let { message, color, show } = this.model
    /**
      |-----------------------------------------------------------------------
      | render function with jsx/tsx as return value
      |-----------------------------------------------------------------------
       */
    return (
      <VCard>
        <VCardText>
          <VBtn onClick={this.handleClick}>
            <VIcon>delete</VIcon>
          </VBtn>
        </VCardText>
        <VSnackbar color={color} value={show}>
          {message}
          <VBtn color="pink" flat onClick={(show = false)} />
        </VSnackbar>
      </VCard>
    )
  }
})

export default AppSnackBar
