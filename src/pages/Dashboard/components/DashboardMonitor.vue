<template>
  <v-container
      fluid
      grid-list-xl
    >
    <v-layout
        row
        wrap
      >
      <v-flex
          xs12
          md6
          sm6
          lg6
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">项目开支</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="projectPie" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          xs12
          md6
          sm6
          lg6
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">文书种类</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="documentPie" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          xs12
          md6
          sm6
          lg6
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">部门雇员统计</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="DeparmentEmployeeBar" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex
          xs12
          md6
          sm6
          lg6
        >
        <v-card>
          <v-card-text
              class="pt-3">
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">加班统计</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="EmployeeGenderBar" />
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
      documentDataSet: {},
      departmentDataSet: {},
      employeeGenderDataSet: {}
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
    projectTypes () {
      return ProjectType.uniqueValuesOfField('title')
    },
    departmentTypes () {
      return ProjectType.uniqueValuesOfField('department')
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
    documentPie () {
      return this.drawPieChart(this.documentDataSet)
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
      this.projectDataSet = modelStatistic({
        Model: Project,
        fieldNameArray: this.projectTypes,
        queryFieldName: 'type'
      })
      this.documentDataSet = modelStatistic({
        Model: Document,
        fieldNameArray: this.documentTypes,
        queryFieldName: 'category'
      })
      this.departmentDataSet = modelStatistic({
        Model: Employee,
        fieldNameArray: this.departmentTypes,
        queryFieldName: 'department'
      })
      this.employeeGenderDataSet = modelStatistic({
        Model: Employee,
        fieldNameArray: Object.keys(genders),
        queryFieldName: 'gender'
      })
    },
    drawPieChart (dataSet) {
      let serieData = []
      let legendData = []
      Object.keys(dataSet).forEach(key => {
        serieData.push({ value: dataSet[key], name: key })
        legendData.push(key)
      })

      return {
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
          data: legendData
        },
        roseType: 'radius',
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
