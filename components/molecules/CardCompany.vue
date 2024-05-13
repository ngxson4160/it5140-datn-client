<template>
  <div
    class="w-[425px] h-[400px] rounded-lg shadow-md overflow-hidden bg-white"
  >
    <div
      class="h-[175px] relative cursor-pointer"
      @click="router.push(`/company/${data.id}`)"
    >
      <img
        :key="data.coverImage"
        :src="data.coverImage"
        class="w-[425px] h-[125px] rounded-t-lg object-cover"
      />
      <img
        :key="data.avatar"
        :src="data.avatar"
        class="absolute left-4 top-[90px] p-[1px] border rounded-sm w-[64px] h-[64px] object-contain"
      />
    </div>
    <p
      class="px-4 font-bold mb-3 hover:underline cursor-pointer"
      @click="router.push(`/company/${data.id}`)"
    >
      {{ data?.name }}
    </p>
    <div class="px-4 text-sm !font-normal" v-html="data?.aboutUs"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
</script>

<style scoped></style>
