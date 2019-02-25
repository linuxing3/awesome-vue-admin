<template>
  <v-layout
      class="align-items-center pa-3"
      row
      wrap>
    <v-flex
        sm12
        lg3
        class="pa-3 mb-3 feature-pane"
      >
      <v-btn
          fab
          small
          absolute
          left
          color="primary"
          @click="$refs.calendar.prev()"
        >
        <v-icon dark>
          keyboard_arrow_left
        </v-icon>
      </v-btn>
      <v-btn
          fab
          small
          absolute
          right
          color="primary"
          @click="$refs.calendar.next()"
        >
        <v-icon
            dark
          >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
      <br><br><br>
      <v-select
          v-model="type"
          :items="typeOptions"
          label="日历类型"
        ></v-select>
      <v-checkbox
          v-model="dark"
          label="深色"
        ></v-checkbox>
      <v-select
          v-model="color"
          :items="colorOptions"
          label="颜色"
        ></v-select>
      <v-menu
          ref="startMenu"
          v-model="startMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="start"
          transition="scale-transition"
          min-width="290px"
          lazy
          offset-y
          full-width
        >
        <v-text-field
            slot="activator"
            v-model="start"
            label="开始日期"
            prepend-icon="event"
            readonly
          ></v-text-field>
        <v-date-picker
            v-model="start"
            no-title
            scrollable
          >
          <v-spacer></v-spacer>
          <v-btn
              flat
              color="primary"
              @click="startMenu = false"
            >
            Cancel
          </v-btn>
          <v-btn
              flat
              color="primary"
              @click="$refs.startMenu.save(start)"
            >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
          v-if="hasEnd"
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="end"
          transition="scale-transition"
          min-width="290px"
          lazy
          offset-y
          full-width
        >
        <v-text-field
            slot="activator"
            v-model="end"
            label="截止日期"
            prepend-icon="event"
            readonly
          ></v-text-field>
        <v-date-picker
            v-model="end"
            no-title
            scrollable
          >
          <v-spacer></v-spacer>
          <v-btn
              flat
              color="primary"
              @click="endMenu = false"
            >
            Cancel
          </v-btn>
          <v-btn
              flat
              color="primary"
              @click="$refs.endMenu.save(end)"
            >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
          ref="nowMenu"
          v-model="nowMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="now"
          transition="scale-transition"
          min-width="290px"
          lazy
          offset-y
          full-width
        >
        <v-text-field
            slot="activator"
            v-model="now"
            label="今天"
            prepend-icon="event"
            readonly
          ></v-text-field>
        <v-date-picker
            v-model="now"
            no-title
            scrollable
          >
          <v-spacer></v-spacer>
          <v-btn
              flat
              color="primary"
              @click="nowMenu = false"
            >
            Cancel
          </v-btn>
          <v-btn
              flat
              color="primary"
              @click="$refs.nowMenu.save(now)"
            >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-select
          v-model="weekdays"
          :items="weekdaysOptions"
          label="周末开始节点"
        ></v-select>
      <v-text-field
          v-if="type === 'custom-weekly'"
          v-model="minWeeks"
          label="Minimum Weeks"
          type="number"
        ></v-text-field>
      <v-select
          v-if="hasIntervals"
          v-model="intervals"
          :items="intervalsOptions"
          label="Intervals"
        ></v-select>
      <v-select
          v-if="type === 'custom-daily'"
          v-model="maxDays"
          :items="maxDaysOptions"
          label="# of Days"
        ></v-select>
      <v-select
          v-if="hasIntervals"
          v-model="styleInterval"
          :items="styleIntervalOptions"
          label="Styling"
        ></v-select>
    </v-flex>
    <v-flex
        sm12
        lg9
        class="pl-3"
      >
      <v-sheet height="500">
        <v-calendar
            ref="calendar"
            v-model="start"
            :type="type"
            :start="start"
            :end="end"
            :min-weeks="minWeeks"
            :max-days="maxDays"
            :now="now"
            :dark="dark"
            :weekdays="weekdays"
            :first-interval="intervals.first"
            :interval-minutes="intervals.minutes"
            :interval-count="intervals.count"
            :interval-height="intervals.height"
            :interval-style="intervalStyle"
            :show-interval-label="showIntervalLabel"
            :color="color"
          >
          <!-- 日期插槽 -->
          <template
              slot="day"
              slot-scope="{ date, day }"
            >
            <div>
              <template v-for="event in eventsMap[date]">
                <!-- timed events -->
                <div
                    :class='day'
                    :key="event.title"
                  ><router-link to="/activity">{{event.title}}</router-link></div>
              </template>
            </div>
          </template>
          <!-- 头插槽 -->
          <template
              slot="day-header"
              slot-scope="{ date }"
            >
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                  v-if="!event.time"
                  :key="event.title"
                  class="my-event"
                  @click="open(event)"
                ><router-link to="'/activity">{{event.title}}</router-link></div>
            </template>
          </template>
          <!-- 体插槽 -->
          <template
              slot="day-body"
              slot-scope="{ date, timeToY, minutesToPixels }"
            >
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                  v-if="event.time"
                  :key="event.title"
                  :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                  class="my-event with-time"
                  @click="editActivity(event)"
                >
                {{event.title}}
              </div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import crudMixin from '@/mixins/crudMixin'
import exportMixin from '@/mixins/exportMixin'

const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

const intervalsDefault = {
  first: 0,
  minutes: 60,
  count: 24,
  height: 40
}

const stylings = {
  default (interval) {
    return undefined
  },
  workday (interval) {
    const inactive = interval.weekday === 0 ||
        interval.weekday === 6 ||
        interval.hour < 9 ||
        interval.hour >= 17
    const startOfHour = interval.minute === 0
    const dark = this.dark
    const mid = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

    return {
      backgroundColor: inactive ? (dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)') : undefined,
      borderTop: startOfHour ? undefined : '1px dashed ' + mid
    }
  },
  past (interval) {
    return {
      backgroundColor: interval.past ? (this.dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)') : undefined
    }
  }
}

export default {
  mixins: [crudMixin, exportMixin],
  data: () => ({
    modelName: 'activity',
    dark: false,
    startMenu: false,
    start: '2019-02-18',
    endMenu: false,
    end: '2019-02-25',
    nowMenu: false,
    minWeeks: 1,
    now: null,
    type: 'month',
    typeOptions: [
      { text: '天', value: 'day' },
      { text: '4天', value: '4day' },
      { text: '周', value: 'week' },
      { text: '月', value: 'month' },
      { text: '每日定制', value: 'custom-daily' },
      { text: '每周定制', value: 'custom-weekly' }
    ],
    weekdays: weekdaysDefault,
    weekdaysOptions: [
      { text: '周日开始一周', value: weekdaysDefault },
      { text: '周一、三、五', value: [1, 3, 5] },
      { text: '工作日', value: [1, 2, 3, 4, 5] },
      { text: '全周', value: [1, 2, 3, 4, 5, 6, 0] }
    ],
    intervals: intervalsDefault,
    intervalsOptions: [
      { text: '默认', value: intervalsDefault },
      { text: '工作日', value: { first: 16, minutes: 30, count: 20, height: 40 } }
    ],
    maxDays: 7,
    maxDaysOptions: [
      { text: '7天', value: 7 },
      { text: '5天', value: 5 },
      { text: '4天', value: 4 },
      { text: '3天', value: 3 }
    ],
    styleInterval: 'default',
    styleIntervalOptions: [
      { text: '默认', value: 'default' },
      { text: '工作日', value: 'workday' },
      { text: '过去', value: 'past' }
    ],
    color: 'primary',
    colorOptions: [
      { text: '主色', value: 'primary' },
      { text: '次色', value: 'secondary' },
      { text: '强调', value: 'accent' },
      { text: '红色', value: 'red' },
      { text: '粉色', value: 'pink' },
      { text: '紫色', value: 'purple' },
      { text: '深紫', value: 'deep-purple' },
      { text: '靛蓝', value: 'indigo' },
      { text: '蓝色', value: 'blue' },
      { text: '浅蓝', value: 'light-blue' },
      { text: '褐色', value: 'cyan' },
      { text: '铁色', value: 'teal' },
      { text: '绿色', value: 'green' },
      { text: '淡绿', value: 'light-green' },
      { text: '柠檬', value: 'lime' },
      { text: '黄色', value: 'yellow' },
      { text: '安柏', value: 'amber' },
      { text: '橘色', value: 'orange' },
      { text: '深橘', value: 'deep-orange' },
      { text: '棕色', value: 'brown' },
      { text: '绿灰', value: 'blue-gray' },
      { text: '灰色', value: 'gray' },
      { text: '黑色', value: 'black' }
    ]
  }),
  computed: {
    events () {
      return this.items
    },
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach(event => (map[event.date] = map[event.date] || []).push(event))
      return map
    },
    intervalStyle () {
      return stylings[ this.styleInterval ].bind(this)
    },
    hasIntervals () {
      return this.type in {
        'week': 1, 'day': 1, '4day': 1, 'custom-daily': 1
      }
    },
    hasEnd () {
      return this.type in {
        'custom-weekly': 1, 'custom-daily': 1
      }
    }
  },
  methods: {
    showIntervalLabel (interval) {
      return interval.minute === 0
    },
    editActivity (event) {
      this.model = event
      this.$router.push(this.editRoute)
    }
  }
}
</script>

<style lang="stylus" scoped>

  .feature-pane {
    position: relative;
    padding-top: 30px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }

  .day-header {
    margin: 0px 2px 2px 2px;
    padding: 2px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day-body {
    position: absolute;
    top: 400px;
    height: 36px;
    margin: 2px;
    padding: 2px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    left: 0;
    right: 0;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .day {
    position: relative;
    height: 24px;
    margin: 0px;
    padding: 0px 6px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    border-radius: 2px;
    left: 0;
    right: 0;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;

    &.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
  }
</style>
