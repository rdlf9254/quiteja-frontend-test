<template>
  <div>
    <user-form-modal
      v-if="selectedUser"
      :show="isEditModalVisible"
      :user="selectedUser"
      @close="closeEditModal"
      @save="handleSave"
    ></user-form-modal>

    <confirm-modal
      v-if="selectedUser"
      :show="isDeleteConfirmVisible"
      :message="`Você tem certeza que deseja excluir o usuário ${selectedUser?.firstName}?`"
      confirm-text="Excluir"
      confirm-color="red darken-1"
      @close="closeDeleteModal"
      @confirm="handleDelete"
    ></confirm-modal>

    <v-card-title>
      <!-- Usuários -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
        clearable
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn-toggle
        v-model="viewMode"
        mandatory
        dense
        borderless
      >
        <v-btn value="list">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        <v-btn value="card">
          <v-icon>mdi-view-module</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-title>

    <v-card>
      <div v-if="viewMode === 'list'">
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          :items-per-page="10"
          class="elevation-1"
        >
          <template
            slot="item.picture"
            slot-scope="{ item }"
          >
            <v-avatar
              size="36px"
              class="my-2"
            >
              <img
                :src="item.picture"
                :alt="item.firstName"
              />
            </v-avatar>
          </template>
          <template
            slot="item.fullName"
            slot-scope="{ item }"
          >
            {{ item.fullName }}
          </template>

          <template
            slot="item.actions"
            slot-scope="{ item }"
          >
            <v-icon
              small
              class="mr-2"
              @click="openEditModal(item)"
              >mdi-pencil</v-icon
            >
            <v-icon
              small
              @click="openDeleteModal(item)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
      </div>

      <v-card-text v-else-if="viewMode === 'card'">
        <user-card-grid
          :users="filteredUsers"
          @edit="openEditModal"
          @delete="openDeleteModal"
        ></user-card-grid>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import UserFormModal from "./UserFormModal.vue";
import ConfirmModal from "@/components/shared/ConfirmModal.vue";
import UserCardGrid from "./UserCardGrid.vue";
import { mapActions } from "vuex";

export default {
  name: "UserList",
  components: {
    UserFormModal,
    ConfirmModal,
    UserCardGrid,
  },
  props: {
    users: { type: Array, required: true },
  },
  data() {
    return {
      search: "",
      isEditModalVisible: false,
      isDeleteConfirmVisible: false,
      selectedUser: null,
      viewMode: "list",
      headers: [
        { text: "Foto", value: "picture", sortable: false },
        { text: "Nome Completo", value: "fullName" },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    processedUsers() {
      return this.users.map(user => ({
        ...user,
        fullName: `${user?.title ? user?.title?.charAt(0).toUpperCase() + user?.title?.slice(1) + ". " : ""}${
          user?.firstName
        } ${user?.lastName}`,
      }));
    },
    filteredUsers() {
      if (!this.search) return this.processedUsers;

      const searchTerm = this.search?.toLowerCase();
      return this.processedUsers.filter(user => {
        const fullName = user?.fullName?.toLowerCase();
        return fullName?.includes(searchTerm);
      });
    },
  },
  methods: {
    ...mapActions("users", ["deleteUser", "updateUser"]),
    ...mapActions("toastr", ["showToastr"]),

    openEditModal(user) {
      this.selectedUser = user;
      this.isEditModalVisible = true;
    },
    closeEditModal() {
      this.isEditModalVisible = false;
    },
    handleSave(userData) {
      this.updateUser({ id: userData.id, userData });
      this.showToastr({ text: "Usuário atualizado com sucesso", color: "success" });
      this.closeEditModal();
    },

    openDeleteModal(user) {
      this.selectedUser = user;
      this.isDeleteConfirmVisible = true;
    },
    closeDeleteModal() {
      this.isDeleteConfirmVisible = false;
    },
    handleDelete() {
      this.deleteUser(this.selectedUser.id);
      this.showToastr({ text: "Usuário excluído com sucesso", color: "success" });
      this.closeDeleteModal();
    },
  },
};
</script>
