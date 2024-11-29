<template>
  <div>
    <modal-add-user
      :show="showModalAdd"
      @save="addNewUser"
      @close="closeModals"
    ></modal-add-user>
    <!-- <modal-edit-user :show="showModalAdd" @save="addNewUser"></modal-edit-user> -->

    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lista de Usuários</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="showAddModal()">
              New Item
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="user in items" :key="user.id">
              <td>
                <v-img
                  :src="user.picture"
                  max-height="50"
                  max-width="50"
                  contain
                ></v-img>
              </td>
              <td>{{ user.title }} {{ user.firstName }} {{ user.lastName }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
    {{ this.users }}
  </div>
</template>

<script>
import ModalAddUser from "@/components/modals/ModalAddUser.vue";
// import ModalEditUser from "@/components/modals/modalEditUser.vue";

import { getUsers } from "@/services/user.js";

export default {
  name: "UserList",
  components: {
    ModalAddUser,
    // ModalEditUser,
  },
  data() {
    return {
      users: [],
      headers: [
        { text: "Foto", value: "picture", sortable: false },
        { text: "Nome", value: "firstName" },
        { text: "Ações", value: "Actions", sortable: false },
      ],
      showModalAdd: false,
      showModalEdit: false,
    };
  },
  mounted() {
    getUsers()
      .then((result) => {
        this.users = result.data;
      })
      .catch((e) => {
        console.error("erro ", e);
      });
  },
  methods: {
    showAddModal() {
      this.showModalAdd = true;
    },
    showEditModal() {
      this.showModalEdit = true;
    },
    closeModals() {
      this.showModalAdd = false;
      this.showModalEdit = false;
    },
    addNewUser(newUser) {
      // this.users.push(newUser);
      console.log("Usuário adicionado:", newUser);
    },
    viewInfo(user) {
      console.log(
        `ver info de usuário:\nNome: ${user.name}\nTítulo: ${user.title}`
      );
    },
    editUser(user) {
      console.log(`Editando usuário: ${user.name}`);
    },
    deleteUser(userId) {
      const confirmed = confirm("Tem certeza que deseja excluir este usuário?");
      if (confirmed) {
        this.users = this.users.filter((user) => user.id !== userId);
      }
    },
  },
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
