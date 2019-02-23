---
to: "src/models/<%= h.capitalize(h.inflection.singularize(model)) %>.ts"
---
<%
const ModelName = h.capitalize(h.inflection.singularize(model))
const EntityName = h.inflection.singularize(model).toLowerCase()
%>import { BaseModel} from './BaseModel'

export interface I<%= ModelName %> {
   _id: string
   name: string
}

export default class <%= ModelName %> extends BaseModel {
  static entity = '<%= EntityName %>'

  static fields() {
    return {
      _id: this.increment(),
      name: this.string()
    };
  }
}
