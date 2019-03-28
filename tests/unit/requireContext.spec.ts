import models from '@/models'
import User from '@/models/CoreModel/User/User'

describe('Require Context should work', () => {
  it('should have models required', () => {
    expect(models['user']).toBe(User)
  })
})
