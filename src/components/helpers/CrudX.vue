<template>
  <div id="crud-x-helper">
    <v-layout row wrap>
      <v-flex xs12>
        <vue-crud-x ref="crud-x-table" :storeName="modelName" :parentId="null" v-bind="modelDefs" @form-open="openForm">
          <template slot="filter" slot-scope="{ filterData, parentId, storeName }">
            <h1>Custom {{ storeName }} Filter Slot</h1>
            <div v-for="(filter, index) in filterData" :key="index">
              <component :is="filter.type" v-model="filter.value" v-bind="filter.attrs"></component>
            </div>
          </template>
          <template slot="table" slot-scope="{ records, totalRecs, pagination }">
            <div v-for="record in records" :key="record.id"><p>{{ record.id }} {{ record.name }} <v-btn @click="$refs['book-table'].crudFormOpen(record.id)">Open</v-btn></p></div>
            <div>{{ totalRecs }} {{ pagination }}</div>
          </template>
          <template slot="form" slot-scope="{ record, parentId, storeName }">
            <div>
              <h1>Custom {{ storeName }} Form Slot - Has Parent: {{ !!parentId }}</h1>
              <v-card-text>
                <v-text-field label="Name" v-model="record.name"></v-text-field>
                <v-select label="Category" v-model="record.categoryId" :items="categories" required item-text="name" item-value="id"></v-select>
                <v-autocomplete multiple v-model="authorIds" :items="items" :loading="isLoading" :search-input.sync="search"
                  chips clearable hide-selected item-text="name" item-value="id" label="Search for a author... (Maximum 2)"
                >
                  <template slot="no-data">
                    <v-list-tile>
                      <v-list-tile-title>No author yet...</v-list-tile-title>
                    </v-list-tile>
                  </template>
                  <template slot="selection" slot-scope="{ item, selected }">
                    <v-chip :selected="selected" close @input="remove(item)">
                      <span v-text="item.name"></span>
                    </v-chip>
                  </template>
                  <template slot="item" slot-scope="{ item }">
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.name"></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </v-autocomplete>
                <v-btn @click.stop.prevent="gotoPages(record.id)" dark>View Book Pages</v-btn>
              </v-card-text>
            </div>
          </template>
        </vue-crud-x>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { from } from 'rxjs'
import { pluck, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators' // map
import axios from 'axios'
import VueCrudX from 'vue-crud-x'
import models from '@/models'

export default {
  subscriptions () {
    return {
      // clean autocomplete using rxJS
      items: this.$watchAsObservable('search').pipe(
        pluck('newValue'), filter(text => text ? text.length > 2 : false),
        debounceTime(500), distinctUntilChanged(), switchMap(this.fetchTerm)
      )
    }
  },
  name: 'v-crud-x',
  components: { VueCrudX },
  computed: {
    Model () {
      return models[this.modelName]
    }
  },
  data () {
    return {
      modelName: 'user',
      // for autocomplete
      isLoading: false, 
      authorIds: [], 
      search: '',

      // list of categories - can be moved to database in future
      categories: [ { id: 1, name: 'cat1' }, { id: 2, name: 'cat2' } ],
      
      // props to be passed into vue-crud-x component
      modelDefs: {
        crudTable: {
          confirmCreate: true, confirmUpdate: true, confirmDelete: true,
          headers: [
            { text: 'Book Name', value: 'name', class: 'pa-1' },
            { text: 'Category', value: 'categoryName', class: 'pa-1' }
          ],
          formatters: (value, _type) => value, // format table cell data
          doPage: true // do pagination?
        },
        crudFilter: {
          FilterVue: null,
          filterData: {
            name: { // search filter by table property called 'name'
              type: 'v-text-field', value: '', attrs: { label: 'Name' }
            }
          }
        },
        crudForm: {
          FormVue: () => {},
          formAutoData: null,
          defaultRec: () => ({
            id: '', name: '', categoryId: '', categoryName: '', authorIds: [], authors: []
          })
        },
        crudOps: { // CRUD
          export: async (payload) => { },
          find: async (payload) => {
          },
          findOne: async (payload) => {
          },
          create: async (payload) => {
          },
          update: async (payload) => {
          },
          delete: null // not implemented
        }
      }
    }
  },
  watch: {
  },
  methods: {
    gotoPages (id) {
    },
    remove (item) {
    },
    openForm (item) {
    },
    fetchTerm (term) {
    }
  }
}
</script>
