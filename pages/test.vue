<template>
  <el-button @click="showDialogPreviewCvSystem = true">Show</el-button>
  <dialog-preview-cv-system
    v-model:dialog-visible="showDialogPreviewCvSystem"
    :data="userStore.myProfile"
  />
</template>

<script setup lang="ts">
const showDialogPreviewCvSystem = ref(false);

const userStore = useUserStore();

await userStore.getMyProfile();
</script>
