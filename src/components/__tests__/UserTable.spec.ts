import { shallowMount } from '@vue/test-utils'
import UserTable from '@/components/User/UserTable.vue'

let options = (global as any).createVuetifyComponent()

describe('Test @/components/User/UserTable.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(UserTable, options)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
