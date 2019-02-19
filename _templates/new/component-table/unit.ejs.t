---
to: "src/components/<%= h.capitalize(h.inflection.singularize(model)) %>/<%= h.capitalize(h.inflection.singularize(model)) %>Table.spec.ts"
---
<%
  const modelName = h.capitalize(h.inflection.singularize(model))
  const modelTableName = h.capitalize(h.inflection.singularize(model)) + 'Table'
  const modelFormName = h.capitalize(h.inflection.singularize(model)) + 'Form'
%>import <%= modelTableName %> from './<%= modelTableName %>.vue';

describe('@/components/<%= modelName %>/<%= modelTableName %>', () => {
  it('exports a valid component', () => {
    expect(<%= modelTableName %>).toBeAComponent()
  });
  it('component should have methods', () => {
    const options = (global as any).createComponentMocks({});
    const { vm } = (global as any).shalloMountView(<%= modelTableName %>, options);
    expect(vm.editing).ToBe(false);
    expect(vm.exportItem).ToBeFunction();
  });
  it('component should call methods', () => {
    const options = (global as any).createComponentMocks({});
    const { vm } = (global as any).shalloMountView(<%= modelTableName %>, options);
    const exportItem = jest.fn();
    await vm.exportItem({});
    expect(exportItem).toBeCalled();
  });
});
