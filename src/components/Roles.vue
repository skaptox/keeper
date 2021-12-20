<template>
  <div>
    <div v-for="role in roles" :key="role.id">{{ role.name }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Role } from "@/models";

@Component
export default class Roles extends Vue {
  @Prop() private roles!: Role[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
