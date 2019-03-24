---
to: "src/router/<%= model %>.ts"
---
<%
const routePath = model.charAt(0).toLowerCase() + model.slice(1)
const routeName = model.charAt(0).toLowerCase() + model.slice(1)
const viewName = model
%>export default  {
    path: '/<%= routePath %>',
    name: '<%= routeName %>',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/<%= viewName %>.vue`)
}