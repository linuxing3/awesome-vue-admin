
import test-book from '../CoreModel/test-book/test-book'

describe('@/models/CoreModel/test-book/test-book', () => {

  it('expect to be a valid model', ()=> {
    const model = new test-book()
    expect(model).toBeInstanceOf(test-book)
  })

  it('expect to json', ()=> {
    const model = new test-book()
    const json = model.$toJson()
    const expected = {
      _id: 1
    }
    expect(json._id).toEqual(expected._id)
  })
})