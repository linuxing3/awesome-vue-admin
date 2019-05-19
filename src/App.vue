<template>
  <AntdLayout>
    <router-view :key="$route.fullpath"></router-view>
  </AntdLayout>
</template>

<script>
import AntdLayout from '@/layout/antd'
export default {
  name: 'App',
  components: {
    AntdLayout
  }
}
</script>
