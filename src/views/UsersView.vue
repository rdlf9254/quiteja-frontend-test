<template>
  <v-container>
    <users-banner />

    <div v-if="true" class="loading-container">
      <v-card class="loading-card pa-8" elevation="4">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="80"
            :width="6"
          ></v-progress-circular>
          <h3 class="mt-6 mb-2 text-subtitle-1 font-weight-medium">
            Carregando usuários...
          </h3>
        </div>
      </v-card>
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

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-card {
  max-width: 400px;
  width: 100%;
}
</style>