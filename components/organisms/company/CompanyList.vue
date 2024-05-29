<template>
  <div class="mx-auto w-[1300px] mt-10">
    <div class="flex gap-x-4 w-[750px] bg-[#E6EFFF] px-4 py-2 rounded-md">
      <el-input v-model:model-value="name" placeholder="Nhập tên công ty" />
      <el-button type="primary" size="large" @click="handleSearch">
        Tìm kiếm
      </el-button>
    </div>
  </div>
  <h1 class="col-span-3 my-10 font-bold text-center text-2xl">
    DANH SÁCH CÁC CÔNG TY
  </h1>

  <div v-if="!meta.pagination.totalItem" class="text-center">
    Không tìm thấy kết quả phù hợp
  </div>
  <div v-else>
    <div class="w-fit grid grid-cols-3 mx-auto gap-x-4 gap-y-6">
      <card-company
        v-for="(el, index) in listCompany"
        :key="index"
        :data="el"
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
import type { IGetListCompany } from '~/types/company';

const companyStore = useCompanyStore();

const currentPage = ref<number>(1);
const query = ref<IGetListCompany>({});
const name = ref('');
const listCompany = ref<any[]>([]);
const meta = ref<any>({});

query.value.limit = 15;

const callGetListCompany = async () => {
  const data = await companyStore.getListCompany({
    ...query.value,
  });
  listCompany.value = data.data as any[];
  meta.value = data.meta;
};

await callGetListCompany();

const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  const data = await companyStore.getListCompany({
    ...query.value,
    page,
  });
  listCompany.value = data.data as any[];
  meta.value = data.meta;
};

const handleSearch = async () => {
  const nameSearch = name.value.trim();
  query.value = { ...query.value, name: nameSearch };

  query.value.page = 1;
  await callGetListCompany();
};
</script>

<style scoped></style>
