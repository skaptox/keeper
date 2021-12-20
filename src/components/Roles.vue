<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="role in roles" :key="role.id">
        <RoleItem :role="role" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Role } from "@/models";

import RoleItem from "./RoleItem.vue";

@Component({
  components: {
    RoleItem,
  },
})
export default class Roles extends Vue {
  @Prop() private roles!: Role[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
