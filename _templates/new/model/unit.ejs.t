---
to: src/models/__tests__/<%= h.capitalize(h.inflection.singularize(model)) %>.spec.ts
---
<%
  const fileName = h.capitalize(h.inflection.singularize(model))
  const importName = h.capitalize(h.inflection.singularize(model)) + 'Model'
%>import <%= importName %> from '../<%= fileName %>'

describe('@/models/<%= fileName %>', () => {
  it('exports a valid Vuex ORM Model', () => {

    const model = new <%= importName%>();

    expect(model.<%= fieldName %>).toBe("<%= fieldValue %>");
  })

  it('expect string field', ()=> {
    expect(new <%= importName%>({}).<%= fieldName %>).toBe("<%= fieldValue %>");
    expect(new <%= importName%>({ <%= fieldName %>: "<%= fieldValue %>" }).<%= fieldName %>).toBe("<%= fieldValue %>");
  })

  it('expect to json', ()=> {
    const model = new <%= importName%>();
    const json = model.$toJson();

    const expected = {
      _id: 1,
      <%= fieldName %>: "<%= fieldValue %>"
    };

    expect(json).not.toBeInstanceOf(<%= importName%>);
    expect(json.<%= fieldName %>).toEqual(expected.<%= fieldName %>);
  })
})


