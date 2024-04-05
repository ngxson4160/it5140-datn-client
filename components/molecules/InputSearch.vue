<template>
  <div
    class="h-6 border-b border-gray-cs dark:border-zinc-800 p-8 pl-5 flex items-center"
  >
    <div class="flex-1">
      <UInput
        v-model="value"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="lg"
        color="white"
        :trailing="false"
        variant="none"
        placeholder="Search for something..."
        :ui="ui"
      />
    </div>

    <div class="flex">
      <div
        class="flex items-center cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300 mr-4"
      >
        <UIcon name="i-heroicons-funnel" class="text-xl mr-2" />
        <div class="text-xs">Filter</div>
      </div>

      <div
        class="flex items-center cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300"
      >
        <UIcon name="i-heroicons-rectangle-stack" class="text-xl mr-2" />
        <div class="text-xs">View all</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const value = ref('')
const ui = {
  placeholder: 'placeholder-gray-900 dark:placeholder-white',
}
</script>

<style scoped lang="scss"></style>
