export const genFormData = (field: string) => {
  // //.test(field)
  if (field.match(new RegExp(/(c|C)ontent/))) {
    return { type: 'v-textarea', attrs: { class: 'pa-1 ma-1'} }
  } else if (field.match(new RegExp(/(s|S)elect/))) {
    return { type: 'v-select', attrs: { class: 'pa-1 ma-1'} }
  } else if (field.match(new RegExp(/(d|D)ate/))) {
    return { type: 'v-date-picker', attrs: { class: 'pa-1 ma-1'} }
  } else {
    return { type: 'v-text-field', attrs: { class: 'pa-1 ma-1' } }
  }
}

const formDataSchema = {
  'content': 'v-textarea',
  'text': 'v-textarea',
  'select': 'v-select',
  'date': 'v-date-picker',
  '*': 'v-text-field',
}


export const genTableHeaders = (fields: string[]): any[] => {
  return fields.reduce(function (headersConfig, field) {
    let config = {
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
