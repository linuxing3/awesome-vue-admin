const formDataSchema = {
  'content': 'v-textarea',
  'text': 'v-textarea',
  'select': 'v-select',
  'date': 'v-date-picker',
  '*': 'v-text-field'
}

export interface HeaderConfig {
  value: string
  text: string
  align?: string
  sortable?: boolean
  type?: string
  attrs?: any
}

export interface FormDataConfig {
  type?: string
  attrs?: any
}

export const genFormData = (field: string): FormDataConfig => {
  // //.test(field)
  if (field.match(new RegExp(/(c|C)ontent/))) {
    return { type: 'v-textarea', attrs: { class: 'pa-1 ma-1' } }
  } else if (field.match(new RegExp(/(s|S)elect/))) {
    return { type: 'v-select', attrs: { class: 'pa-1 ma-1' } }
  } else if (field.match(new RegExp(/(d|D)ate/))) {
    return { type: 'v-date-picker', attrs: { class: 'pa-1 ma-1' } }
  } else {
    return { type: 'v-text-field', attrs: { class: 'pa-1 ma-1' } }
  }
}

export const genTableHeaders = (fields: string[]): HeaderConfig[] => {
  return fields.reduce((headersConfig: HeaderConfig[], field: string): HeaderConfig[] => {
    let config: HeaderConfig = {
      value: field,
      text: field,
      align: 'left',
      sortable: true,
      ...genFormData(field)
    }
    headersConfig.push(config)
    return headersConfig
  }, [])
}
