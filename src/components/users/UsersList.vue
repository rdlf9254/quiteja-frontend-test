<template>
    <v-card>
      <v-card-title>
        Usuários Cadastrados
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="10"
        class="elevation-1"
      >
        <template slot="item.picture" slot-scope="{ item }">
          <v-avatar size="36px" class="my-2">
            <img :src="item.picture" :alt="item.firstName">
          </v-avatar>
        </template>
  
        <template slot="item.fullName" slot-scope="{ item }">
          {{ item.title | capitalize }}. {{ item.firstName }} {{ item.lastName }}
        </template>
  
         <template slot="item.actions">
          <v-icon small class="mr-2">
            mdi-pencil
          </v-icon>
          <v-icon small>
            mdi-delete
          </v-icon>
        </template>
  
      </v-data-table>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'UserList',
    props: {
      users: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        headers: [
          { text: 'Foto', value: 'picture', sortable: false },
          { text: 'Nome Completo', value: 'fullName' },
          { text: 'Email', value: 'email' },
          { text: 'Ações', value: 'actions', sortable: false },
        ],
      };
    },
    filters: {
      capitalize(value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  };
  </script>