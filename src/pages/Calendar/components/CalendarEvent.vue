<template>
  <v-layout class="ma-3">
    <v-flex>
      <v-sheet height="600">
        <v-calendar
            :now="today"
            :value="today"
            color="primary"
          >
          <v-layout
              slot="day"
              slot-scope="{ present, past, date }"
              fill-height
            >
            <template v-if="past && tracked[date]">
              <v-sheet
                  v-for="(percent, i) in tracked[date]"
                  :key="i"
                  :title="category[i]"
                  :color="colors[i]"
                  :width="`${percent}%`"
                  height="100%"
                  tile
                ></v-sheet>
            </template>
          </v-layout>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    today: '2019-02-23',
    tracked: {
      '2019-02-19': [23, 45, 10],
      '2019-02-18': [10],
      '2019-02-17': [0, 78, 5],
      '2019-02-16': [0, 0, 50],
      '2019-02-25': [0, 10, 23],
      '2019-02-24': [2, 90],
      '2019-02-23': [10, 32],
      '2019-02-22': [80, 10, 10],
      '2019-02-21': [20, 25, 10]
    },
    colors: ['#1867c0', '#fb8c00', '#000000'],
    category: ['Development', 'Meetings', 'Slacking']
  })
}
</script>
