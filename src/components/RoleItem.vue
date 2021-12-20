<template>
  <div class="card">
    <div class="card-content">
      <p class="is-size-5 is-flex is-justify-content-space-between">
        <span>{{ role.name }}</span>
        <b-tag v-if="!role.active" type="is-danger">Inactive</b-tag>
      </p>
      <p class="is-size-6">{{ role.type }}</p>
      <div class="content">
        <span class="is-size-7 description-text">
          {{ role.description }}
        </span>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item is-size-7 is-justify-content-flex-start">
        Date Created: {{ parseDate(role.created_on) }}
      </p>

      <div class="card-footer-item is-justify-content-flex-end">
        <b-button v-if="!role.editable" type="is-primary" disabled>
          <b-icon icon="account-plus" size="is-small" />
        </b-button>

        <div v-else class="buttons">
          <b-button type="is-text">
            <router-link :to="{ name: 'Role', params: { id: role.id } }">
              Edit
            </router-link>
          </b-button>
          <b-button type="is-danger" outlined @click="onDeleteRole(role.id)">
            Delete
          </b-button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Role } from "@/models";
import { Call } from "vuex-pathify";

@Component({
  methods: {
    parseDate: function (date: string) {
      return new Date(date).toLocaleDateString().slice(0, 10);
    },
  },
})
export default class RoleItem extends Vue {
  @Call("roles/deleteRole") deleteRole!: (number: number) => void;

  @Prop() private role!: Role[];
  onDeleteRole(id: number) {
    this.deleteRole(id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  height: 270px;
}

.description-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
