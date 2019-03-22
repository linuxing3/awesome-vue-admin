import Document from '../CoreModel/Document/Document'

describe('@/models/CoreModel/Document/Document', () => {
  it('expect to be a valid model', () => {
    const model = new Document()
    expect(model).toBeInstanceOf(Document)
  })

  it('expect to json', () => {
    const model = new Document()
    const json = model.$toJson()
    const expected = {
      _id: 1
    }
    expect(json._id).toEqual(null)
  })
})
