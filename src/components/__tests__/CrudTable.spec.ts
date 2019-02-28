import { shallowMount } from '@vue/test-utils'
import CrudTable from '@/components/helpers/CrudTable.vue'

describe('CrudTable Components', () => {
  it('renders modelName when passed', () => {
    const modelName = 'user'
    const wrapper = shallowMount(CrudTable, {})
    expect(wrapper.vm.$data.modelName).toBe(modelName)
  })
})
