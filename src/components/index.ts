import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import keys from 'lodash/keys'

import Bar from '@/components/Charts/Bar.vue'
import ChartCard from '@/components/Charts/ChartCard.vue'
import Liquid from '@/components/Charts/Liquid.vue'
import MiniArea from '@/components/Charts/MiniArea.vue'
import MiniSmoothArea from '@/components/Charts/MiniSmoothArea.vue'
import MiniBar from '@/components/Charts/MiniBar.vue'
import MiniProgress from '@/components/Charts/MiniProgress.vue'
import Radar from '@/components/Charts/Radar.vue'
import RankList from '@/components/Charts/RankList.vue'
import TransferBar from '@/components/Charts/TransferBar.vue'

import Trend from '@/components/Trend'
import STable from '@/components/Table'
import ExceptionPage from '@/components/Exception'
import StandardFormRow from '@/components/StandardFormRow'
import Result from '@/components/Result'
import IconSelector from '@/components/IconSelector'

/**
 * Global registerd components
 */
const requireComponent = require.context('@/components/tools', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')))
  Vue.component(componentName, componentConfig.default || componentConfig)
  console.log('GlobalRegistered ' + componentName)
})

export {
  Bar,
  ChartCard,
  Liquid,
  MiniArea,
  MiniSmoothArea,
  MiniBar,
  MiniProgress,
  Radar,
  RankList,
  TransferBar,
  Trend,
  STable,
  Result,
  StandardFormRow
}
