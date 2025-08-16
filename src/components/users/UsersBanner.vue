<template>
  <v-card>
    <v-card-title class="pa-6">
      <div class="banner-content">
        <div class="d-flex align-center mb-3 mb-md-0">
          <img
            :src="usersImage"
            alt="Users"
            class="mr-4"
            width="40"
            height="40"
          />
          <h1 class="title text-h4 font-weight-bold">Usuários</h1>
        </div>

        <v-divider
          vertical
          class="mx-4"
        ></v-divider>

        <div class="d-flex flex-row justify-space-between align-center">
          <div class="flex-grow-1 text-center text-md-left">
            <p class="subtitle text-subtitle-1 mb-0">
              Bem vindo ao sistema de gerenciamento de usuários! Aqui você pode gerenciar os usuários do seu sistema, é
              possivel visualizar em lista ou em cards, editar e excluir usuários.
            </p>
          </div>

          <v-btn
            icon
            @click="toggleTheme"
            class="ml-4"
          >
            <v-icon>
              {{ $vuetify.theme.dark ? "mdi-weather-sunny" : "mdi-weather-night" }}
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import usersImage from "@/assets/users.svg";

export default {
  name: "UsersBanner",
  data() {
    return {
      usersImage,
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style scoped>
.banner-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.title {
  white-space: nowrap;
}
.subtitle {
  word-break: normal;
}
@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
  }
}
</style>
