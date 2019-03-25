---
to: 'src/components/__tests__/<%= h.changeCase.pascal(model) %>.spec.ts'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%>import { shallowMount } from '@vue/test-utils'
import <%= ModelName %> from '@/components/helpers/<%= ModelName %>.vue'

let options = (global as any).createVuetifyComponent()

describe('Test @/components/helpers/<%= ModelName %>.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(<%= ModelName %> , options)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.text()).toBe('<%= ModelName %>')
  })

})