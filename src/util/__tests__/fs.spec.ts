const path = require('path')
const fs = require('fs')
import { FileManager } from '../fs'

describe('Testing fs', () => {
  it('testing windows drive', () => {
    const fm = new FileManager('.')
    fm.getWindowsDrives()
    const drives = fm.drives
    expect(drives.length).toBe(5)
  })
})