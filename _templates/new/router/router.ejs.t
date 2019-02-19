---
inject: true
to: "src/router/index.ts"
after: routes
---
<%
const routeName = name
const routePath = name
const viewName = h.capitalize(name)
%>    {
      path: '<%= routePath %>',
      name: '<%= routeName %>',
      component: loadView('@/views', '<%= viewName %>')
    },