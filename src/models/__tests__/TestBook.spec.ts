import TestBook from '../CoreModel/TestBook/TestBook'

describe('@/models/CoreModel/TestBook/TestBook', () => {
  it('expect to be a valid model', () => {
    const model = new TestBook()
    expect(model).toBeInstanceOf(TestBook)
  })

  it('expect to json', () => {
    const model = new TestBook()
    const json = model.$toJson()
    const expected = {
      _id: 1
    }
    expect(json._id).toEqual(expected._id)
  })
})
