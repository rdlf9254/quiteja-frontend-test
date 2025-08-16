<template>
  <v-card>
    <v-card-title>
      <div class="flex row align-center">
        <img
          :src="usersImage"
          alt="Users"
          class="mr-5"
        />
        <h1 class="text-h4 font-weight-bold mr-5 text-nowrap">Usuários</h1>
        <v-divider vertical class="mr-5"></v-divider>
        <span class="text-subtitle-2">
          Bem vindo ao sistema de gerenciamento de usuários! Aqui você pode gerenciar os usuários do seu sistema, é possivel visualizar em lista ou em cards, editar e excluir usuários.
          <!-- <strong>Total de usuários:</strong> {{ users.length }} -->
        </span>
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
};
</script>
