<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{
          userId ? "Editar Usuário" : "Adicionar Novo Usuário"
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
          item-text="label"
          item-value="value"
        ></v-select>

        <!-- URL da Imagem -->
        <v-text-field
          label="URL da Imagem"
          v-model="userData.picture"
          outlined
        ></v-text-field>

        <!-- Gênero -->
        <v-select
          label="Gênero"
          v-model="userData.gender"
          outlined
          :items="gender"
          item-text="label"
          item-value="value"
        ></v-select>

        <!-- Email -->
        <v-text-field
          label="Email"
          v-model="userData.email"
          outlined
          :rules="[rules.required]"
          :disabled="userId ? true : false"
        ></v-text-field>

        <!-- Data de Nascimento -->
        <span>Data de nascimento:</span>
        <v-date-picker
          v-model="userData.dateOfBirth"
          class="mt-4"
          :max="today"
          full-width
        ></v-date-picker>

        <!-- Telefone -->
        <v-text-field
          label="Telefone"
          v-model="userData.phone"
          outlined
          :rules="[rules.required]"
        ></v-text-field>

        <!-- Endereço -->
        <v-text-field
          label="Rua"
          v-model="userData.location.street"
          outlined
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          label="Cidade"
          v-model="userData.location.city"
          outlined
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          label="Estado"
          v-model="userData.location.state"
          outlined
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          label="País"
          v-model="userData.location.country"
          outlined
          :rules="[rules.required]"
        ></v-text-field>

        <v-select
          label="Fuso Horário"
          v-model="userData.location.timezone"
          outlined
          :items="timezones"
          item-text="label"
          item-value="value"
          :rules="[rules.required]"
        ></v-select>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          :disabled="!formValid"
          @click="saveUser"
        >
          {{ userId ? "Salvar Alterações" : "Salvar" }}
        </v-btn>
        <v-btn color="red darken-1" text @click="closeModal"> Cancelar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getUserById } from "@/services/user.js";
import timezones from "@/assets/timezones.json";

export default {
  name: "modal-user",
  props: ["show", "userId"],
  data() {
    return {
      dialog: this.show,
      menu: false,
      today: new Date().toISOString().split("T")[0],
      loading: false,
      userData: {
        id: "",
        title: "",
        firstName: "",
        lastName: "",
        picture: "",
        gender: "",
        email: "",
        dateOfBirth: new Date().toISOString().split("T")[0],
        phone: "",
        location: {
          street: "",
          city: "",
          state: "",
          country: "",
          timezone: "",
        },
        registerDate: "",
        updatedDate: "",
      },
      titles: [
        { label: "Mr.", value: "mr" },
        { label: "Ms.", value: "ms" },
        { label: "Mrs.", value: "mrs" },
        { label: "Miss.", value: "miss" },
        { label: "Dr.", value: "dr" },
      ],
      gender: [
        { label: "Masculino", value: "male" },
        { label: "Feminino", value: "female" },
        { label: "Outro", value: "other" },
      ],
      timezones,
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
      },
    };
  },
  computed: {
    formValid() {
      return (
        this.userData.firstName && this.userData.lastName && this.userData.email
      );
    },
    usersInfosStore() {
      return this.$store.getters["users/allUsersInfos"];
    },
  },
  watch: {
    show(val) {
      this.dialog = val;
      if (val && this.userId) this.getUserData();
    },
    dialog(val) {
      if (!val) this.closeModal();
    },
    userId(val) {
      if (val) {
        this.getUserData();
      } else {
        this.resetForm();
      }
    },
  },
  mounted() {
    if (this.userId) {
      this.getUserData();
    } else {
      this.resetForm();
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.resetForm();
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
        title: "",
        firstName: "",
        lastName: "",
        picture: "",
        gender: "",
        email: "",
        dateOfBirth: new Date().toISOString().split("T")[0],
        phone: "",
        location: {
          street: "",
          city: "",
          state: "",
          country: "",
          timezone: "",
        },
        registerDate: "",
        updatedDate: "",
      };
    },
    getUserData() {
      getUserById(this.userId)
        .then((result) => {
          this.userData = JSON.parse(JSON.stringify(result));
          this.userData.dateOfBirth = this.userData.dateOfBirth.split("T")[0];
          this.$store.dispatch("users/addUserInfoToList", this.userData);
        })
        .catch((e) => {
          console.error(e);
          this.$toast({
            message: "Falha ao obter dados do usuário!",
            type: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
::v-deep .v-picker__title {
  background: grey;
}
</style>
