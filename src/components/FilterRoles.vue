<template>
  <section>
    <b-field grouped>
      <b-field>
        <b-input
          v-model="syncedSearch"
          placeholder="Search..."
          type="search"
          icon-right="magnify"
        >
        </b-input>
      </b-field>

      <b-field>
        <b-select placeholder="Select a subject" v-model="syncedStatus">
          <option :value="0">Active and Inactive</option>
          <option :value="1">Active</option>
          <option :value="2">Inactive</option>
        </b-select>
      </b-field>
    </b-field>
  </section>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from "vue-property-decorator";

@Component
export default class FilterRoles extends Vue {
  @PropSync("search", { type: String }) syncedSearch!: string;
  @PropSync("status", { type: Number }) syncedStatus!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
