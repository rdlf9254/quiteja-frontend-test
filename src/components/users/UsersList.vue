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
      :message="`Você tem certeza que deseja excluir o usuário ${selectedUser.firstName}?`"
      confirm-text="Excluir"
      confirm-color="red darken-1"
      @close="closeDeleteModal"
      @confirm="handleDelete"
    ></confirm-modal>
    <v-card-title>
      Usuários
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
      >
        <template slot="item.picture" slot-scope="{ item }">
          <v-avatar size="36px" class="my-2">
            <img :src="item.picture" :alt="item.firstName" />
          </v-avatar>
        </template>
        <template slot="item.fullName" slot-scope="{ item }">
          {{ item.title | capitalize }}. {{ item.firstName }} {{ item.lastName }}
        </template>

        <template slot="item.actions" slot-scope="{ item }">
          <v-icon small class="mr-2" @click="openEditModal(item)">mdi-pencil</v-icon>
          <v-icon small @click="openDeleteModal(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import UserFormModal from './UserFormModal.vue';
import ConfirmModal from '@/components/shared/ConfirmModal.vue';

export default {
  name: 'UserList',
  components: {
    UserFormModal,
    ConfirmModal,
  },
  props: {
    users: { type: Array, required: true },
  },
  data() {
    return {
      search: '',
      isEditModalVisible: false,
      isDeleteConfirmVisible: false,
      selectedUser: null,
      headers: [
        { text: 'Foto', value: 'picture', sortable: false },
        { text: 'Nome Completo', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions('users', ['deleteUser', 'updateUser']),

    openEditModal(user) {
      this.selectedUser = user;
      this.isEditModalVisible = true;
    },
    closeEditModal() {
      this.isEditModalVisible = false;
    },
    handleSave(userData) {
      this.updateUser({ id: userData.id, userData });
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
      this.closeDeleteModal();
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>