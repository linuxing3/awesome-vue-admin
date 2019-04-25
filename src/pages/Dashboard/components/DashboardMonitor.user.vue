<template>
  <v-container>
    <v-layout
        justify-center
        row
        wrap
      >
      <v-flex
          sm12
          md12
        >
        <div class="display-1 font-weight-bold mb-2">人员情况统计</div>
      </v-flex>
      <v-flex
          sm4
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="caption text-capitalize primary--text font-weight-bold mb-2">性别统计</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="userGenderPie" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          sm4
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="caption text-capitalize primary--text font-weight-bold mb-2">级别统计</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="userRankPie" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          sm12
          md12
        >
        <UserTable />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
import models from '@/models'
import { modelStatistic } from '@/util/statistic'
import { genders, maritalStatus } from '@/api/gender'
import UserTable from '@/pages/User/components/UserTable.vue'

let User = models['user']
let Employee = models['employee']
let Department = models['department']

export default {
  components: {
    UserTable
  },
  data () {
    return {
      userDataSet: {},
      userGenderDataSet: {},
      employeeGenderDataSet: {},
      userDepartmentDataSet: {},
      departmentDataSet: {},
      pieChartConfig: {
        title: {
          text: '饼图程序',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: null
        },
        roseType: 'radius'
      }
    }
  },
  async mounted () {
    // 设置数据集
    await this.asyncFetch()
    await this.pullDataSet()
  },
  computed: {
    userTypes () {
      return DocumentType.uniqueValuesOfField('title')
    },
    departmentTypes () {
      return Department.uniqueValuesOfField('name')
    },
    employeeTypes () {
      return ProjectType.uniqueValuesOfField('maritalStatus')
    },
    DeparmentEmployeeBar () {
      return this.drawBarChart(this.departmentDataSet)
    },
    EmployeeGenderBar () {
      return this.drawBarChart(this.employeeGenderDataSet)
    },
    userGenderPie () {
      return this.drawUserByGenderPieChart(this.userGenderDataSet)
    },
    userRankPie () {
      return this.drawUserByRankPieChart(this.userRankDataSet)
    }
  },
  methods: {
    async asyncFetch () {
      console.log('Fetching data to charts...')
      await User.$fetch()
      await Employee.$fetch()
      await Department.$fetch()
    },
    async pullDataSet () {
      this.userGenderDataSet = modelStatistic({
        Model: User,
        queryFieldName: 'gender',
        fieldNameArray: ['male', 'female']
      })
      this.userRankDataSet = modelStatistic({
        Model: User,
        queryFieldName: 'positionAndRank',
        fieldNameArray: ['Directorial', 'Secretary']
      })
    },
    drawUserByGenderPieChart (dataSet) {
      let serieData = []
      let legendData = []
      Object.keys(dataSet).forEach(key => {
        serieData.push({ value: dataSet[key], name: key })
        legendData.push(key)
      })

      return {
        ...this.pieChartConfig,
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legendData
        },
        series: [
          {
            name: '数据源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: serieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    drawUserByRankPieChart (dataSet) {
      let serieData = []
      let legendData = []
      Object.keys(dataSet).forEach(key => {
        serieData.push({ value: dataSet[key], name: key })
        legendData.push(key)
      })

      return {
        ...this.pieChartConfig,
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legendData
        },
        series: [
          {
            name: '数据源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: serieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    drawBarChart (dataSet) {
      let series = [{ type: 'bar' }]
      let source = []
      Object.keys(dataSet).forEach(item => {
        source.push([item, dataSet[item]])
      })

      return {
        dataset: {
          source
        },
        xAxis: { type: 'category' },
        series
      }
    }
  }
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
