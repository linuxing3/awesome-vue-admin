import { shallowMount } from '@vue/test-utils'
import AvatarUsageComponent from '@/components/examples/avatars/usage.vue'

let options = (global as any).createVuetifyComponent()

describe('Avatar Usage View', () => {

  beforeEach(() => {
    let wrapper = shallowMount(AvatarUsageComponent, options)
  })

  it('renders data slider when passed', () => {
    let wrapper = shallowMount(AvatarUsageComponent, options)
    expect(wrapper.vm.$data.slider).toBe(56)
  })

  it('renders img when passed', () => {
    let wrapper = shallowMount(AvatarUsageComponent, options)
    expect(wrapper.contains('img')).toBe(true)
  })

  it('renders v-avatar when passed', () => {
    let wrapper = shallowMount(AvatarUsageComponent, options)
    expect(wrapper.contains('v-avatar')).toBe(false)
  })
})
