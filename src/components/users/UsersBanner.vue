<template>
  <v-card>
    <v-card-title>
      <div class="flex row align-center gap-5">
        <img
          :src="usersImage"
          alt="Users"
          class="mr-5"
        />
        <h1 class="text-h4 font-weight-bold mr-5">Usuários</h1>
        <v-divider vertical class="mr-5"></v-divider>
        <p>
          <!-- <strong>Total de usuários:</strong> {{ users.length }} -->
        </p>
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
