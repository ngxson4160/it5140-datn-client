<template>
  <div
    class="bg-white h-[150px] border rounded-lg flex py-2 px-4 hover:bg-[#1caf5705] hover:border-[#1caf573f] cursor-pointer"
  >
    <NuxtLink
      class="w-full flex items-center justify-between"
      target="_blank"
      :to="`/blog/${blogDetail.id}`"
    >
      <div class="flex items-center gap-x-2">
        <img :src="blogDetail.image" class="w-[162px] h-24 border rounded-md" />
        <div class="flex flex-col justify-between h-24">
          <p class="text-xl font-bold">{{ blogDetail.title }}</p>
          <p class="text-sm">{{ formatDateFull(blogDetail.createdAt) }}</p>
        </div>
      </div>
      <img
        v-if="blogDetail.isFollow"
        src="@/assets/images/heart-primary.svg"
        class="w-10 h-10 cursor-pointer"
        @click.prevent="handleFollowBlog(false)"
      />
      <img
        v-else
        src="@/assets/images/heart-gray.svg"
        class="w-10 h-10 cursor-pointer"
        @click.prevent="handleFollowBlog(true)"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const blogStore = useBlogStore();
const blogDetail = ref({ ...props.data });

const handleFollowBlog = async (isFavorite: boolean) => {
  const isLogin = handleCheckLogin();
  if (!isLogin) return;
  await blogStore.favoriteBlog(blogDetail.value.id, { isFavorite });

  if (isFavorite) {
    blogDetail.value.totalFollow++;
  } else {
    blogDetail.value.totalFollow--;
  }
  blogDetail.value.isFollow = isFavorite;
};
</script>

<style scoped></style>
