---
inject: true
to: "src/pages/Home.vue"
after: more menu item 
skip_if: <%= h.changeCase.camel(model) %>
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelListName = ModelName + 'List'
const modelFormName = ModelName + 'Form'
%>      <!-- <%= EntityName %> -->
      <div>
        <a-button
            type="primary"
            @click="() => $router.push({ path: '/<%= EntityName %>-list' }) "><%= ModelName %>
        </a-button>
      </div>