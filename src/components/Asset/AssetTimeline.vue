<script>
import Asset from '@/models/Asset'

import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin'

export default {
  data() {
    return {
      modelName: 'asset'
    }
  },
  mixins: [ exportMixin, crudMixin ],
  created() {
    window.AssetTimeline = this
  },
  methods: {
    editItem(item) {
      this.$emit('SET_EDITING', item)
      window.AssetForm.$emit('SET_EDITING', item)
    }
  }
}
</script>

<template>
  <div class='mt-15'>
     <v-timeline>
      <v-timeline-item
        v-for='(item, i) in all'
        color='primary'
        :key='i'
        small
      >
        <span
          slot='opposite'
          :class='`headline font-weight-bold white--text`'
          v-text='item.occurenceDate'
        ></span>
        <div class='py-3'>
          <h2 :class='`headline font-weight-light mb-3 white--text`'>{{ item.content }}</h2>
          <div>
            {{ item.instruction }}
          </div>
          <v-btn
             icon
             class='mx-0'
             @click='deleteItem(item)'>
            <v-icon color='pink'>delete</v-icon>
          </v-btn>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<style lang='stylus' scoped>
  .mt-15
    margin-left: 15px
    margin-right: 15px
</style>
