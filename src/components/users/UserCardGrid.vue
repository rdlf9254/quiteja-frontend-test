<template>
    <v-row>
      <v-col
        v-for="user in users"
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
  };
  </script>