<template>
  <v-row>
    <v-col
      v-for="user in processedUsers"
      :key="user.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <user-card
        :user="user"
        @edit="$emit('edit', user)"
        @delete="$emit('delete', user)"
      ></user-card>
    </v-col>
  </v-row>
</template>

<script>
import UserCard from './UserCard.vue';

export default {
  name: 'UserCardGrid',
  components: {
    UserCard,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  computed: {
    processedUsers() {
      return this.users.map(user => ({
        ...user,
        fullName: `${user.title ? user.title.charAt(0).toUpperCase() + user.title.slice(1) + '. ' : ''}${user.firstName} ${user.lastName}`,
        displayName: `${user.title ? user.title.charAt(0).toUpperCase() + user.title.slice(1) + '. ' : ''}${user.firstName} ${user.lastName}`,
      }));
    },
  },
};
</script>