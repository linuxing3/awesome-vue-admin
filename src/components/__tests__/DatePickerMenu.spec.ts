import { CombinedVueInstance } from 'vue/types/vue'
import { shallowMount, mount, Wrapper } from '@vue/test-utils'
import DateDialogAndMenu from '@/components/examples/date-pickers/dateDialogAndMenu.vue'

let options = (global as any).createVuetifyComponent()

describe('Test date picker with menu', () => {
  let wrapper
  let saveFn

  beforeEach(() => {
    saveFn = jest.fn
    wrapper = shallowMount(DateDialogAndMenu, options)
  })

  it('Test refs', () => {
    expect(Object.keys(wrapper.vm.$refs).length).toBe(2)
  })

  it('Test menu is open', () => {
    wrapper.setData({ 'menu': true })
    expect(wrapper.vm.$data.menu).toBe(true)
  })

  it('Test refs', () => {
    wrapper.setData({ 'menu': true })
    let dialog = wrapper.find({ ref: 'dialog' })
    let menu = wrapper.find({ ref: 'menu' })
    expect(menu.isVueInstance()).toBe(true)
    expect(dialog.isVueInstance()).toBe(true)
  })

  it('Test textfield with name', () => {
    let textField = wrapper.find({ name: 'firstTextField' })
    expect(textField).toEqual({ selector: 'Component' })
  })

  it('Test date is set to all', () => {
    let date = new Date().toISOString().substr(0, 10)
    wrapper.setData({ date })
    expect(wrapper.vm.$data.date).toBe(date)
  })
})
