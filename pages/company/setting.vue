<template>
  <account-setting
    v-model:data="accountInfo"
    v-model:show-dialog-change-password="showDialogChangePassword"
    v-model:new-pass="newPass"
    @on-save="onSave"
    @on-update-password="onUpdatePassword"
    @on-update-avatar="onUpdateAvatar"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'company-dashboard',
});

const userStore = useUserStore();
const authStore = useAuthStore();

const initNewPass = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
};
const newPass = ref({ ...initNewPass });

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

const onUpdatePassword = async () => {
  const { meta } = await authStore.changePassword({
    oldPassword: newPass.value.currentPassword,
    newPassword: newPass.value.password,
  });
  if (meta.statusCode === 200) {
    showDialogChangePassword.value = false;
    newPass.value = { ...initNewPass };
  }
};

const onUpdateAvatar = async (url: string) => {
  await userStore.updateAccountInfo({ avatar: url });
};
</script>

<style scoped></style>
