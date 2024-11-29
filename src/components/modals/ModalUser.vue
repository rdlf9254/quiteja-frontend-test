<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          userData.id ? "Editar Usuário" : "Adicionar Novo Usuário"
        }}</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Nome"
          v-model="userData.firstName"
          outlined
        ></v-text-field>

        <v-text-field
          label="Sobrenome"
          v-model="userData.lastName"
          outlined
        ></v-text-field>

        <v-text-field
          label="Título"
          v-model="userData.title"
          outlined
        ></v-text-field>

        <v-text-field
          label="URL da Imagem"
          v-model="userData.picture"
          outlined
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="saveUser">
          {{ userData.id ? "Salvar Alterações" : "Salvar" }}
        </v-btn>
        <v-btn color="red darken-1" text @click="closeModal"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "modal-user",
  props: {
    show: { type: Boolean, required: true },
    user: { type: Object, default: () => null },
  },
  data() {
    return {
      dialog: this.show,
      userData: {
        id: "",
        firstName: "",
        lastName: "",
        title: "",
        picture: "",
      },
    };
  },
  watch: {
    show(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) this.closeModal();
    },
    user(val) {
      if (val) {
        this.userData = { ...val };
      } else {
        this.resetForm();
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    saveUser() {
      this.$emit("save", this.userData);
      this.closeModal();
    },
    resetForm() {
      this.userData = {
        id: "",
        firstName: "",
        lastName: "",
        title: "",
        picture: "",
      };
    },
  },
};
</script>

<style scoped></style>
