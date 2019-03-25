import Test from '../CoreModel/Test/Test'

describe('@/models/CoreModel/Test/Test', () => {
  it('expect to be a valid model', () => {
    const model = new Test()
    expect(model).toBeInstanceOf(Test)
  })

  it('expect to json', () => {
    const model = new Test()
    const json = model.$toJson()
    const expected = {
      _id: 1
    }
    expect(json._id).toEqual(expected._id)
  })
})
