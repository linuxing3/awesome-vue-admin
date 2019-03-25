---
inject: true
to: "src/api/menu.ts"
after: injected
---
<%
const EntityName = h.changeCase.camel(model)
const EntityTitle = h.changeCase.title(EntityName)
%>  {
    title: '<%= EntityTitle %> title',
    group: 'apps',
    icon: 'star',
    name: '<%= EntityName %>',
    color: 'black'
  },