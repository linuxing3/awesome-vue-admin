<template>
  <div>
    <a-card
        style="margin-top: 24px"
        :bordered="false"
        title="列表">

      <div class="operate">
        <a-button
            type="dashed"
            style="width: 100%"
            icon="plus"
            @click="() => handleCreate()"
          >添加</a-button>
      </div>

      <a-list
          size="large"
          :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item
            :key="index"
            v-for="(item, index) in data">
          <a-list-item-meta :description="item.id">
            <a-avatar
                slot="avatar"
                size="large"
                shape="square"
                :src="item.avatar"/>
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a
                class="edit"
                @click="() => handleEdit(item)">编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a @click="() => handleEdit(item)">编辑</a></a-menu-item>
                <a-menu-item><a @click="() => handleRemove(item)">删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>name</span>
              <p>{{ item.name }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>

    </a-card>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  components: {
  },
  data () {
    return {
      modelName: 'user',
      data: [],
      pagination: {
        pageSize: 10,
        pageNo: 1
      }
    }
  },
  computed: {
    needUpdate () {
      return this.$route.params.needUpdate
    }
  },
  watch: {
    needUpdate: async function (val) {
      console.log('NeedUpdate...')
      if (val) await this.handleFetch()
    }
  },
  async mounted () {
    await this.handleFetch()
  },
  methods: {
    async handleFetch () {
      const { pagination } = this
      const { result: { data } } = await this.$lf.request({
        url: `/${this.modelName}`,
        method: 'get',
        pagination
      })
      console.log(data)
      this.data = data
    },
    async handleDelete (row) {
      console.log('Deleting ... ')
      await this.$lf.request({
        url: `/${this.modelName}`,
        method: 'delete',
        data: row.id
      })
      setTimeout(this.handleFetch(), 1000)
    },
    handleEdit (row) {
      console.log('Editing ... ')
      this.$router.push({
        name: 'UserForm',
        params: {
          id: row.id
        }
      })
    },
    handleCreate () {
      console.log('Creating ... ')
      this.$router.push({
        name: 'UserForm'
      })
    },
    handleRemove (row) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${row.id} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          console.log('OK')
          this.handleDelete(row)
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>
