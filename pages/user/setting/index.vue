<template>
  <account-setting
    v-model:data="accountInfo"
    v-model:show-dialog-change-password="showDialogChangePassword"
    @on-save="onSave"
    @on-update-password="onUpdatePassword"
    @on-update-avatar="onUpdateAvatar"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user-dashboard',
});

const userStore = useUserStore();
const authStore = useAuthStore();

const accountInfo = ref();
const showDialogChangePassword = ref(false);

const { data } = await userStore.getAccountInfo();
accountInfo.value = data;

const onSave = async () => {
  await userStore.updateAccountInfo({
    firstName: accountInfo.value.firstName,
    lastName: accountInfo.value.lastName,
  });
};

const onUpdatePassword = async (data: any) => {
  const { meta } = await authStore.changePassword({
    oldPassword: data.currentPassword,
    newPassword: data.password,
  });

  if (meta.statusCode === 200) {
    showDialogChangePassword.value = false;
  }
};

const onUpdateAvatar = async (url: string) => {
  await userStore.updateAccountInfo({ avatar: url });
};
</script>

<style scoped></style>
