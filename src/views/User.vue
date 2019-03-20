<template>
  <DefaultLayout>
    <UserTable />
  </DefaultLayout>
</template>

<script lang="js">
import DefaultLayout from '@/layout/default.vue'
import UserTable from '@/components/User/UserTable.vue'

export default {
  components: {
    DefaultLayout,
    UserTable
  }
}
</script>
