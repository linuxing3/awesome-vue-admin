import { shallowMount } from '@vue/test-utils'
import UserForm from '@/components/User/UserForm.vue'

let options = (global as any).createVuetifyComponent()

describe('Test @/components/User/UserForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(UserForm, options)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
