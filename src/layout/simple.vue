<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <slot />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }" >
    </a-layout-footer>
  </a-layout>
</template>
<script>
import GlobalFooter from '@/components/GlobalFooter'
export default {
  components: {
    GlobalFooter
  }
}
</script>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
