import { randomize, randomizeCircle } from '@/util'
import { modelStatistic } from '@/util/statistic'

import models from '@/models'
const Project = models['project']
const ProjectType = models['projectType']

const projectTypes = (ProjectType as any).uniqueValuesOfField('title')

export function getBarOption () {
  let dataSet = modelStatistic({
    Model: Project,
    fieldNameArray: projectTypes,
    queryFieldName: 'title'
  })
  let source = []
  source.push(['Product', '2015'])
  Object.keys(dataSet).forEach(item => {
    source.push([item, dataSet[item]])
  })

  return {
    legend: {},
    tooltip: {},
    dataset: {
      // Provide data.
      source
    },
    // Declare X axis, which is a category axis, mapping
    // to the first column by default.
    xAxis: { type: 'category' },
    // Declare Y axis, which is a value axis.
    yAxis: {},
    // Declare several series, each of them mapped to a
    // column of the dataset by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  }
}

export function getPolarOption () {
  let data = randomizeCircle()
  return {
    title: {
      text: 'polar'
    },
    legend: {
      data: ['line']
    },
    polar: {
      center: ['50%', '54%']
    },
    angleAxis: {
      type: 'value',
      startAngle: 0
    },
    radiusAxis: {
      min: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    series: {
      coordinateSystem: 'polar',
      name: 'line',
      type: 'line',
      showSymbol: true,
      data
    }
  }
}

export function getPieOption () {
  let value1 = Project.query().where('type', '规章制度').get().length
  let value2 = Project.query().where('type', '工程').get().length

  return {
    title: {
      text: '饼图程序调用高亮示例',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [{ value: value1, name: '规章制度' }, { value: value2, name: '工程' }],
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
