---
to: 'src/components/__tests__/<%= h.capitalize(h.inflection.singularize(model)) %>Table.spec.ts'
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
  const modelTableName = h.capitalize(h.inflection.singularize(model)) + 'Table'
%>import { shallowMount } from '@vue/test-utils'
import <%= modelTableName %> from '@/components/<%= modelName %>/<%= modelTableName %>.vue'

let options = (global as any).createVuetifyComponent()

describe('Test @/components/<%= modelName %>/<%= modelTableName %>.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(<%= modelTableName %> , options)
  })

  it('Test is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

})