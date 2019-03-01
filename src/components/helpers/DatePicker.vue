<template>
  <v-dialog
      ref="datedialog"
      v-model="modal"
      :return-value.sync="editedItem[field.value]"
      persistent
      lazy
      full-width
      width="290px"
    >
    <v-text-field
        slot="activator"
        v-model="editedItem[field.value]"
        :label="editedItem[field.text]"
        append-icon="event"
        readonly
      ></v-text-field>
    <v-date-picker
        v-model="editedItem[field.value]"
        scrollable>
      <v-spacer></v-spacer>
      <v-btn
          flat
          @click="modal = false">Cancel</v-btn>
      <v-btn
          flat
          color="primary"
          @click="$refs.datedialog.save(editedItem[field.value])">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: {}
    },
    editedItem: {
      type: Object,
      default: {}
    }
  },
  data: () => ({
    modal: false
  })
}
</script>
