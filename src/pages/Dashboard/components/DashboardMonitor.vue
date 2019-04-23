<template>
  <v-container>
    <v-layout
        justify-center
        row
        wrap
      >
      <v-flex
          sm4
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="caption text-capitalize primary--text font-weight-bold mb-2">文种统计</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="documentTypePie" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          sm4
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="caption text-capitalize primary--text font-weight-bold mb-2">部门统计</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="documentDepartmentPie" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          sm4
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="caption text-capitalize primary--text font-weight-bold mb-2">年度统计</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="documentYearPie" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
import models from '@/models'
import { modelStatistic } from '@/util/statistic'
import { genders, maritalStatus } from '@/api/gender'

let Document = models['document']
let DocumentType = models['documentType']
let Project = models['project']
let ProjectType = models['projectType']
let Employee = models['employee']
let Department = models['department']

export default {
  data () {
    return {
      projectDataSet: {},
      documentTypeDataSet: {},
      documentDepartmentDataSet: {},
      departmentDataSet: {},
      employeeGenderDataSet: {},
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
    documentTypes () {
      return DocumentType.uniqueValuesOfField('title')
    },
    departmentTypes () {
      return Department.uniqueValuesOfField('name')
    },
    projectTypes () {
      return ProjectType.uniqueValuesOfField('title')
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
    projectPie () {
      return this.drawPieChart(this.projectDataSet)
    },
    documentYearPie () {
      return this.drawDocumentByYearPieChart(this.documentYearDataSet)
    },
    documentTypePie () {
      return this.drawDocumentByTypePieChart(this.documentTypeDataSet)
    },
    documentDepartmentPie () {
      return this.drawDocumentByDepartmentPieChart(this.documentDepartmentDataSet)
    }
  },
  methods: {
    async asyncFetch () {
      console.log('Fetching data to charts...')
      await Document.$fetch()
      await DocumentType.$fetch()
      await Project.$fetch()
      await ProjectType.$fetch()
      await Employee.$fetch()
      await Department.$fetch()
    },
    async pullDataSet () {
      this.documentTypeDataSet = modelStatistic({
        Model: Document,
        queryFieldName: 'category',
        fieldNameArray: this.documentTypes
      })
      this.documentDepartmentDataSet = modelStatistic({
        Model: Document,
        queryFieldName: 'department',
        fieldNameArray: this.departmentTypes
      })
      this.documentYearDataSet = modelStatistic({
        Model: Document,
        queryFieldName: 'year',
        fieldNameArray: ['2019', '2020', '2021']
      })
      this.projectDataSet = modelStatistic({
        Model: Project,
        queryFieldName: 'type',
        fieldNameArray: this.projectTypes
      })
      this.departmentDataSet = modelStatistic({
        Model: Employee,
        queryFieldName: 'department',
        fieldNameArray: this.departmentTypes
      })
      this.employeeGenderDataSet = modelStatistic({
        Model: Employee,
        queryFieldName: 'gender',
        fieldNameArray: Object.keys(genders)
      })
    },
    drawDocumentByTypePieChart (dataSet) {
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
    drawDocumentByDepartmentPieChart (dataSet) {
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
    drawDocumentByYearPieChart (dataSet) {
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
