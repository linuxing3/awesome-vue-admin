<template>
  <v-layout class="ma-3">
    <v-flex>
      <v-sheet height="600">
        <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
        <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            color="primary"
            type="week"
          >
          <!-- the events at the top (all-day) -->
          <template
              slot="dayHeader"
              slot-scope="{ date }"
            >
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                  v-if="!event.startTime"
                  :key="event.title"
                  class="my-event"
                  @click="open(event)"
                  v-html="event.title"
                ></div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template
              slot="dayBody"
              slot-scope="{ date, timeToY, minutesToPixels }"
            >
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                  v-if="event.startTime"
                  :key="event.title"
                  :style="{ top: timeToY(event.startTime) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                  class="my-event with-time"
                  @click="open(event)"
                  v-html="event.title"
                ></div>
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

export default {
  mixins: [crudMixin, exportMixin],
  data: () => ({
    modelName: 'activity',
    today: '2019-02-23'
  }),
  computed: {
    events () {
      return this.items
    },
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.occurenceDate] = map[e.date] || []).push(e))
      return map
    }
  },
  mounted () {
    this.$refs.calendar.scrollToTime('08:00')
  },
  methods: {
    open (event) {
      alert(event.title)
    }
  }
}
</script>

<style lang="stylus" scoped>
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
