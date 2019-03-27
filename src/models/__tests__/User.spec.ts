import User from '../CoreModel/User/User'

describe('@/models/CoreModel/User/User', () => {
  beforeEach(() => {
    User.insert({ data: { name: 'Daniel' } })
    User.insert({ data: { name: 'Xiao' } })
    User.insert({ data: { name: 'Daniel' } })
  })

  afterEach(() => {
    User.deleteAll()
  })
  it('expect to be a valid model', () => {
    const model = new User()
    expect(model).toBeInstanceOf(User)
  })
  it('expect model name field is default value', () => {
    const model = new User()
    expect(model['name']).toBe('Daniel')
  })

  it('expect to json', () => {
    const model = new User()
    const json = model.$toJson()
    expect(json._id).toEqual(null)
    expect(json['name']).toEqual('Daniel')
  })
  it('expect unique value of fields', () => {
    let values = User.uniqueValuesOfField('name')
    expect(values).toEqual(['Daniel', 'Xiao'])
  })
  it('expect total of records', () => {
    let count = User.count()
    expect(count).toBe(3)
  })

  it('expect relations fields is zero', () => {
    let count = User.relationFieldsWithId().length
    expect(count).toBe(4)
  })

  it('expect name is attribute fields', () => {
    let isFieldAttribute = User.isFieldAttribute(User.fields()['name'])
    expect(isFieldAttribute).toBe(true)
  })
  it('expect militant is relation fields', () => {
    let isFieldRelation = User.isFieldRelation(User.fields()['militant'])
    expect(isFieldRelation).toBe(true)
  })
})
