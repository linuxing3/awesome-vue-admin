import { translate } from '@/plugins/translate'

describe('Try translate', () => {
  it('Translate locales ...', async () => {
    await translate()
    expect(1).toBe(1)
  })
})
