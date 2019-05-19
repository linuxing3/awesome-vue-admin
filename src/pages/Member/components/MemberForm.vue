<template>
  <a-card
      :body-style="{padding: '24px 32px'}"
      :bordered="false">
    <a-form
        @submit="handleSubmit"
        :form="form">
      <a-form-item
          label="编号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
            v-decorator="[
              'id',
              {rules: [{ required: false, message: '自动编号' }]}
            ]"
            name="id"
            disabled />
      </a-form-item>
      <a-form-item
          v-for="(field, index) in fields"
          :key="index"
          :label="field"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
            v-decorator="[
              field,
              {rules: [{ required: true, message: '请输入' }]}
            ]"
            :name="field"
            :placeholder="field" />
      </a-form-item>
      <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
        <a-button
            htmlType="submit"
            type="primary">提交</a-button>
        <a-button
            style="margin-left: 8px"
            @click="() => handleReset()">取消</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: 'MemberForm',
  data () {
    return {
      modelName: 'member',
      description: '搜集成员信息',
      value: 1,
      // form
      form: this.$form.createForm(this),
      fields: [ 'name', 'username', 'password', 'avatar', 'status', 'telephone' ]
    }
  },
  computed: {
    id () {
      return this.$route.params.id || -1
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleGetInfo()
    })
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log(`Received values of ${this.modelName}: `, values)
          this.handleAddOrEdit(values)
        }
      })
      new Promise((resolve) => {
        setTimeout(resolve, 500)
      }).then(() => {
        this.handleReset()
      })
    },
    handleAddOrEdit (data) {
      // if has id, update. Else add new
      if (this.id === -1) {
        console.log('Creating...')
        this.$lf.request({
          url: `/${this.modelName}`,
          method: 'post',
          data
        })
      } else {
        console.log('updating...')
        this.$lf.request({
          url: `/${this.modelName}`,
          method: 'patch',
          data
        })
      }
    },
    async handleGetInfo () {
      // if no id, do not get
      if (this.id === -1) {
        return
      }
      // if has id, get info to edit
      // ajax
      const { result: { data, model } } = await this.$lf.request({
        url: `/${this.modelName}`,
        method: 'get',
        data: { id: this.id }
      })
      this.loadEditInfo(data)
    },
    async handleGetFields () {
      const { result: { model } } = await this.$lf.request({
        url: `/${this.modelName}`,
        method: 'get'
      })
      const fields = Object.keys(model.fields) 
      console.log(fields)
      this.fields = fields
    },
    loadEditInfo (data) {
      const { form } = this
      console.log(`编辑记录 ${this.id}`)
      new Promise((resolve) => {
        setTimeout(resolve, 500)
      }).then(() => {
        console.log('formData:', data)
        form.setFieldsValue(data)
      })
    },
    handleReset () {
      this.$router.push({
        name: 'MemberList',
        params: {
          needUpdate: true
        }
      })
    }
  }
}
</script>
