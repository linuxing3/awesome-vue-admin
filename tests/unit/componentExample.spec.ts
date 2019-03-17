import { shallowMount, Wrapper } from '@vue/test-utils'
import AvatarUsageComponent from '@/components/examples/avatars/usage.vue'

let options = (global as any).createVuetifyComponent()

describe('Avatar Usage View', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AvatarUsageComponent, options)
  })

  it('renders data slider when passed', () => {
    expect(wrapper.vm.$data.slider).toBe(56)
  })

  it('renders img when passed', () => {
    expect(wrapper.contains('img')).toBe(true)
  })

  it('renders v-avatar when passed', () => {
    expect(wrapper.contains('v-avatar')).toBe(false)
  })
})
