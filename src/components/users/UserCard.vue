<template>
    <v-card class="d-flex flex-column" height="100%">
      <v-card-title class="d-flex align-center">
        <v-avatar size="40" class="mr-3">
          <img :src="user.picture" :alt="user.firstName" />
        </v-avatar>
        <span>{{ user.firstName }} {{ user.lastName }}</span>
      </v-card-title>
      
      <v-card-subtitle>{{ user.email }}</v-card-subtitle>
  
      <v-spacer></v-spacer>
  
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="$emit('edit', user)">Editar</v-btn>
        <v-btn text color="error" @click="$emit('delete', user)">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'UserCard',
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  };
  </script>