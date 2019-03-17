import { shallowMount, Wrapper } from '@vue/test-utils'
import DateDialogAndMenu from '@/components/examples/date-pickers/dateDialogAndMenu.vue'

let options = (global as any).createVuetifyComponent()

describe('Test date picker with menu', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DateDialogAndMenu, options)
  })

  it('Test refs', () => {
    expect(Object.keys(wrapper.vm.$refs).length).toBe(2)
  })

})
