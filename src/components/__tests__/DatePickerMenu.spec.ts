import { shallowMount, Wrapper } from '@vue/test-utils'
import DateDialogAndMenu from '@/components/examples/date-pickers/dateDialogAndMenu.vue'

let options = (global as any).createVuetifyComponent()

describe('Test date picker with menu', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DateDialogAndMenu, options)
  })

  it('Test refs', () => {
    expect(wrapper.vm.$refs.length).toBe(2)
  })

  it('Test first ref is dialog', () => {
    expect(wrapper.vm.$refs[0]).toBe('dialog')
  })
})
