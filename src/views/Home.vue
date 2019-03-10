<template>
  <DefaultLayout>
    <ControlCenter>
    </ControlCenter>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue' // @ is an alias to /src
import ControlCenter from '@/components/Home/ControlCenter.vue' // @ is an alias to /src

export default {
  components: {
    DefaultLayout,
    ControlCenter
  }
}
</script>
