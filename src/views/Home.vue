<template>
  <div class="home">
    <Roles :roles="roles" />
  </div>
</template>

<script lang="ts">
import { Get, Call } from "vuex-pathify";

import { Component, Vue } from "vue-property-decorator";
import Roles from "@/components/Roles.vue"; // @ is an alias to /src
import { Role } from "@/models";

@Component({
  components: {
    Roles,
  },
})
export default class Home extends Vue {
  @Get("roles/roles") roles!: Role[];
  @Call("roles/loadRoles") loadRoles!: () => void;

  mounted() {
    this.loadRoles();
  }
}
</script>
