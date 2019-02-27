---
to: "src/router/<%= h.capitalize(model) %>.ts"
---
<%
const routeName = model.toLowerCase()
const routePath = model.toLowerCase()
const viewName = h.capitalize(model)
%>export default  {
    path: '/<%= routePath %>',
    name: '<%= routeName %>',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/<%= viewName %>.vue`)
}