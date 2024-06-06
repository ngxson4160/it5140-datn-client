<template>
  <div class="bg-white mr-4 px-4 pt-4 pb-10 shadow-md rounded-md min-h-[750px]">
    <p class="font-bold text-xl mb-10 pb-2 border-b">Quản lý Blog</p>

    <div class="flex justify-between mb-4">
      <div>
        <el-input
          v-model="filterTitle"
          size="large"
          style="width: 875px"
          placeholder="Nhập từ khóa"
          clearable
        />
        <el-button
          size="large"
          type="primary"
          class="w-[121px] ml-4"
          @click="onSearchJob"
        >
          Tìm kiếm
        </el-button>
      </div>
      <el-button
        size="large"
        :icon="Plus"
        @click="navigateTo('/company/blog/create')"
      >
        Tạo mới
      </el-button>
    </div>

    <div class="mt-10">
      <el-table
        :data="listBlogs"
        class="!text-black relative"
        stripe
        row-class-name="custom-row-table"
      >
        <el-table-column width="220">
          <template #header><p class="text-center">Ảnh</p></template>
          <template #default="scoped">
            <div class="flex justify-center">
              <img
                :src="scoped.row.image"
                class="border rounded-lg w-[152px] h-[90px]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header><p>Tiêu đề</p></template>
          <template #default="scoped">
            <p
              class="line-clamp-4 underline text-blue cursor-pointer"
              @click="router.push(`/company/blog/${scoped.row.id}`)"
            >
              {{ scoped.row.title }}
            </p>
          </template>
        </el-table-column>
        <el-table-column width="220">
          <template #header>
            <div class="flex cursor-pointer" @click="onOrderCreatedAt">
              <p class="mr-2">Ngày đăng</p>
              <img
                v-if="query.sortCreatedAt === EOrderPaging.DESC"
                class="w-[22px]"
                src="@/assets/images/sort-up-black.svg"
              />
              <img
                v-else-if="query.sortCreatedAt === EOrderPaging.ASC"
                class="w-[22px]"
                src="@/assets/images/sort-down-black.svg"
              />
            </div>
          </template>
          <template #default="scoped">
            <p>{{ formatDateFull(scoped.row.createdAt) }}</p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template #header><p class="text-center">Lượt xem</p></template>
          <template #default="scoped">
            <p class="text-center">{{ scoped.row.totalViews }}</p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template #header><p class="text-center">Lượt thích</p></template>
          <template #default>
            <p class="text-center">Data</p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template #header><p class="text-center">Hành động</p></template>
          <template #default="scoped">
            <div class="flex justify-center">
              <el-dropdown trigger="click">
                <img
                  src="@/assets/images/option-black.svg"
                  class="w-7 cursor-pointer"
                />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click="
                        router.push(`/company/blog/${scoped.row.id}/edit`)
                      "
                    >
                      <div class="flex mr-2">
                        <img
                          src="@/assets/images/pencil-black.svg"
                          class="w-5 mr-2"
                        />
                        <p>Sửa</p>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="
                        handleConfirmDelete(scoped.row.id, scoped.row.title)
                      "
                    >
                      <div class="flex mr-2">
                        <img
                          src="@/assets/images/bin-danger.svg"
                          class="w-5 mr-2"
                        />
                        <p>Xóa</p>
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="w-full flex justify-end mt-8">
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

  <dialog-confirm-action
    v-model:dialog-visible="showConfirmDelete"
    @on-confirm="handleDeleteBlog"
  >
    <p>
      Xác nhận xóa bài đăng
      <span class="font-bold">{{ `"${blogTitleChose}"` }}</span>
    </p>
  </dialog-confirm-action>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import type { IGetListBlog } from '~/types/blog';

definePageMeta({
  layout: 'company-dashboard',
  // middleware: ['redirect'],
  roles: [ERole.COMPANY],
});

const blogStore = useBlogStore();
const userData = getUserData();

const router = useRouter();

const filterTitle = ref('');
const showConfirmDelete = ref(false);
const blogIdChose = ref();
const blogTitleChose = ref();
const currentPage = ref<number>(1);
const query = ref<IGetListBlog>({
  sortCreatedAt: EOrderPaging.DESC,
  creatorId: userData.id,
});
const meta = ref<any>({});
const listBlogs = ref<any[]>([]);

const getListBlog = async (query: IGetListBlog) => {
  const data = await blogStore.getListBlog({
    ...query,
  });
  listBlogs.value = data.data as any[];
  meta.value = data.meta;
};
query.value.limit = 15;

await getListBlog({ ...query.value });

const setCurrentPage = async (page: number) => {
  window.scrollTo({ top: 0 });

  currentPage.value = page;
  await getListBlog({
    ...query.value,
    page,
  });
};

const handleConfirmDelete = (id: number, title: string) => {
  showConfirmDelete.value = true;
  blogIdChose.value = id;
  blogTitleChose.value = title;
};

const handleDeleteBlog = async () => {
  const id = blogIdChose.value;
  await blogStore.deleteBlog(id);
  listBlogs.value = listBlogs.value.filter((el) => el.id !== id);
};

const onSearchJob = async () => {
  query.value.filter = filterTitle.value;
  await getListBlog({ ...query.value });
};

const onOrderCreatedAt = async () => {
  if (query.value.sortCreatedAt === EOrderPaging.DESC) {
    query.value.sortCreatedAt = EOrderPaging.ASC;
  } else {
    query.value.sortCreatedAt = EOrderPaging.DESC;
  }

  const data = await blogStore.getListBlog({
    ...query.value,
    page: 1,
  });
  currentPage.value = 1;
  listBlogs.value = data.data as any[];
  meta.value = data.meta;
};
</script>

<style lang="scss"></style>
