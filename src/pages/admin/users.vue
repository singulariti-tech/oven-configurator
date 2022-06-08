<script setup lang="ts">
  import { Ref, ref } from "vue";
  import { Role, User } from "@/types/site/user";
  import IconEdit from "~icons/ant-design/edit-outlined";
  import IconDelete from "~icons/ant-design/delete-outlined";
  import IconAdd from "~icons/carbon/add";

  function showAddUserDialog() {
    showUserDialog.value = true;
  }

  function editUser() {
    resetCurrentUser();
  }

  function disableUser() {
    //
  }

  function saveUser() {
    resetCurrentUser();
  }

  function resetCurrentUser() {
    showUserDialog.value = false;
    currentUser.value = defaultUser;
  }

  const defaultUser = {
    firstName: "",
    lastName: "",
    login: "",
    phone: "",
    roles: [Role.USER],
    vendor: "",
    status: true,
  };
  const currentUser = ref(defaultUser);
  const showUserDialog: Ref<boolean> = ref(false);
</script>

<template>
  <div>
    <nav class="w-full flex pb-2 mb-2 border-b border-gray-300/50 items-center">
      <span class="text-xl font-bold mr-2 text-taikisha"> {{ $t("app.name") }}</span>
      <span class="font-bold text-xl">||</span>
      <span class="text-lg font-semibold ml-4 mr-10 text-taikisha">
        {{ $t("pages.user-manager.title") }}
      </span>
    </nav>
  </div>
</template>

<route lang="yaml">
name: users
meta:
  layout: secure
</route>
