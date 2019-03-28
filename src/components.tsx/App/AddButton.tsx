import { VNode } from 'vue'
import { component } from 'vue-tsx-support'

import { VBtn, VIcon } from 'vuetify-tsx'

const AddButton = component({
  methods: {
    showInputForm () {
      ;(window as any).getApp.$emit('ADD_MODEL', this.modelName)
    }
  },
  computed: {
    openFormRoute: function () {
      return `${this.modelName}`
    }
  },
  render (): VNode {
    return (
      <VBtn fab bottom right color="pink" dark fixed onClick={this.showInputForm}>
        <VIcon>add</VIcon>
      </VBtn>
    )
  }
})

export default AddButton
