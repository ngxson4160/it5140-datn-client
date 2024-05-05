<template>
  <dialog-apply-job v-model:dialog-visible="showDialog" />
  <el-button @click="showDialog = true">Show</el-button>
</template>

<script setup lang="ts">
const showDialog = ref(false);
</script>
