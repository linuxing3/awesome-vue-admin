<template>
  <div class="text-md-center">
    <h2 class="my-3 headline ">Home page</h2>
    <!-- menu item -->
    <div
        :key="model.entity"
        v-for="model in models">
      <a-button
          @click="() => $router.push({ path: `/${model.entity}` }) ">{{model.entity}}
      </a-button>
    </div>
  </div>
</template>

<script>
import models from '@/models'
export default {
  data () {
    return {
      models
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
