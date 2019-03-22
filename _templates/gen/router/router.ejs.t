---
to: "src/router/<%= model %>.ts"
---
<%
const routeName = model.toLowerCase()
const routePath = model.toLowerCase()
const viewName = model
%>export default  {
    path: '/<%= routePath %>',
    name: '<%= routeName %>',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `@/views/<%= viewName %>.vue`)
}