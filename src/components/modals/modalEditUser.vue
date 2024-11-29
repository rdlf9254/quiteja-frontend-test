<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Usuário</span>
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
          <v-btn color="green darken-1" text @click="saveUser"> Salvar </v-btn>
          <v-btn color="red darken-1" text @click="closeModal"> Cancelar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: "modal-edit-user",
    props: {
      show: { type: Boolean, required: true },
    },
    data() {
      return {
        dialog: this.show,
        userData: {
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
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      saveUser() {
        this.$emit("save", this.userData);
        this.closeModal();
      },
    },
  };
  </script>
  
  <style scoped></style>
  