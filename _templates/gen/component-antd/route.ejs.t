---
inject: true
to: "src/router/index.antd.ts"
after: insert more route below
skip_if: <%= h.changeCase.camel(model) %>
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelListName = ModelName + 'List'
const modelFormName = ModelName + 'Form'
%>    // <%= EntityName %>
    {
      path: '/<%= EntityName %>-form',
      meta: {
        public: true
      },
      name: '<%= modelFormName %>',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/<%= ModelName %>/components/<%= modelFormName %>.vue`)
    },
    {
      path: '/<%= EntityName %>-list',
      meta: {
        public: true
      },
      name: '<%= modelListName %>',
      component: () =>
        import(/* webpackChunkName: "routes" */
        `@/pages/<%= ModelName %>/components/<%= modelListName %>.vue`)
    },