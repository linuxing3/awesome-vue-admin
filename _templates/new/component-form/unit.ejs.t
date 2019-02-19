---
to: "src/components/<%= h.capitalize(h.inflection.singularize(model)) %>/<%= h.capitalize(h.inflection.singularize(model)) %>Form.spec.ts"
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
  const modelTableName = h.capitalize(h.inflection.singularize(model)) + 'Table'
  const modelFormName = h.capitalize(h.inflection.singularize(model)) + 'Form'
%>import <%= modelFormName %> from './<%= modelFormName %>.vue'

describe('@/components/<%= modelName %>/<%= modelFormName %>', () => {
  it('exports a valid component', () => {
    expect(<%= modelFormName %>).toBeAComponent()
  })
})
