declare module 'vuex-orm-localforage' {
  class VuexOrmLocalForagePlugin {
    /**
     * This is called, when VuexORM.install(VuexOrmLocalForage, options) is called.
     *
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     * @returns {VuexOrmLocalForage}
     */
    install(components: any, options: any): VuexOrmLocalForage
  }

  class VuexOrmLocalForage {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    constructor(components: any, options: any)
    /**
     * This method will setup following Vuex actions: $fetch, $get
     */
    setupActions(): void

    /**
     * This method will setup following model methods: Model.$fetch, Model.$get, Model.$create,
     * Model.$update, Model.$delete
     */
    setupModels(): void

    setupLifecycles(): void
  }

  class Action {
    /**
     * Transform Model to include ModelConfig
     * @param {object} model
     */
    transformModel(model: any): any

    getRecordKey(record: any): any
  }

  class Persist extends Action {
    /**
     * Is called when an item is inserted or updated in the store
     *
     * @param {object} store
     * @param {object} payload
     */
    static call({ dispatch }: any, payload: any, action?: string): Promise<any>
    static create(context: any, payload: any): Promise<any>
    static update(context: any, payload: any): Promise<any>
  }

  class Get extends Action {
    /**
     * Call $fetch method
     * @param {object} store
     * @param {object} params
     */
    static call({ state, dispatch }: any, params: any): Promise<any>
  }

  class Fetch extends Action {
    /**
     * Call $fetch method
     * @param {object} store
     * @param {object} params
     */
    static call({ state, dispatch }: any): Promise<any>
  }

  class Destroy extends Action {
    /**
     * Is Called after new model deletion from the store
     *
     * @param {object} record
     * @param {string} entityName
     */
    call({ state, dispatch }: any, payload: any): Promise<any>
  }

  export default class Context {
    /**
     * Private constructor, called by the setup method
     *
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     */
    constructor(components: any, options: any)
    /**
     * This is called only once and creates a new instance of the Context.
     * @param {Components} components The Vuex-ORM Components collection
     * @param {Options} options The options passed to VuexORM.install
     * @returns {Context}
     */
    static setup(components: any, options: any): any
    /**
     * Get the singleton instance of the context.
     * @returns {Context}
     */
    static getInstance(): any
    /**
     * Get Model from State
     * @param {object} state
     */
    getModelFromState(state: any): any
    /**
     * Get model by entity
     * @param {Object} entity
     */
    getModelByEntity(entity: any): any
  }
}
