<template>
  <div class="flex">
    <img
      src="@/assets/images/pencil-primary.svg"
      class="w-[22px] cursor-pointer"
      @click="emits('edit')"
    />
    <img
      src="@/assets/images/bin-danger.svg"
      class="w-[22px] ml-2 cursor-pointer"
      @click="isShowDialogConfirm = true"
    />
  </div>

  <dialog-confirm-delete
    v-model:dialogVisible="isShowDialogConfirm"
    @on-confirm="handleDelete"
  />
</template>

<script setup lang="ts">
const isShowDialogConfirm = ref(false);

const emits = defineEmits(['edit', 'delete']);

const handleDelete = () => {
  emits('delete');
};
</script>

<style scoped></style>
