<template>
  <div>
    <InputSearch />
    <div class="p-8">
      <div class="flex justify-end">
        <UButton
          icon="i-heroicons-plus"
          size="sm"
          color="primary"
          variant="solid"
          label="Add"
          :trailing="false"
        />
      </div>
      <UTable
        v-model="selected"
        :columns="columns"
        :rows="people"
        :sort="{ column: 'title' }"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No items test.',
        }"
      >
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>

      <Pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  // middleware: ['system-only'],
  roles: [ERole.ROOT, ERole.ADMIN],
});

// data
const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'title',
    label: 'Title',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    direction: 'desc',
  },
  {
    key: 'role',
    label: 'Role',
  },
  {
    key: 'actions',
  },
];

const people = [
  {
    id: 1,
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin',
  },
  {
    id: 3,
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member',
  },
  {
    id: 4,
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin',
  },
  {
    id: 5,
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner',
  },
  {
    id: 6,
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member',
  },
];

const selected = ref([]);

const items = (row: { id: any }) => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('Edit', row.id),
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
    },
  ],
];
</script>

<style scoped></style>
