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
      @delete="deleteSelectedUser()"
    ></modal-confirm-delete>

    <v-container>
      <v-data-table
        :headers="headers"
        :items="usersPreview"
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
              color="deep-purple accent-4"
              dark
              class="mb-2"
              @click="openNewUser()"
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
              <td class="img-cell">
                <v-img
                  :src="user.picture"
                  max-height="50"
                  max-width="50"
                  contain
                ></v-img>
              </td>

              <td>{{ user.title }} {{ user.firstName }} {{ user.lastName }}</td>

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
      usersPreview: [],
      headers: [
        { text: "Foto", value: "picture", sortable: false, align: "center" },
        { text: "Nome", value: "firstName", align: "center" },
        { text: "Ações", value: "Actions", sortable: false, align: "center" },
      ],
      selectedUser: null,
      selectedId: null,
      showModalUser: false,
      showModalConfirm: false,
      loading: false,
    };
  },
  computed: {
    usersStore() {
      return this.$store.getters["users/allUsers"];
    },
    hasUsers() {
      return this.$store.getters["users/hasUsers"];
    },
  },

  mounted() {
    this.getUsersPreview();
  },
  methods: {
    getUsersPreview() {
      if (this.hasUsers) {
        this.usersPreview = JSON.parse(JSON.stringify(this.usersStore));
      } else {
        getUsers()
          .then((result) => {
            this.usersPreview = JSON.parse(JSON.stringify(result.data));
            this.$store.commit("users/setUsers", result.data);
          })
          .catch((e) => {
            console.error(e);
            this.$toast({
              message: "Falha ao buscar usuários!",
              type: "error",
            });
          });
      }
    },
    openNewUser() {
      this.selectedUser = null;
      this.selectedId = null;
      this.openModalUser();
    },
    openModalUser() {
      this.showModalUser = true;
    },
    closeModals() {
      this.showModalUser = false;
      this.showModalConfirm = false;
    },
    createNewUser(data) {
      this.loading = true;
      this.showModalUser = false;

      createUser(data)
        .then(() => {
          if (this.hasUsers) {
            this.$store.dispatch("users/addUserToList", data);
            this.usersPreview = JSON.parse(JSON.stringify(this.usersStore));
          } else {
            this.getUsersPreview();
          }

          this.$toast({
            message: "Usuário criado com sucesso!",
            type: "success",
          });
        })
        .catch((e) => {
          console.error(e);
          this.$toast({ message: "Falha ao criar usuário!", type: "error" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openEditUser(user) {
      this.selectedId = user.id;

      this.openModalUser();
    },
    updateSelectedUser(data) {
      this.loading = true;
      this.showModalUser = false;

      updateUser(this.selectedId, data)
        .then(() => {
          if (this.hasUsers) {
            this.$store.dispatch("users/updateUserById", data);
            this.usersPreview = JSON.parse(JSON.stringify(this.usersStore));
          } else {
            this.getUsersPreview();
          }
          this.$toast({
            message: "Usuário atualizado com sucesso!",
            type: "success",
          });
        })
        .catch((e) => {
          console.error(e);
          this.$toast({ message: "Erro ao atualizar usuário!", type: "error" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openDeleteUser(user) {
      this.selectedId = user.id;
      this.showModalConfirm = true;
    },
    deleteSelectedUser() {
      this.showModalConfirm = false;

      this.loading = true;

      deleteUser(this.selectedId)
        .then(() => {
          if (this.hasUsers) {
            this.$store.dispatch("users/removeUserById", this.selectedId);
            this.usersPreview = JSON.parse(JSON.stringify(this.usersStore));
          } else {
            this.getUsersPreview();
          }

          this.$toast({
            message: "Usuário removido com sucesso!",
            type: "success",
          });
        })
        .catch((e) => {
          console.error(e);
          this.$toast({ message: "Falha ao remover usuário!", type: "error" });
        })
        .finally(() => {
          this.loading = false;
          this.selectedId = null;
        });
    },
    saveUser() {
      createUser(this.selectedId)
        .then(() => {
          this.$toast({
            message: "Usuário criado com sucesso!",
            type: "success",
          });
        })
        .catch((e) => {
          console.error(e);
          this.$toast({ message: "Falha ao criar usuário!", type: "error" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatDate(dateString) {
      const [day, month, year] = dateString.split("/");
      if (day && month && year) {
        return `${year}-${month}-${day}`;
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.img-cell {
  display: flex;
  justify-content: center;

  .v-image {
    border-radius: 6px;
  }
}
::v-deep .v-data-footer {
  gap: 10px;
  justify-content: end;
  .v-data-footer__select {
    gap: 10px;
  }
}
</style>
