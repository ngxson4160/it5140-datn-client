<template>
  <create-blog
    :data="data"
    title-button-submit="Lưu"
    :url-back="`/company/blog/${blogId}`"
    show-button-back
    @on-submit="handleUpdateBlog"
  />
</template>

<script setup lang="ts">
import type { CreateBlog } from '~/types/blog';

definePageMeta({
  layout: 'company-dashboard',

  roles: [ERole.COMPANY],
});

const blogStore = useBlogStore();

const router = useRouter();
const { params } = useRoute();

const blogId = params.id;

if (!blogId) {
  router.push('/404');
}

const data = ref<CreateBlog & { id: number | null }>({
  id: null,
  title: '',
  image: '',
  content: '',
});

const dataBlog = await blogStore.getDetailBlog(+blogId);

if (dataBlog.meta?.statusCode === 404) {
  router.push('/404');
}

data.value = dataBlog.data;

const handleUpdateBlog = async (body: CreateBlog) => {
  const { data, meta } = await blogStore.updateBlog(+blogId, body);

  if (meta.statusCode === 200) {
    router.push('/company/blog/list');
  }
};
</script>

<style class="scss"></style>
