import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import keys from 'lodash/keys'

import Bar from '@/components/Charts/Bar'
import ChartCard from '@/components/Charts/ChartCard'
import Liquid from '@/components/Charts/Liquid'
import MiniArea from '@/components/Charts/MiniArea'
import MiniSmoothArea from '@/components/Charts/MiniSmoothArea'
import MiniBar from '@/components/Charts/MiniBar'
import MiniProgress from '@/components/Charts/MiniProgress'
import Radar from '@/components/Charts/Radar'
import RankList from '@/components/Charts/RankList'
import TransferBar from '@/components/Charts/TransferBar'
import TagCloud from '@/components/Charts/TagCloud'

import Trend from '@/components/Trend'
import STable from '@/components/Table'
import ExceptionPage from '@/components/Exception'
import StandardFormRow from '@/components/StandardFormRow'
import Result from '@/components/Result'
import IconSelector from '@/components/IconSelector'

/**
 * Global registerd components
 */
const requireComponent = require.context('@/components/helpers', true, /\.vue$/)

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
  TagCloud,
  Trend,
  CountDown,
  Ellipsis,
  NumberInfo,
  STable,
  Result,
  TagSelect,
  StandardFormRow
}
