import Vue from 'vue'
import ECharts from 'vue-echarts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/component/polar'

Vue.component('v-chart', ECharts)
