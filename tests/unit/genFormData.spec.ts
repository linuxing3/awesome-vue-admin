import { genFormData, genTableHeaders } from '@/util/genFormData'

describe('Generate form data with field Name', () => {

  it('renders v-textarea when passed', () => {
    let formData = genFormData('content')
    expect(formData.type).toBe('v-textarea')
  })

  it('renders v-textarea with Capitialize when passed', () => {
    let formData = genFormData('Content')
    expect(formData.type).toBe('v-textarea')
  })

  it('renders v-textarea with regex when passed', () => {
    let formData = genFormData('isContentAndcontent')
    expect(formData.type).toBe('v-textarea')
  })
})

describe('Generate table headers with fields Name', () => {

  it('renders 3 headers of v-data-table when passed', () => {
    let fields = [ '_id', 'name', 'date' ]
    let tableHeaders = genTableHeaders(fields)
    expect(tableHeaders.length).toBe(3)

  })
  it('renders headers value and type when passed', () => {
    let fields = [ '_id', 'name', 'date' ]
    let tableHeaders = genTableHeaders(fields)
    expect(tableHeaders[0]['value']).toBe('_id')
    expect(tableHeaders[2]['type']).toBe('v-date-picker')
  })

})
