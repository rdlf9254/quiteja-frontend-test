<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          userData.id ? "Editar Usuário" : "Adicionar Novo Usuário"
        }}</span>
      </v-card-title>

      <v-card-text>
        <!-- Nome -->
        <v-text-field
          label="Nome"
          v-model="userData.firstName"
          outlined
          :rules="[rules.required]"
        ></v-text-field>

        <!-- Sobrenome -->
        <v-text-field
          label="Sobrenome"
          v-model="userData.lastName"
          outlined
          :rules="[rules.required]"
        ></v-text-field>

        <!-- Título -->
        <v-select
          label="Título"
          v-model="userData.title"
          outlined
          :items="titles"
          :rules="[rules.required]"
        ></v-select>

        <!-- URL da Imagem -->
        <v-text-field
          label="URL da Imagem"
          v-model="userData.picture"
          outlined
          :rules="[rules.required, rules.validUrl]"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          :disabled="!formValid"
          @click="saveUser"
        >
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
      titles: ["Mr.", "Mrs.", "Miss", "Dr.", "Prof."], // Opções para o select
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
        validUrl: (value) =>
          !value || /^(http|https):\/\/[^ "]+$/.test(value) || "URL inválida.",
      },
    };
  },
  computed: {
    formValid() {
      return (
        this.userData.firstName &&
        this.userData.lastName &&
        this.userData.title &&
        this.rules.validUrl(this.userData.picture) === true
      );
    },
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
      if (this.formValid) {
        if (this.userData.id) {
          this.$emit("update", this.userData);
        } else {
          this.$emit("save", this.userData);
        }
        this.closeModal();
      }
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
