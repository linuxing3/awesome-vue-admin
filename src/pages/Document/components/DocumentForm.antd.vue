<template>
  <div>
    <a-button
        type="primary"
        @click="showModal"
      >
      New
    </a-button>
    <collection-create-form
        ref="collectionForm"
        :visible="visible"
        @cancel="handleCancel"
        @create="handleCreate"
      />
  </div>
</template>

<script>
import exportMixin from '@/mixins/exportMixin'
import crudMixin from '@/mixins/crudMixin.request'

const CollectionCreateForm = {
  props: ['visible'],
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  template: `
    <a-modal
      :visible="visible"
      title='Create'
      okText='Create'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='Title'>
          <a-input
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='Description'>
          <a-input
            type='textarea'
            v-decorator="['description']"
          />
        </a-form-item>
        <a-form-item class='collection-create-form_last-form-item'>
          <a-radio-group
            v-decorator="[
              'modifier',
              {
                initialValue: 'private',
              }
            ]"
          >
              <a-radio value='public'>Public</a-radio>
              <a-radio value='private'>Private</a-radio>
            </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  `
}

export default {
  components: { CollectionCreateForm },
  data () {
    return {
      modelName: 'document',
      visible: false
    }
  },
  mixins: [crudMixin, exportMixin],
  methods: {
    showModal () {
      this.visible = true
    },
    handleCancel  () {
      this.visible = false
    },
    handleCreate  () {
      const form = this.$refs.collectionForm.form
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        console.log('Received values of form: ', values)
        form.resetFields()
        this.visible = false
      })
    }
  }
}
