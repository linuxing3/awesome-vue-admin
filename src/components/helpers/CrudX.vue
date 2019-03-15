<template>
  <div id="crud-x-helper">
    <v-layout
        row
        wrap>
      <v-flex xs12>
        <vue-crud-x
            ref="crud-x-table"
            :storeName="modelName"
            :parentId="null"
            v-bind="modelDefs"
            @form-open="crudFormOpen">
          <template
              slot="filter"
              slot-scope="{ filterData, parentId, storeName }">
            <h1> {{ storeName }} Filter Slot</h1>
            <div
                v-for="(filter, index) in filterData"
                :key="index">
              <component
                  :is="filter.type"
                  v-model="filter.value"
                  v-bind="filter.attrs"></component>
            </div>
          </template>
          <template
              slot="table"
              slot-scope="{ records, totalRecs, pagination }">
            <div
                v-for="record in records"
                :key="record.id"><p>{{ record._id }} {{ record.name }} <v-btn @click="$refs['crud-x-table'].crudFormOpen(record._id)">Open</v-btn></p></div>
            <div>{{ totalRecs }} {{ pagination }}</div>
          </template>
          <template
              slot="form"
              slot-scope="{ record, parentId, storeName }">
            <div>
              <h1>Custom {{ storeName }} Form Slot</h1>
            </div>
          </template>
        </vue-crud-x>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { from } from 'rxjs'
import { pluck, filter, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators' // map
import axios from 'axios'
import VueCrudX from 'vue-crud-x'
import models from '@/models'
import { generateHeaders, isDateField } from '@/mixins/crudMixin'

export default {
  name: 'v-crud-x',
  components: { VueCrudX },
  subscriptions () {
    return {
      // clean autocomplete using rxJS
      foundItems: this.$watchAsObservable('search')
        .pipe(
          pluck('newValue'),
          filter(text => text ? text.length > 2 : false),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(this.fetchRemote)
        ),
      headerData: this.$watchAsObservable('modelName')
        .pipe(
          pluck('newValue'),
          map(modelName => models[modelName]),
          map(modelClass => modelClass.fieldKeys()),
          switchMap(fields => this.genHeader(fields))
        ),
      fieldsFormData: this.$watchAsObservable('modelName')
        .pipe(
          pluck('newValue'),
          map(modelName => models[modelName]),
          map(modelClass => modelClass.fieldKeys()),
          switchMap(fields => this.genFormData(fields))
        )
    }
  },
  computed: {
    ModelClass () {
      return models[this.modelName]
    }
  },
  mounted() {
    this.modelName = 'user'
  },
  data () {
    return {
      modelName: '',
      // ModelClass: null,
      // for autocomplete
      editedItem: {},
      editedIndex: -1,
      isLoading: false,
      indexs: [],
      search: '',

      // list of categories - can be moved to database in future
      categories: [ { id: 1, name: 'cat1' }, { id: 2, name: 'cat2' } ],

      // props to be passed into vue-crud-x component
      modelDefs: {
        crudTable: {
          saveRow: '#ffaaaa',
          inlineReload: {
            update: true,
            create: true,
            delete: true
          },
          addrowCreate: [
            {
              field: 'name',
              label: 'name'
            }
          ],
          confirmCreate: true,
          confirmUpdate: true,
          confirmDelete: true,
          // Observe modelName and update header data
          headers: this.headerData,
          formatters: (value, _type) => {
            if (_type === 'language') return value.join(',')
            return value
          },
          doPage: true,
          crudTitle: 'Custom title'
        },
        crudFilter: {
          FilterVue: null,
          filterData: {
            name: {
              type: 'v-text-field', value: '', attrs: { label: 'Name' }
            }
          }
        },
        crudForm: {
          // FormVue: () => {},
          // Observe modelName and update form data
          formAutoData: this.fieldsFormData,
          defaultRec: () => {
            return new this.ModelClass()
          }
        },
        crudOps: { // CRUD
          export: async (payload) => {
            // 
          },
          find: async (payload) => {
            await this.ModelClass.$fetch()
            // refresh vuex to component
            let records = this.modelClass.query()
              .withAll()
              .get()
            let totalRecs = this.modelClass.count()
            let pagination = {}
            return { records, totalRecs, pagination }
          },
          findOne: async (payload) => {
          },
          create: async (payload) => {
            try {
              let entities = await this.ModelClass.$create({
                data: payload
              })
              return true
            } catch (error) {
              return false
            }
          },
          update: async (payload) => {
            try {
              let entities = await this.Model.$update({
                data: payload
              })
              return true
            } catch (error) {
              return false
            }
          },
          delete: null // not implemented
        }
      }
    }
  },
  mounted() {
    await this.ModelClass.$fetch()
  },
  methods: {
    gotoPages (id) {
      let params = {
        _id: id
      }
      this.$router.push({ name: 'crud', params })
    },
    /**
     * 设置当前编辑项的索引和数据备用
     * @param item
     */
    setEditedItem (item) {
      this.editedItem = Object.assign({}, item)
      this.editedIndex = this.editedItem._id
    },
    remove (item) {
      this.setEditedItem(item)
      if (this.editedIndex > -1) {
        this.ModelClass.$delete(this.editedItem._id)
          .then(entities => {
            console.log(entities)
          })
      } else {
        console.log('Found no item to delete!')
      }
    },
    crudFormOpen (item) {
      this.editedIndex = item._id
    },
    /**
     * 
     * @return Observable
     */
    fetchRemote (term) {
      let records = []
      let totalRecs = 0
      let pagination = {}
      return from({ records, totalRecs, pagination })
    },
    /**
     * 
     * @return Observable
     */
    genHeader (fields) {
      return from(fields.reduce((headersConfig, field) => {
        let config = {
          value: field,
          text: field,
          align: 'left',
          sortable: true,
          class: 'pa-1'
        }
        headersConfig.push(config)
        return headersConfig
      }, []))
    },
    genFormData (fields) {
      return from(fields.reduce((fieldsFormData, field) => {
        let schema = {}
        schema[field] = {
          type: 'v-text-field',
          halfSize: true,
          attrs: {
            label: field,
            rules: []
          }
        }
        fieldsFormData.push(schema)
        return fieldsFormData
      }, []))
    },
    async asyncData (modelName) {
      console.log(this.modelClass.entity)
      // load data from localforage to vuex
      await this.ModelClass.$fetch()
      // refresh vuex to component
      let records = this.modelClass.query()
        .withAll()
        .get()
      let totalRecs = this.modelClass.count()
      let pagination = {}
      return from({ records, totalRecs, pagination })
    }
  }
}
</script>
