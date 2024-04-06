<template>
  <UPagination
    v-model="paginationStore.page"
    :page-count="paginationStore.totalPages"
    :total="paginationStore.totalItems"
    :max="5"
    :ui="{
      rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
      wrapper: 'justify-end',
    }"
  >
    <template #prev="{ onClick }">
      <UTooltip text="Previous page">
        <UButton
          icon="i-heroicons-arrow-small-left-20-solid"
          color="primary"
          :ui="{ rounded: 'rounded-full' }"
          class="rtl:[&_span:first-child]:rotate-180 me-2"
          @click="onClick"
        />
      </UTooltip>
    </template>
    <template #next="{ onClick }">
      <UTooltip text="Next page">
        <UButton
          icon="i-heroicons-arrow-small-right-20-solid"
          color="primary"
          :ui="{ rounded: 'rounded-full' }"
          class="rtl:[&_span:last-child]:rotate-180 ms-2"
          @click="onClick"
        />
      </UTooltip>
    </template>
  </UPagination>
</template>

<script setup lang="ts">
interface IEmits {
  (event: 'click', storyId: number): void;
}

// emit
const emit = defineEmits<IEmits>();

// data
const paginationStore = usePaginationStore();

// methods

const handleCurrentChange = () => {
  emit('click', paginationStore.page);
};
</script>

<style scoped></style>
