---
title: "Vuex component"
---

# Vue call

## `components/user/UserTable.vue`

```js
<template>
  <v-card>

    <v-card-title>

      <v-flex>
        <v-btn
            icon
            @click="addItem"
            color="primary">
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
        <v-btn
            icon
            @click="exportItem"
            color="accent">
          <v-icon>fas fa-print</v-icon>
        </v-btn>
        <DocumentSelector :docFiles="templateDocs"/>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-flex>

    </v-card-title>

    <v-card-media>
      <v-data-table
          :headers="itemKeysFiltered"
          :items="itemFiltered"
          :search="search"
          class="elevation-1"
        >
        <template
            slot="items"
            slot-scope="props">
          <tr>
            <td
                @click="alert('Goto...')"
                class="text-xs-left"
                :key="header.text"
                :autocomplete="props.item[header.text]"
                v-for="header in itemKeysFiltered">
              {{ props.item[header.text] }}
            </td>
            <td class="justify-center layout px-0">
              <v-btn
                  icon
                  class="mx-0"
                  @click="editItem(props.item)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn
                  icon
                  class="mx-0"
                  @click="deleteItem(props.item)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>

    </v-card-media>

    <v-card-actions>

      <!-- dialoge -->
      <v-dialog
          v-model="dialog"
          width="80%">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <!-- User Input Form -->
            <UserInfo :editing="editing" />
          <!-- End Form -->
          </v-card-text>
        </v-card>
      </v-dialog>
    <!-- end dialog -->

    </v-card-actions>
  </v-card>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";

import { get, sync, call } from "vuex-pathify";

import * as types from "@/store/types";

import HelloWorld from "@/components/Shared/HelloWorld.vue";
import UserInfo from "@/components/User/UserInfo.vue";
import DatabaseSelector from "@/components/Database/DatabaseSelector.vue";
import DocumentSelector from "@/components/Database/DocumentSelector.vue";

import { defaultUser } from "@/api/models/BaseModel";

import { log, LimitedObjectKeysToArray, getFilesByExtentionInDir, GenerateCSV } from "@/util";

import { remote, shell } from "electron";
import path from "path";

@Component({
  components: { HelloWorld, UserInfo, DatabaseSelector, DocumentSelector },
  computed: {
    ...get("user/*"),
    search: sync("user/filter@search"),
    docPath: sync("database/export@docPath"),
  },
  methods: {
    ...call("user/*"),
  },
})
export default class UserTable extends Vue {
  // Props
  dialog = false;
  editing = false;
  formTitle = "人员信息";

  userTemplatePath = "";
  userDataPath = "";
  outputJsonFile = "";
  templateDocName = "";
  templateDocs = [];

  constructor() {
    super();
    this.dialog = false;
    this.editing = false;
  }

  created() {
    this.$on("INFO_CLOSE", () => {
      this.dialog = false;
      this.actionRead();
    });
    this.$on("SELECTOR_CHANGED", e => {
      console.log(e.target.value);
      this.$store.set("user/filter@search", e.target.value);
    });
    window.userApp = this;
  }

  createAttachment() {
    let locale;
    let filePath = path.join(this.userTemplatePath, "translation.json");
    const custom = this.$storage.loadSync(filePath) || {};
    if (custom["@use"]) locale = custom["@use"];
    console.log(locale);
  }

  mounted() {
    // Initialize the template path
    this.userTemplatePath = path.join(remote.app.getPath("home"), "/Documents/template");
    log.suc("Template Directory is: " + this.userTemplatePath);
    this.templateDocs = getFilesByExtentionInDir(this.userTemplatePath, "doc");
  }

  editItem(item) {
    this.editing = true;
    this.$store.set("user/currentItem", item);
    this.dialog = true;
  }

  addItem() {
    this.editing = false;
    this.$store.set("user/currentItem", defaultUser);
    this.dialog = true;
  }

  deleteItem(item) {
    this.actionDelete(item);
  }

  exportItem() {
    if (this.docPath === "") {
      alert("请选择使用的word模板");
      return;
    } else {
      let filePath = path.join(this.userTemplatePath, `${this.docPath}.doc`);
      log.info(filePath);
      // Export CSV
      GenerateCSV(this.itemFiltered, path.join(this.userTemplatePath, "/db.csv"));
      // open template file
      shell.showItemInFolder(filePath);
      shell.openItem(filePath);
    }
  }
}
</script>
```
