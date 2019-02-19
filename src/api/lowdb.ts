import { join } from 'path'
import { pathExistsSync, mkdirpSync } from 'fs-extra'
import { remote, app, App } from 'electron'
import LodashId from 'lodash-id'
import { lowerFirst } from 'lodash'
import Datastore, { AdapterSync, LowdbSync } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import Memory from 'lowdb/adapters/Memory'

export default class AwesomeLowdb {
  app: App
  dbPath: string
  adapter: AdapterSync
  db: LowdbSync<any>

  constructor ({ dbDir, dbName, isElectron }) {
    // Init context
    this.app = this.electronApp()

    this.dbPath = isElectron
      ? join(this.app.getPath('userData'), dbDir)
      : join(__dirname, dbDir)

    this.adapter = new FileSync(join(this.dbPath, `${dbName}.json`))

    if (!pathExistsSync(this.dbPath)) mkdirpSync(this.dbPath)

    this.db = Datastore(this.adapter)
    this.db._.mixin(LodashId)
  }

  electronApp () {
    return (process.type === 'renderer' ? remote.app : app)
  }

  /**
   * Database persistence Module
   */
  dbOpen (node: string): any {
    return this.db
      .read()
      .get(node)
      .value()
  }
  /**
   * Init a set of default values
   */
  dbInit (nodes: string[]): void {
    // Create user-level nodes like user.json
    nodes && this.batchInit(nodes)
  }

  /**
   * Create nodes from a array
   */
  batchInit (nodes: string[]): void {
    nodes &&
      nodes.forEach(node => {
        this.insertDefaultKey(node)
      })
  }
  /**
   * Set a array as fefault value of a key or key or entity
   * { entity: []}
   * @param {string} node key or key or entity name, i.e. activity
   */
  insertDefaultKey (node: string): void {
    console.log(`creating default value in ${node} lowdb`)
    if (!this.db.has(node).value()) {
      this.db.set(node, []).write()
    } else {
      console.log(`${node} default value exists`)
    }
  }
  /**
   * Remove a key
   * @param {string} node key or key or entity name, i.e. activity
   */
  removeDefaultKey (node: string): void {
    if (!this.db.has(node).value()) {
      this.db.unset(node).write()
    }
  }
  /**
   * Inserta data in a specific key with key or entity namespace
   * @param {string} entity key or entity namespace like activity
   * @param {object} data data without id, since lodash-id will use unique id
   * @return {void} void
   */
  insert (entity: string, data: any): void {
    console.log('Inserting in ' + entity)
    // skip reinsert same _id
    if (this.find(entity, { _id: data._id }) !== undefined) {
      console.log('Identity Entity exites, skip!')
      return
    }
    // delete if has id property, only for avoid lodash-id conflict
    data.id && delete data.id
    this.db
      .read()
      .get(`${lowerFirst(entity)}`)
      .push(data)
      .write()
  }

  /**
   * Update data in a specific key with key or entity namespace
   * @param {string} entity key or entity namespace
   * @param {object} query query statements
   * @param {object} data data
   * @return {void} void
   */
  update (entity: string, query: any, data: any): void {
    console.log('Updating in ' + entity)
    this.db
      .read()
      .get(`${lowerFirst(entity)}`)
      .find(query)
      .assign(data)
      .write()
  }

  /**
   * Delete data in a specific key with key or entity namespace
   * @param {string} entity key or entity namespace
   * @param {object} query query statement
   * @return {undefined} undefined
   */
  delete (entity: string, query: any): void {
    console.log('Deleting in ' + entity)
    this.db
      .read()
      .get(`${lowerFirst(entity)}`)
      .remove(query)
      .write()
  }

  /**
   * Find and Query data in a specific key with key or entity namespace
   * @param {string} entity key or entity namespace
   * @param {object} query query statement
   * @return {object, undefined} undefined is found nothing, else the data set
   */
  find (entity: string, query: any): object | undefined {
    console.log('Querying in ' + entity)
    return this.db
      .read()
      .get(`${lowerFirst(entity)}`)
      .find(query)
      .value()
  }
  filter (entity: string, query: any): any[] {
    console.log('Querying in ' + entity)
    return this.db
      .read()
      .get(`${lowerFirst(entity)}`)
      .filter(query)
      .value()
  }
  /**
   * Find and Query data in a specific key with key or entity namespace
   * @param {string} entity key or entity namespace
   * @return {array} array of all element
   */
  all (entity: string): any[] {
    console.log('Querying in ' + entity)
    return this.db
      .read()
      .get(`${lowerFirst(entity)}`)
      .value()
  }

  /**
   * Find and Query data in a specific key with key or entity namespace
   * @param {string} entity key or entity namespace
   */
  clear (entity: string): void {
    console.log('Clearing in ' + entity)
    this.db.set(`${lowerFirst(entity)}`, []).write()
  }
}
