<template>
  <v-card class="d-flex flex-column" height="100%" elevation="3" hover>
    <v-card-title class="d-flex flex-column align-center pa-4">
      <v-avatar size="80" class="mb-3" color="primary">
        <v-img 
          v-if="user.picture" 
          :src="user.picture" 
          :alt="user.firstName"
        />
        <v-icon v-else large color="white">
          mdi-account
        </v-icon>
      </v-avatar>
      <div class="text-center">
        <div class="text-h6 font-weight-bold">
          {{ user.firstName }} {{ user.lastName }}
        </div>
        <div class="text-subtitle-2 text--secondary">
          {{ user.email }}
        </div>
      </div>
    </v-card-title>

    <v-spacer></v-spacer>

    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn 
        icon 
        color="primary" 
        @click="$emit('edit', user)"
        class="mr-2"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn 
        icon 
        color="error" 
        @click="$emit('delete', user)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
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