---
to: 'src/components/__tests__/<%= h.capitalize(h.inflection.singularize(model)) %>Form.spec.ts'
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
  const modelFormName = h.capitalize(h.inflection.singularize(model)) + 'Form'
%>import { shallowMount } from '@vue/test-utils'
import <%= modelFormName %> from '@/components/<%= modelName %>/<%= modelFormName %>.vue'

let options = (global as any).createVuetifyComponent()

describe('Test @/components/<%= modelName %>/<%= modelFormName %>.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(<%= modelFormName %> , options)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

})