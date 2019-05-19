<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div
          class="logo" 
          @click="$router.push('/home')">
      </div>
      <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px' }"
        >
        <a-menu-item
            key="1"
            @click="$router.push('/home')">Home</a-menu-item>
        <a-menu-item
            key="2"
            @click="$router.push('/user-list')">User</a-menu-item>
        <a-menu-item
            key="3"
            @click="$router.push('/member-list')">Member</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Page</a-breadcrumb-item>
        <a-breadcrumb-item>Component</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <slot />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      <GlobalFooter />
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
