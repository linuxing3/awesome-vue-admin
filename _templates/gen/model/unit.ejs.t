---
to: src/models/__tests__/<%= h.changeCase.pascal(model) %>.spec.ts
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%>import <%= ModelName %> from '../CoreModel/<%= ModelName %>/<%= ModelName %>'

describe('@/models/CoreModel/<%= ModelName %>/<%= ModelName %>', () => {

  it('expect to be a valid model', ()=> {
    const model = new <%= ModelName %>()
    expect(model).toBeInstanceOf(<%= ModelName %>)
  })

})