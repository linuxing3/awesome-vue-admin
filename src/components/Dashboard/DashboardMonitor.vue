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
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">财务开支</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="pie" />
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
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">资源消耗</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="pie" />
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
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">月度工作量</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="bar" />
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
            <div class="display-1 text-capitalize primary--text font-weight-bold mb-2">季度工作量</div>
            <v-divider class="my-2"></v-divider>
            <v-chart :options="bar" />
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import models from '@/models'
import { modelStatistic } from '@/util/statistic'

export default {
  data () {
    return {
      dataSet: {}
    }
  },
  mounted () {
    this.dataSet = modelStatistic({
      models,
      fieldsDefModel: 'projectType',
      fieldDef: 'title',
      queryModel: 'project',
      queryFieldName: 'type'
    })
    console.log(this.dataSet)
  },
  computed: {
    bar () {
      let source = []
      source.push(['Product', '2015'])
      Object.keys(this.dataSet).forEach(item => {
        source.push([item, this.dataSet[item]])
      })

      return {
        legend: {},
        tooltip: {},
        dataset: {
          source
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
    },
    pie () {
      let serieData = []
      let legendData = []
      Object.keys(this.dataSet).forEach(key => {
        serieData.push({ value: this.dataSet[key], name: key })
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
        series: [
          {
            name: '访问来源',
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
