<template>
  <v-snackbar
    :timeout="3000"
    bottom
    right
    :color="snackbar.color"
    v-model="snackbar.show"
    >
    {{ snackbar.text }}
    <slot></slot>
    <v-btn
        dark
        flat
        @click.native="snackbar.show = false"
        icon>
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>

export default {
  props: {
    snackbar: {
      type: Object,
      default: {
        color: '',
        show: false,
        text: ''
      }
    }
  }
}
</script>