---
inject: true
to: "src/api/menu.ts"
after: injected
---
<%
const pathName = model.toLowerCase()
%>  {
    title: '<%= pathName %> title',
    group: 'apps',
    icon: 'star',
    name: '<%= pathName %>',
    color: 'black'
  },