---
to: src/models/__tests__/<%= h.capitalize(h.inflection.singularize(model)) %>.spec.ts
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
%>import <%= modelName %> from '../<%= modelName %>/<%= modelName %>'

describe('@/models/CoreModel/<%= modelName %>/<%= modelName %>', () => {

  it('expect to be a valid model', ()=> {
    const model = new <%= modelName %>()
    expect(model).toBeInstanceOf(<%= modelName %>)
  })

  it('expect to json', ()=> {
    const model = new <%= modelName %>()
    const json = model.$toJson()
    const expected = {
      _id: 1
    }
    expect(json._id).toEqual(expected._id)
  })
})