<template>
  <DefaultLayout>
    <Calendar>
    </Calendar>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import Calendar from './components/Index.vue' // @ is an alias to /src

export default {
  components: {
    DefaultLayout,
    Calendar
  }
}
</script>
