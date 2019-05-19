<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col
              :md="8"
              :sm="24">
            <a-form-item label="编号">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col
              :md="8"
              :sm="24">
            <a-form-item label="类别">
              <a-select
                  placeholder="请选择"
                  default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
              :md="!advanced && 8 || 24"
              :sm="24">
            <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
              <a
                  @click="toggleAdvanced"
                  style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button
          type="primary"
          icon="plus"
          @click="handleCreate">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon
              type="delete"
              @click="handleMultiDelete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
      >
    </s-table>

  </a-card>
</template>

<script>
import { STable } from '@/components'

export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      modelName: 'member',
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          width: '25px',
          sorter: true
        },
        {
          title: '姓名',
          dataIndex: 'name',
          width: '150px',
          sorter: true,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '用户名',
          dataIndex: 'username',
          width: '150px',
          sorter: true,
          scopedSlots: { customRender: 'username' }
        },
        {
          title: '图像',
          dataIndex: 'avatar',
          width: '150px',
          sorter: true,
          scopedSlots: { customRender: 'avatar' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const pagination = Object.assign(parameter, this.queryParam)
        console.log(pagination)
        return this.$lf.request({
          url: `/${this.modelName}`,
          method: 'get',
          pagination: pagination
        }).then(res => {
          console.log(res)
          return res.result
        })
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleCreate () {
      console.log('Creating ... ')
      this.$router.push({
        name: 'MemberForm'
      })
    },
    handleChange (value, key, column, record) {
      console.log(value, key, column)
      record[column.dataIndex] = value
    },
    handleEdit (row) {
      row.editable = true
    },
    handleMultiDelete () {
      this.selectedRows.forEach(row => {
        this.$lf.request({
          url: `/${this.modelName}`,
          method: 'delete',
          data: row.id
        })
      })
    },
    // eslint-disable-next-line
    handleDelete (row) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${row.no} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log('OK')
          // 在这里调用删除接口
          this.$lf.request({
            url: `/${this.modelName}`,
            method: 'delete',
            data: row
          })
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    handleSave (row) {
      row.editable = false
    },
    handleCancel (row) {
      row.editable = false
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      console.log(this.selectedRowKeys)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>

<style lang="less" scoped>
  .search {
    margin-bottom: 54px;
  }

  .fold {
    width: calc(100% - 216px);
    display: inline-block
  }

  .operator {
    margin-bottom: 18px;
  }

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
