declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare class LocalForageModel {
  /**
   * Create a record, but persist to indexDB
   */
  static $create(this: any, payload: any): Promise<any>
  /**
   * Delete a record, but persist to indexDB
   */
  static $delete(this: any, payload: any): Promise<any>
  /**
   * update a record, but persist to indexDB
   */
  static $update(this: any, payload: any): Promise<any>
  /**
   * update a record, but persist to indexDB
   */
  static $fetch(this: any): Promise<any>
}

declare interface VuexORM {
  Model: typeof LocalForageModel
}
