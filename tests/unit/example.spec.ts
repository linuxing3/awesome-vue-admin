import { shallowMount } from '@vue/test-utils'
import About from '@/views/About.vue'

describe('About View', () => {
  it('renders props.msg when passed', () => {
    const msg = 'This is a About Page'
    const wrapper = shallowMount(About, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
