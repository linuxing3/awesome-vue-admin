import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home View', () => {
  it('renders props.msg when passed', () => {
    const msg = 'This is HomeView Page'
    const wrapper = shallowMount(Home, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch('')
  })
})
