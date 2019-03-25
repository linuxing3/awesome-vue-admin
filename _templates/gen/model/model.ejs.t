---
to: "src/models/CoreModel/<%= h.changeCase.pascal(model) %>/<%= h.changeCase.pascal(model) %>.ts"
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%>import { BaseModel} from "../../BaseModel";

export interface I<%= ModelName %> {
   _id: string
   <% fieldNames.split(",").map(field => { %><%= field %>: string
   <% }) %>
}

export default class <%= ModelName %> extends BaseModel {
  static entity = "<%= EntityName %>";

  static fields() {
    return {
      _id: this.increment(),
      <% fieldNames.split(",").map(field => { %><%= field.trim() %>: this.attr("<%= field %>"),
      <% }) %>
    };
  }
}
