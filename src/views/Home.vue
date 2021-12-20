<template>
  <div class="home">
    <div class="is-flex is-justify-content-space-between">
      <FilterRoles :search.sync="search" :status.sync="status" class="my-5" />
      <b-button>
        <router-link :to="{ name: 'Role' }">Create New Role</router-link>
      </b-button>
    </div>
    <Roles :roles="filteredRoles" />
  </div>
</template>

<script lang="ts">
import { Get, Call } from "vuex-pathify";

import { Component, Vue, Watch } from "vue-property-decorator";
import Roles from "@/components/Roles.vue"; // @ is an alias to /src
import { Role } from "@/models";
import FilterRoles from "@/components/FilterRoles.vue";

enum Status {
  ActiveAndInactive = 0,
  Active = 1,
  Inactive = 2,
}

@Component({
  components: {
    Roles,
    FilterRoles,
  },
  data() {
    return {
      status: 0,
      search: "",
      name: 0,
    };
  },
})
export default class Home extends Vue {
  status!: number;
  search!: string;

  @Get("roles/roles") roles!: Role[];
  @Call("roles/loadRoles") loadRoles!: () => void;

  mounted() {
    this.loadRoles();
  }

  get filteredRoles() {
    console.log(
      "hola",
      this.roles.map((e) => e.name)
    );
    return this.roles.filter((role) => {
      if (this.status === Status.ActiveAndInactive) {
        return role.name.toLowerCase().includes(this.search.toLowerCase());
      } else {
        return this.status === Status.Active
          ? role.active
          : !role.active &&
              role.name.toLowerCase().includes(this.search.toLowerCase());
      }
    });
  }
}
</script>
