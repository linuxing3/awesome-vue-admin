import { join } from 'path'
import { pathExistsSync, mkdirpSync } from 'fs-extra'
import { remote, app, App } from 'electron'
import LodashId from 'lodash-id'
import { lowerFirst } from 'lodash'
import Datastore, { AdapterSync, LowdbSync } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { REQUEST_METHODS_TYPES } from '@/api/constant'

export default class LowdbService {
  $electronApp: App
  $localStorePath: string
  $adapter: AdapterSync
  $localstore: LowdbSync<any>

  constructor ({ dbDir = '', dbName = '', isElectron = true }) {
    // Init context
    this.$electronApp = process.type === 'renderer' ? remote.app : app

    this.$localStorePath = isElectron
      ? join(this.$electronApp.getPath('userData'), dbDir)
      : join(__dirname, dbDir)

    this.$adapter = new FileSync(join(this.$localStorePath, `${dbName}.json`))

    if (!pathExistsSync(this.$localStorePath)) mkdirpSync(this.$localStorePath)

    this.$localstore = Datastore(this.$adapter)
    this.$localstore._.mixin(LodashId)
  }

  /**
   * Database persistence Module
   */
  $connectLocalstore (node = 'app'): any {
    return this.$localstore
      .read()
      .get(node)
      .value()
  }
  /**
   * Init a set of default values
   */
  $initializeLocalstore (nodes: string[]): void {
    // Create user-level nodes like user.json
    nodes && this.$initializeAll(nodes)
  }

  /**
   * Create nodes from a array
   */
  $initializeAll (nodes: string[]): void {
    nodes &&
      nodes.forEach(node => {
        this.$initializeDefaultNode(node)
      })
  }
  /**
   * Set a array as default value of a key or key or namespace
   * { namespace: []}
   * @param {string} node key or key or namespace name, i.e. activity
   */
  $initializeDefaultNode (node: string): void {
    console.log(`creating default value in ${node} lowdb`)
    if (!this.$localstore.has(node).value()) {
      this.$localstore.set(node, []).write()
    } else {
      console.log(`${node} default value exists`)
    }
  }
  /**
   * Remove a key
   * @param {string} node key or key or namespace name, i.e. activity
   */
  $destroyDefaultNode (node: string): void {
    if (!this.$localstore.has(node).value()) {
      this.$localstore.unset(node).write()
    }
  }

  /**
   * Inserta data in a specific key with key or namespace
   * @param {string} url key or namespace like activity
   * @param {object} payload data without id, since lodash-id will use unique id
   * @return {void} void
   */
  $request (url: string, payload: any) {
    let result: any = null

    let [method = 'get', path] = url.split(' ')
    let [namespace] = path.split('/')

    let query = {
      id: payload._id
    }

    method = method.toLowerCase()

    if (REQUEST_METHODS_TYPES.mutation.includes(method)) {
      console.log('Mutating ...')
      if (method === 'post') {
        result = this.$create(namespace, payload)
      } else if (method === 'patch') {
        result = this.$update(namespace, query, payload)
      } else if (method === 'delete') {
        result = this.$delete(namespace, query)
      }
    }
    if (REQUEST_METHODS_TYPES.query.includes(method)) {
      console.log('Quering ...')
      if (payload) {
        result = this.$get(namespace, query)
      }
      result = this.$fetch(namespace)
    }
    return result
  }

  /**
   * Inserta data in a specific key with key or namespace
   * @param {string} namespace key or namespace like activity
   * @param {object} data data without id, since lodash-id will use unique id
   * @return {void} void
   */
  $create (namespace: string, data: any): void {
    console.log('Inserting in ' + namespace)
    // skip reinsert same _id
    if (this.$get(namespace, { _id: data._id }) !== undefined) {
      console.log('Identity namespace exites, skip!')
      return
    }
    // delete if has id property, only for avoid lodash-id conflict
    data.id && delete data.id
    this.$localstore
      .read()
      .get(`${lowerFirst(namespace)}`)
      .push(data)
      .write()
  }

  /**
   * Update data in a specific key with key or namespace
   * @param {string} namespace key or namespace
   * @param {object} query query statements
   * @param {object} data data
   * @return {void} void
   */
  $update (namespace: string, query: any, data: any): void {
    console.log('Updating in ' + namespace)
    this.$localstore
      .read()
      .get(`${lowerFirst(namespace)}`)
      .find(query)
      .assign(data)
      .write()
  }

  /**
   * Delete data in a specific key with key or namespace
   * @param {string} namespace key or namespace
   * @param {object} query query statement
   * @return {undefined} undefined
   */
  $delete (namespace: string, query: any): void {
    console.log('Deleting in ' + namespace)
    this.$localstore
      .read()
      .get(`${lowerFirst(namespace)}`)
      .remove(query)
      .write()
  }

  /**
   * Find and Query data in a specific key with key or namespace
   * @param {string} namespace key or namespace
   * @param {object} query query statement
   * @return {object, undefined} undefined is found nothing, else the data set
   */
  $get (namespace: string, query: any): object | undefined {
    console.log('Querying in ' + namespace)
    return this.$localstore
      .read()
      .get(`${lowerFirst(namespace)}`)
      .find(query)
      .value()
  }

  /**
   * Find and Query data in a specific key with key or namespace
   * @param {string} namespace key or namespace
   * @return {array} array of all element
   */
  $fetch (namespace: string): any[] {
    console.log('Querying in ' + namespace)
    return this.$localstore
      .read()
      .get(`${lowerFirst(namespace)}`)
      .value()
  }

  /**
   * Find and Query data in a specific key with key or namespace
   * @param {string} namespace key or namespace
   */
  $clear (namespace: string): void {
    console.log('Clearing in ' + namespace)
    this.$localstore.set(`${lowerFirst(namespace)}`, []).write()
  }
}
