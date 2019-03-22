---
to: 'src/components/__tests__/<%= model %>.spec.ts'
---
<%
  const modelName = model
%>import { shallowMount } from '@vue/test-utils'
import <%= modelName %> from '@/components/helpers/<%= modelName %>.vue'

let options = (global as any).createVuetifyComponent()

describe('Test @/components/helpers/<%= modelName %>.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(<%= modelName %> , options)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.text()).toBe('<%= modelName %>')
  })

})