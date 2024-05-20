<template>
  <div class="grid grid-cols-10 gap-x-4 mr-4 mb-[104px]">
    <div class="col-span-7 bg-white p-4 h-fit">
      <el-tabs class="custom-tabs">
        <el-tab-pane
          label="Việc làm đã ứng tuyển"
          class="flex flex-col gap-y-2"
        >
          <div v-if="listJobApply.length">
            <card-job-applied
              v-for="(data, index) in listJobApply"
              :key="index"
              :data="data"
            />
            <div class="w-full flex justify-end mt-4 mb-16">
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
          <p v-else class="text-center">Chưa ứng tuyển công việc nào</p>
        </el-tab-pane>
        <el-tab-pane label="Việc làm đã lưu" class="flex flex-col gap-y-2">
          <div v-if="listJobFavorite.length">
            <card-job-full
              v-for="(data, index) in listJobFavorite"
              :key="index"
              :data="data"
            />
            <div class="w-full flex justify-end mt-4 mb-16">
              <el-pagination
                :current-page="currentPageFavorite"
                :page-size="metaFavorite.pagination.pageSize"
                :total="metaFavorite.pagination.totalItem"
                :pager-count="9"
                layout="prev, pager, next"
                background
                @current-change="setCurrentPageFavorite"
              />
            </div>
          </div>
          <p v-else class="text-center">Hiện không lưu tin tuyển dụng nào</p>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="col-span-3 bg-white p-4">
      <p class="text-lg font-bold mb-4">Việc làm liên quan</p>
      <div class="flex flex-col gap-y-2">
        <card-job-home
          v-for="(data, index) in listJobApply"
          :key="index"
          class="!h-[120px] w-full"
          :data="data.job"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGetListJobApplication, IJobApplication } from '~/types/user';

definePageMeta({
  layout: 'user-dashboard',
  middleware: ['redirect'],
});

const currentPage = ref<number>(1);
const query = ref<IGetListJobApplication>({});
const listJobApply = ref<IJobApplication[]>([]);
const meta = ref<any>({});

query.value.limit = 5;

const userStore = useUserStore();
const data = await userStore.getListJobApplication({
  ...query.value,
});
listJobApply.value = data.data;
meta.value = data.meta;

const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  const data = await userStore.getListJobApplication({
    ...query.value,
    page,
  });
  listJobApply.value = data.data as IJobApplication[];
  meta.value = data.meta;
};

const currentPageFavorite = ref<number>(1);
const queryFavorite = ref<IGetListJobApplication>({});
const listJobFavorite = ref<IJobApplication[]>([]);
const metaFavorite = ref<any>({});

queryFavorite.value.limit = 5;
const dataJobFavorite = await userStore.getListFavorite({
  ...queryFavorite.value,
});
listJobFavorite.value = dataJobFavorite.data;
metaFavorite.value = dataJobFavorite.meta;

const setCurrentPageFavorite = async (page: number) => {
  currentPageFavorite.value = page;
  const data = await userStore.getListFavorite({
    ...query.value,
    page,
  });
  listJobFavorite.value = data.data as IJobApplication[];
  metaFavorite.value = data.meta;
};

console.log(listJobApply.value);
console.log(listJobFavorite.value);
</script>

<style lang="scss">
.custom-tabs {
  .el-tabs__item {
    @apply text-base;
  }
}
</style>
