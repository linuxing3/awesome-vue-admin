---
inject: true
to: "src/router/index.ts"
after: routes
---
<%
const routeName = name.toLowerCase()
const routePath = name.toLowerCase()
const viewName = h.capitalize(name)
%>  {
    path: '/<%= routePath %>',
    name: '<%= routeName %>',
    component: () =>
      import(/* webpackChunkName: "router" */ `@/views/<%= viewName %>.vue`)
  },