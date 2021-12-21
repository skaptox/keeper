<template>
  <div class="about">
    <router-link to="/">Go back</router-link>

    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <h1 class="title is-size-5">
          {{ mode === "create" ? "Create" : "Update" }} Role
        </h1>
        <form @submit="onSubmit">
          <b-field label="Name">
            <b-input required v-model="name" maxlength="20"></b-input>
          </b-field>

          <b-field label="Type">
            <b-select placeholder="Select a subject" v-model="type">
              <option value="admin">Admin</option>
              <option value="job_admin">Job Admin</option>
            </b-select>
          </b-field>

          <b-field label="Description">
            <b-input
              required
              maxlength="200"
              v-model="description"
              type="textarea"
            ></b-input>
          </b-field>

          <b-field grouped>
            <b-field label="Editable">
              <b-switch type="is-black" v-model="editable"> </b-switch>
            </b-field>

            <b-field label="Active">
              <b-switch type="is-black" v-model="active"> </b-switch>
            </b-field>
          </b-field>
          <b-button
            type="is-primary"
            native-type="submit"
            value="Submit"
            :loading="loading"
          >
            {{ mode === "create" ? "Create" : "Update" }}
          </b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Get, Call } from "vuex-pathify";

import { Component, Vue } from "vue-property-decorator";
import Roles from "@/components/Roles.vue"; // @ is an alias to /src
import { Role } from "@/models";
import FilterRoles from "@/components/FilterRoles.vue";
import { mapGetters } from "vuex";

enum Type {
  Admin = "admin",
  JobAdmin = "job_admin",
}

enum Mode {
  Create = "create",
  Edit = "edit",
}

interface Data {
  mode: Mode;
  name: string;
  type: Type;
  description: string;
  editable: boolean;
  active: boolean;
  loading: boolean;
}

@Component({
  components: {
    Roles,
    FilterRoles,
  },

  computed: {
    ...mapGetters({ role: "getRole" }),
  },
  data(): Data {
    return {
      mode: Mode.Create,
      name: "",
      type: Type.Admin,
      description: "",
      editable: true,
      active: false,
      loading: false,
    };
  },
})
export default class Home extends Vue {
  loading!: boolean;
  originalRole: Role | null = null;

  mode!: Mode;
  name!: string;
  type!: string;
  description!: string;
  editable!: boolean;
  active!: boolean;

  @Get("roles/roles") roles!: Role[];
  @Call("roles/addRole") addRole!: (role: any) => void;
  @Call("roles/updateRole") updateRole!: (role: any) => void;

  onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!this.name || !this.description) {
      return alert("All fields are required");
    }

    this.loading = true;

    setTimeout(() => {
      if (this.mode === Mode.Create) {
        this.addRole({
          name: this.name,
          type: this.type,
          description: this.description,
          editable: this.editable,
          active: this.active,
        });
      } else {
        this.updateRole({
          id: parseInt(this.$route.params.id),
          name: this.name,
          type: this.type,
          description: this.description,
          editable: this.editable,
          active: this.active,
          ...this.originalRole,
        });
      }

      this.$router.push({ name: "Home" });
      this.loading = false;
    }, 500);
  }

  mounted() {
    const role = this.$store.getters["roles/getRole"](this.$route.params.id);

    if (role) {
      this.mode = Mode.Edit;
      this.name = role.name;
      this.type = role.type;
      this.description = role.description;
      this.editable = role.editable;
      this.active = role.active;
      this.originalRole = role;
    }
  }
}
</script>


