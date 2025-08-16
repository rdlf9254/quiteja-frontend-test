<template>
  <base-modal
    :show="show"
    title="Editar Usuário"
    @close="onClose"
  >
    <template #content>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Nome*"
              v-model="editableUser.firstName"
              :error-messages="errors.firstName"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              label="Sobrenome*"
              v-model="editableUser.lastName"
              :error-messages="errors.lastName"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*indica campo obrigatório</small>
    </template>

    <template #actions>
      <v-btn
        text
        @click="onClose"
        >Cancelar</v-btn
      >
      <v-btn
        color="blue darken-1"
        text
        @click="onSave"
        >Salvar</v-btn
      >
    </template>
  </base-modal>
</template>

<script>
import BaseModal from "@/components/shared/BaseModal.vue";
import { mapActions } from "vuex";

export default {
  name: "UserFormModal",
  components: { BaseModal },
  props: {
    user: { type: Object, required: true },
    show: { type: Boolean, required: true },
  },
  data() {
    return {
      editableUser: {},
      errors: {
        firstName: "",
        lastName: "",
      },
    };
  },
  watch: {
    user: {
      handler(newUser) {
        this.editableUser = { ...newUser };
        this.clearErrors();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions("toastr", ["showToastr"]),

    onClose() {
      this.clearErrors();
      this.$emit("close");
    },

    onSave() {
      if (this.validateForm()) {
        this.$emit("save", this.editableUser);
      }
    },

    validateForm() {
      this.clearErrors();
      let isValid = true;

      if (!this.editableUser.firstName || this.editableUser.firstName.trim() === "") {
        this.errors.firstName = "Nome é obrigatório";
        isValid = false;
      }

      if (!this.editableUser.lastName || this.editableUser.lastName.trim() === "") {
        this.errors.lastName = "Sobrenome é obrigatório";
        isValid = false;
      }

      if (!isValid) {
        this.showToastr({
          text: "Por favor, preencha todos os campos obrigatórios",
          color: "error",
        });
      }

      return isValid;
    },

    clearErrors() {
      this.errors = {
        firstName: "",
        lastName: "",
      };
    },
  },
};
</script>
