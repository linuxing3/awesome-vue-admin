---
to: "src/models/CoreModel/<%= model %>/<%= model %>.ts"
---
<%
const ModelName = model
const EntityName = model.charAt(0).toLowerCase() + model.slice(1)
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
      <% fieldNames.split(",").map(field => { %><%= field %>: this.attr("<%= field %>"),
      <% }) %>
    };
  }
}
