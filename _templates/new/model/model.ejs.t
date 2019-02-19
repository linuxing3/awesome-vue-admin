---
to: "src/models/<%= h.capitalize(h.inflection.singularize(model)) %>.ts"
---
<%
const ModelName = h.capitalize(h.inflection.singularize(model))
const EntityName = h.inflection.singularize(model).toLowerCase()
%>import { BaseModel} from "./BaseModel";

export interface I<%= ModelName %> {
   _id: string;
   <%= fieldName %>: <%= fieldType %>;
   <% fieldNames.split(",").map(field => { %><%= field %>: string;<% }) %>
}

export default class <%= ModelName %> extends BaseModel {
  static entity = "<%= EntityName %>";

  static fields() {
    return {
      _id: this.increment(),
      <%= fieldName %>: this.<%= fieldType %>("<%= fieldValue %>"),
      <% fieldNames.split(",").map(field => { %><%= field %>: this.string("<%= field %>"),
      <% }) %>
    };
  }
}
