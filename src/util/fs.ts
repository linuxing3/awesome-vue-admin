const path = require('path')
const fs = require('fs')
const { resolve } = require('path')
const exec = require('child_process').exec

export class FileManager {
  drives = []
  rootDir = ''
  homeDir = ''
  templateDir = ''

  constructor (rootDir?) {
    this.rootDir = rootDir || '.'
    this.getFolders(this.rootDir)
  }
  /**
  * @examples
  *
  */
  getWindowsDrives () {
    if (process.platform !== 'win32') {
      throw new Error('getWindowsDrives called but process.plaform !== \'win32\'')
    }

    exec('wmic logicaldisk get name', (error, stdout) => {
      if (error) throw new Error(error)
      stdout.split('\r\r\n')
        .filter(value => /[A-Za-z]:/.test(value))
        .map(value => {
          this.drives.push(value.trim())
        })
    })
  }

  getWindowsHomeDir () {
    if (process.platform !== 'win32') {
      throw new Error('getWindowsDrives called but process.plaform !== \'win32\'')
    }

    exec('wmic environment where "name=\'home\'" get VariableValue', (error, stdout) => {
      if (error) throw new Error(error)
      console.log(stdout)
      this.homeDir = stdout.split('\r\r\n')[1]
      console.log(this.homeDir)
    })
  }

  getWindowsTemplateDir (homeDir, subDir) {
    this.templateDir = resolve(homeDir, subDir)
  }

  /**
  * 生成器函数，异步递归显示一个文件夹下的目录
  * Generator function that lists all files in a folder recursively
  * in a synchronous fashion
  *
  * @param {String} folder - folder to start with
  * @param {Number} recurseLevel - number of times to recurse folders
  * @returns {IterableIterator<String>}
  */
  * walkFolders (folder, recurseLevel = 0) {
    try {
      const files = fs.readdirSync(folder)

      for (const file of files) {
        try {
          const pathToFile = path.join(folder, file)
          const stat = fs.statSync(pathToFile)
          const isDirectory = stat.isDirectory()
          if (isDirectory && recurseLevel > 0) {
            yield * this.walkFolders(pathToFile, recurseLevel - 1)
          } else {
            yield {
              rootDir: folder,
              fileName: file,
              isDir: isDirectory,
              stat: stat
            }
          }
        } catch (err) {
          yield {
            rootDir: folder,
            fileName: file,
            error: err
          }
        }
      }
    } catch (err) {
      yield {
        rootDir: folder,
        error: err
      }
    }
  }

  getFolders (absolutePath: string) {
    let folders = []

    for (const fileInfo of this.walkFolders(absolutePath, 3)) {
      // all files and folders
      if ('error' in fileInfo) {
        console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`)
        continue
      }
      // we only want folders
      if (!fileInfo.isDir) {
        continue
      }
      const node = this.createNode(fileInfo)
      folders.push(node)
    }
    return folders
  }

  getFolderContents (folder: string) {
    let contents = []

    for (const fileInfo of this.walkFolders(folder, 3)) {
      // all files and folders
      if ('error' in fileInfo) {
        console.error(`Error: ${fileInfo.rootDir} - ${fileInfo.error}`)
        continue
      }
      const node = this.createNode(fileInfo)
      contents.push(node)
    }

    return contents
  }

  createNode (fileInfo) {
    let nodeKey = fileInfo.rootDir

    if (nodeKey.charAt(nodeKey.length - 1) !== path.sep) {
      nodeKey += path.sep
    }

    if (fileInfo.fileName === path.sep) {
      fileInfo.fileName = nodeKey
    } else {
      nodeKey += fileInfo.fileName
    }
    // get file mime type
    // const mimeType = mime.lookup(nodeKey)
    // create object
    return {
      label: fileInfo.fileName,
      nodeKey: nodeKey,
      expandable: fileInfo.isDir,
      tickable: true,
      lazy: true,
      children: [],
      data: {
        rootDir: fileInfo.rootDir,
        isDir: fileInfo.isDir,
        // mimeType: mimeType,
        stat: fileInfo.stat
      }
    }
  }
}
