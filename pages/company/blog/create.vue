<template>
  <create-blog :data="data" @on-submit="handleCreateBlog" />
</template>

<script setup lang="ts">
import type { CreateBlog } from '~/types/blog';

definePageMeta({
  layout: 'company-dashboard',

  roles: [ERole.COMPANY],
});

const blogStore = useBlogStore();

const router = useRouter();

const data = ref<CreateBlog>({
  title: '',
  image: '',
  content: '',
});

const handleCreateBlog = async (body: CreateBlog) => {
  const { data, meta } = await blogStore.createBlog(body);

  if (meta.statusCode === 200) {
    router.push('/company/blog/list');
  }
};
</script>

<style class="scss"></style>
