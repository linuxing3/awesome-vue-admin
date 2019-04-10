<template>
  <EventTable>
    <EventForm />
  </EventTable>
</template>

<script lang="js">
import EventTable from './EventTable.vue'
import EventForm from './EventForm.vue'

export default {
  components: {
    EventTable,
    EventForm
  }
}
</script>
