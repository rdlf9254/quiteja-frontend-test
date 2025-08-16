<template>
  <v-container>
    <users-banner />

    <div v-if="isLoading" class="text-center">
      <v-progress-circular
        indeterminate
        color="primary"
        :size="70"
      ></v-progress-circular>
      <p class="mt-4">Carregando usuários...</p>
    </div>

    <v-alert v-else-if="error" type="error">
      {{ error }}
    </v-alert>

    <user-list v-else :users="allUsers"></user-list>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserList from '@/components/users/UsersList.vue';
import UsersBanner from '@/components/users/UsersBanner.vue';

export default {
  name: 'UsersView',
  components: {
    UserList,
    UsersBanner,
  },
  computed: {
    ...mapGetters('users', ['allUsers', 'isLoading', 'error']),
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
  },
  created() {
    this.fetchUsers();
  },
};
</script>