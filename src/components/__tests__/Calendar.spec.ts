import { shallowMount } from '@vue/test-utils'
import Calendar from '@/components/helpers/Calendar.vue'

let options = (global as any).createVuetifyComponent()

describe('Test @/components/helpers/Calendar.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Calendar, options)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.text()).toBe('Calendar')
  })
})
