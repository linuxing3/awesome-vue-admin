---
to: "src/router/<%= h.capitalize(name) %>.ts"
---
<%
const routeName = name.toLowerCase()
const routePath = name.toLowerCase()
const viewName = h.capitalize(name)
%>export default  {
    path: '/<%= routePath %>',
    name: '<%= routeName %>',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "router" */ `@/views/<%= viewName %>.vue`)
}