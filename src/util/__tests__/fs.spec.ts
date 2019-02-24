import { FileManager } from '../fs'
const path = require('path')
const fs = require('fs')

describe('Testing fs', () => {
  it('testing windows drive', () => {
    const fm = new FileManager('.')
    fm.getWindowsDrives()
    const drives = fm.drives
    expect(drives.length).toBe(5)
  })
})
