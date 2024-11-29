<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="text-h5">Confirmar Exclusão</span>
      </v-card-title>

      <v-card-text>
        <p>{{ message }}</p>

        <v-row v-if="user">
          <v-col cols="4">
            <v-img
              :src="user.picture"
              alt="Imagem do Usuário"
              class="rounded-circle"
            />
          </v-col>
          <v-col cols="8">
            <span class="headline"
              >{{ user.firstName }} {{ user.lastName }}</span
            >
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="cancel">Cancelar</v-btn>
        <v-btn color="green darken-1" text @click="confirmDelete">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "modal-confirm-delete",
  props: {
    show: { type: Boolean, required: true },
    message: { type: String, required: true },
    user: { required: true },
  },
  data() {
    return {
      dialog: this.show,
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
    cancel() {
      this.closeModal();
    },
    confirmDelete() {
      this.$emit("delete", this.user);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.v-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
