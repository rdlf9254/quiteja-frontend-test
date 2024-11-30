<template>
  <v-snackbar
    v-model="visible"
    :color="color"
    timeout="3000"
    :multi-line="true"
    bottom
    right
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="visible = false" small>
        Fechar
      </v-btn>
    </template>

  </v-snackbar>
</template>

<script>
export default {
  name: "AppToast",
  data() {
    return {
      visible: false,
      message: "",
      color: "success",
    };
  },
  methods: {
    showToast({ message, type }) {
      this.message = message;
      this.color = type === "error" ? "red" : "green";
      this.visible = true;
    },
  },
};
</script>

<style scoped></style>
