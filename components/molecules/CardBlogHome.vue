<template>
  <div
    class="w-[434px] h-[588px] bg-white border p-4 rounded-lg flex flex-col justify-between"
  >
    <div>
      <img
        :src="data?.image"
        class="w-full h-[255px] object-contain border rounded-md"
      />
      <p class="my-2">{{ formatDateShort(data?.createdAt) }}</p>
      <p class="text-lg font-bold mb-4 max-h-14 line-clamp-2">
        {{ data?.title }}
      </p>

      <div class="text-gray text-sm max-h-[125px] overflow-hidden">
        <div v-html="data?.content"></div>
      </div>
    </div>
    <el-button
      type="primary"
      class="mt-6 !h-11 !font-bold !text-base"
      @click="router.push(`/blog/${data?.id}`)"
    >
      Chi tiết
      <img src="@/assets/images/arrow-right.svg" class="w-8 ml-1" />
    </el-button>
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

<style></style>
