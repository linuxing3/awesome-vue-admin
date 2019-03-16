import { randomize, randomizeCircle } from '@/util'

export function getBarOption () {
  return {
    legend: {},
    tooltip: {},
    dataset: {
      // Provide data.
      source: [
        ['Product', '2015', '2016', '2017'],
        ['Matcha Latte', ...randomize()],
        ['Milk Tea', ...randomize()],
        ['Cheese Cocoa', ...randomize()],
        ['Walnut Brownie', ...randomize()]
      ]
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
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
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
