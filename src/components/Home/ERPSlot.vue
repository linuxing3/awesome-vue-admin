<template>
  <div id="erpslot">
    <template #erp="{ models }">
      <v-card
          :key="model"
          v-for="model in models">
        <v-card-text
            class="grey lighten-3">
          <v-avatar
              size="64">
            <v-btn
                @click="crud(model)"
                icon>
              <v-icon>{{model.meta.icon || 'star'}}</v-icon>
            </v-btn>
          </v-avatar>
          <h2>{{ $t(model.entity) }}</h2>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
}
</script>
