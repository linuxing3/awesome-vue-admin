import User from '../CoreModel/User/User'

describe('@/models/CoreModel/User/User', () => {
  it('expect to be a valid model', () => {
    const model = new User()
    expect(model).toBeInstanceOf(User)
  })

  it('expect to json', () => {
    const model = new User()
    const json = model.$toJson()
    const expected = {
      _id: 1
    }
    expect(json._id).toEqual(null)
  })
})
