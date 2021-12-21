<template>
  <div class="is-flex my-5">
    <div v-for="user in users.slice(0, 6)" :key="user.id" class="mr-3">
      <img :src="user.photo_url" class="avatar" />
    </div>
  </div>
</template>

<script lang="ts">
import { User } from "@/models";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class UserList extends Vue {
  @Prop({ default: [] }) private users!: User[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$size: 35px;
.avatar {
  vertical-align: middle;
  width: $size;
  height: $size;
  border-radius: 50%;
}
</style>
