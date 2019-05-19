<template>
  <div class="text-md-center">
    <h2 class="my-3 headline ">Home page</h2>
    <div>
      <a-button
          type="primary"
          @click="Member">Member
      </a-button>
    </div>
    <!-- more menu item -->
    <!-- user -->
    <div>
      <a-button
          type="primary"
          @click="() => $router.push({ path: '/user-list' }) ">User
      </a-button>
    </div>
  </div>
</template>

<script>
import AntdLayout from '@/layout/antd'
import CrudMixin from '@/mixins/crudMixin.request'
export default {
  components: {
    AntdLayout
  },
  mixins: [ CrudMixin ],
  methods: {
    Member () {
      this.$router.push({ path: '/member-list' })
    }
  }
}
</script>
<style scoped lang="css">
  h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
  }
</style>
