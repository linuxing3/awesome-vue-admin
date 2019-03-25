---
to: "src/models/CoreModel/<%= model %>/<%= model %>.ts"
---
<%
const EntityName = h.changeCase.camel(model, true)
const ModelName = h.changeCase.ucFirst(EntityName)
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
