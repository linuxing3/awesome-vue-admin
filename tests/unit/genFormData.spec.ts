import {
  genFormData,
  VGenTableHeaders,
  FormDataConfig,
  VTableHeaderConfig
} from '@/util/genFormData'

describe('Generate form data with field Name', () => {
  it('renders v-textarea when passed', () => {
    let formData: FormDataConfig = genFormData('content')
    expect(formData.type).toBe('v-textarea')
  })

  it('renders v-textarea with Capitialize when passed', () => {
    let formData: FormDataConfig = genFormData('Content')
    expect(formData.type).toBe('v-textarea')
  })

  it('renders v-textarea with regex when passed', () => {
    let formData: FormDataConfig = genFormData('isContentAndcontent')
    expect(formData.type).toBe('v-textarea')
  })
})

describe('Generate table headers with fields Name', () => {
  it('renders 3 headers of v-data-table when passed', () => {
    let fields = ['_id', 'name', 'date']
    let tableHeaders: VTableHeaderConfig[] = VGenTableHeaders(fields)
    expect(tableHeaders.length).toBe(3)
  })
  it('renders headers value and type when passed', () => {
    let fields = ['_id', 'name', 'date', 'content']
    let tableHeaders: VTableHeaderConfig[] = VGenTableHeaders(fields)
    expect(tableHeaders[0]['value']).toBe('_id')
    expect(tableHeaders[1]['type']).toBe('v-text-field')
    expect(tableHeaders[2]['type']).toBe('v-date-picker')
    expect(tableHeaders[3]['type']).toBe('v-textarea')
    expect(tableHeaders[1]['attrs']['class']).toBe('pa-1 ma-1')
  })
})
