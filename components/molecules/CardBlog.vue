<template>
  <div class="w-[425px] h-[411px] bg-white rounded-lg shadow-md">
    <img
      :src="data.image"
      class="w-[425px] h-[251px] rounded-t-lg object-contain cursor-pointer"
      @click="router.push(`/blog/${data.id}`)"
    />

    <div class="p-4">
      <div class="h-14">
        <p
          class="text-xl font-bold line-clamp-2 cursor-pointer hover:underline"
          @click="router.push(`/blog/${data.id}`)"
        >
          {{ data.title }}
        </p>
      </div>
      <div class="mt-2 flex justify-between items-center">
        <div class="flex gap-x-2 items-center">
          <img
            :src="data.company?.avatar"
            class="rounded-full border w-16 h-16 object-contain"
          />
          <div>
            <p class="line-clamp-1">
              {{ data.company?.name }}
            </p>
            <p class="text-sm">{{ formatDateFull(data.createdAt) }}</p>
          </div>
        </div>
        <img src="@/assets/images/heart-gray.svg" class="w-8 cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
</script>

<style scoped></style>
