<template>
  <div class="bg-white h-full mr-4 p-4 shadow-md rounded-md">
    <div class="flex gap-x-4 justify-between items-center">
      <p>Bộ lọc</p>
      <el-input size="large" style="width: 500px" />
      <el-select size="large" style="width: 390px" />
      <el-select size="large" style="width: 375px" />
      <el-button size="large" type="warning" class="w-[121px]">
        Tìm kiếm
      </el-button>
    </div>

    <div class="flex justify-end mt-4">
      <el-button
        size="large"
        type="primary"
        :icon="Plus"
        @click="navigateTo('/company/job/create')"
      >
        Tạo mới
      </el-button>
    </div>

    <div class="mt-10">
      <el-table
        :data="listJobs"
        style=""
        class="!text-black relative"
        :class="test ? 'custom-table-sort-up' : 'custom-table-sort-down'"
        stripe
        @sort-change="onHeaderClick"
      >
        <el-table-column>
          <template #header><p>Tiêu đề</p></template>
          <template #default="scoped">
            <p>{{ scoped.row.title }}</p>
          </template>
        </el-table-column>
        <el-table-column width="200" sortable>
          <template #header><p>Ngày đăng</p></template>
          <template #default="scoped">
            <p>{{ formatDateShort(scoped.row.createdAt) }}</p>
          </template>
        </el-table-column>
        <el-table-column width="200">
          <template #header><p>Thời hạn nộp</p></template>
          <template #default="scoped">
            <p>{{ formatDateShort(scoped.row.hiringEndDate) }}</p>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template #header><p>Lượt xem</p></template>
          <template #default="scoped">
            <p>{{ scoped.row.totalViews }}</p>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template #header><p>Lượt nộp</p></template>
          <template #default="scoped">
            <p>{{ scoped.row.totalCandidate }}</p>
          </template>
        </el-table-column>
        <el-table-column width="135">
          <template #header><p>Trạng thái</p></template>
          <template #default="scoped">
            <p>{{ scoped.row.status }}</p>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template #header><p>Hành động</p></template>
          <template #default="scoped">
            <p>{{ scoped.row.status }}</p>
          </template>
        </el-table-column>
        <div><Plus /></div>
      </el-table>
    </div>

    <div class="w-full flex justify-end mt-8 mb-16">
      <el-pagination
        :current-page="currentPage"
        :page-size="meta.pagination.pageSize"
        :total="meta.pagination.totalPage * meta.pagination.pageSize"
        :pager-count="9"
        layout="prev, pager, next"
        background
        @current-change="setCurrentPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import type { IJob } from '~/types/job';
import type { IGetListJobApplication } from '~/types/user';

definePageMeta({
  layout: 'company-dashboard',
});

const test = ref(false);
const onHeaderClick = () => {
  test.value = !test.value;
  console.log('run onHeaderClick');
};

const currentPage = ref<number>(1);
const query = ref<IGetListJobApplication>({});
const listJobs = ref<IJob[]>([]);
const meta = ref<any>({});

query.value.limit = 5;

const companyStore = useCompanyStore();
const data = await companyStore.getListJobs({
  ...query.value,
});
listJobs.value = data.data;
meta.value = data.meta;

const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  const data = await companyStore.getListJobs({
    ...query.value,
    page,
  });
  listJobs.value = data.data as IJob[];
  meta.value = data.meta;
};
</script>

<style lang="scss">
.custom-table-sort-up {
  tr th:nth-of-type(2) {
    position: relative;

    .caret-wrapper {
      display: none;
    }
  }

  tr th:nth-of-type(2)::after {
    content: url('@/assets/images/sort-up-black.svg');
    position: absolute;
    top: 60%;
    transform: translateY(-50%);
    left: 100px;
  }
}

.custom-table-sort-down {
  tr th:nth-of-type(2) {
    position: relative;

    .caret-wrapper {
      display: none;
    }
  }

  tr th:nth-of-type(2)::after {
    content: url('@/assets/images/sort-down-black.svg');
    position: absolute;
    top: 60%;
    transform: translateY(-50%);
    left: 100px;
  }
}

.el-table__header {
  th {
    @apply text-black text-[15px];
  }
}
</style>
