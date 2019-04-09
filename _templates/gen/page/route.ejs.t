---
to: "src/pages/<%= h.changeCase.pascal(model) %>/IndexRoute.ts"
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%>export default  {
    path: '/<%= EntityName %>',
    name: '<%= EntityName %>',
    meta: { breadcrumb: true },
    component: () =>
        import(/* webpackChunkName: "routes" */ `./IndexRoute.vue`)
}