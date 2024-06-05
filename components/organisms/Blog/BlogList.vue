<template>
  <div class="mx-auto w-[1300px] pt-10">
    <div class="flex gap-x-4 w-[750px] bg-[#E6EFFF] px-4 py-2 rounded-md">
      <el-input
        v-model:model-value="name"
        placeholder="Nhập từ khóa tìm kiếm"
      />
      <el-button type="primary" size="large" @click="handleSearch">
        Tìm kiếm
      </el-button>
    </div>
  </div>
  <h1 class="col-span-3 my-10 font-bold text-center text-2xl">
    DANH SÁCH BLOG
  </h1>

  <div v-if="!meta.pagination.totalItem" class="text-center">
    Không tìm thấy kết quả phù hợp
  </div>
  <div v-else>
    <div class="w-fit grid grid-cols-3 mx-auto gap-x-4 gap-y-6">
      <card-blog
        v-for="(el, index) in listBlog"
        :key="index"
        :data="el"
        @on-click-hear="handleFollowBlog"
      />
    </div>

    <div class="w-full flex justify-center mt-4 pb-[104px]">
      <el-pagination
        :current-page="currentPage"
        :page-size="meta.pagination.pageSize"
        :total="meta.pagination.totalItem"
        :pager-count="9"
        layout="prev, pager, next"
        background
        @current-change="setCurrentPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGetListBlog } from '~/types/blog';

const blogStore = useBlogStore();

const currentPage = ref<number>(1);
const query = ref<IGetListBlog>({});
const name = ref('');
const listBlog = ref<any[]>([]);
const meta = ref<any>({});

query.value.limit = 15;

const getListBlog = async () => {
  const data = await blogStore.getListBlog({
    ...query.value,
  });
  listBlog.value = data.data as any[];
  meta.value = data.meta;
};

await getListBlog();

const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  const data = await blogStore.getListBlog({
    ...query.value,
    page,
  });
  listBlog.value = data.data as any[];
  meta.value = data.meta;
};

const handleSearch = async () => {
  const nameSearch = name.value.trim();
  query.value = { ...query.value, filter: nameSearch };

  query.value.page = 1;
  await getListBlog();
};

const handleFollowBlog = async (data: {
  blogId: number;
  isFavorite: boolean;
}) => {
  const isLogin = handleCheckLogin();
  if (!isLogin) return;

  await blogStore.favoriteBlog(data.blogId, { isFavorite: data.isFavorite });

  const blogClick = listBlog.value.find((el) => el.id === data.blogId);
  if (data.isFavorite) {
    blogClick.totalFollow++;
  } else {
    blogClick.totalFollow--;
  }
  blogClick.isFollow = data.isFavorite;
};
</script>

<style scoped></style>
