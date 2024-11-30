<template>
  <section>
    <modal-user
      :show="showModalUser"
      :user-id="selectedId"
      @save="createNewUser"
      @update="updateSelectedUser"
      @close="closeModals()"
    ></modal-user>

    <modal-confirm-delete
      :show="showModalConfirm"
      message="Tem certeza que deseja excluir o usuário?"
      :user="selectedUser"
      @close="closeModals()"
    ></modal-confirm-delete>

    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        :loading="loading"
        class="elevation-1"
        loading-text="Carregando usuários..."
        :footer-props="{
          'items-per-page-text': 'Usuários por página',
        }"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lista de Usuários</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="openModalUser()"
              :disabled="loading"
            >
              <v-icon>mdi-plus</v-icon>
              Novo Usuário
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

              <td>
                {{ user.title }} {{ user.firstName }} {{ user.lastName }}
              </td>

              <td class="td-actions">
                <v-icon small class="mr-2" @click="openEditUser(user)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="openDeleteUser(user)">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
  </section>
</template>

<script>
import ModalUser from "@/components/modals/ModalUser.vue";
import ModalConfirmDelete from "@/components/modals/ModalConfirmDelete.vue";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/user.js";

export default {
  name: "UserList",
  components: {
    ModalUser,
    ModalConfirmDelete,
  },
  data() {
    return {
      users: [],
      headers: [
        { text: "Foto", value: "picture", sortable: false },
        { text: "Nome", value: "firstName" },
        { text: "Ações", value: "Actions", sortable: false },
      ],
      selectedUser: null,
      selectedId: null,
      showModalUser: false,
      showModalConfirm: false,
      loading: false,
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
    openModalUser() {
      this.showModalUser = true;
    },
    closeModals() {
      this.showModalUser = false;
      this.showModalConfirm = false;
      this.selectedUser = null;
      this.selectedId = null
    },
    createNewUser(newUser) {
      console.log("Usuário adicionado:", newUser);
    },
    openEditUser(user) {
      this.selectedId = user.id;

      this.openModalUser();
    },
    updateSelectedUser(data) {
      this.loading = true;
      console.log(data);

      updateUser(this.selectedId, data)
        .then(() => {
          console.log(`Editando usuário: ${this.selectedUser}`);
        })
        .catch((e) => {
          console.error("erro ", e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openDeleteUser(user) {
      console.log("deletar  - ", user);
      this.selectedId = user.id;
      this.showModalConfirm = true;
    },
    deleteSelectedUser() {
      this.loading = true;

      deleteUser(this.selectedId)
        .then(() => {
          // this.selectedUser = result.data;
          console.log(`delete usuário: ${this.selectedUser}`);
        })
        .catch((e) => {
          console.error("erro ", e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    saveUser() {
      createUser(this.selectedId)
        .then(() => {
          // this.selectedUser = result.data;
          console.log(`delete usuário: ${this.selectedUser}`);
        })
        .catch((e) => {
          console.error("erro ", e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateUser() {},
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
::v-deep .v-data-footer {
  gap: 10px;
  justify-content: end;
  .v-data-footer__select {
    gap: 10px;
  }
}
</style>
