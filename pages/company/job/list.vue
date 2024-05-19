<template>
  <div class="bg-white h-full mr-4 p-4 shadow-md rounded-md">
    <p class="font-bold text-xl mb-10 pb-2 border-b">Công việc tuyển dụng</p>

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
        @click="navigateTo('/company/job/create')"
      >
        Tạo mới
      </el-button>
    </div>
    <div class="flex gap-x-4 items-center w-[875px]">
      <p class="text-sm">Bộ lọc:</p>
      <el-select
        v-model:model-value="query.type"
        size="large"
        style="width: 350px"
        placeholder="Trạng thái tuyển dụng"
        clearable
      >
        <el-option
          v-for="(el, index) in CJobType"
          :key="index"
          :value="el.value"
          :label="el.name"
        />
      </el-select>
      <!-- <el-select
        size="large"
        style="width: 350px"
        placeholder="Trạng thái phê duyệt"
        clearable
      /> -->
    </div>

    <div class="flex justify-end mt-4"></div>

    <div class="mt-10">
      <el-table
        :data="listJobs"
        style=""
        class="!text-black relative"
        stripe
        row-class-name="custom-row-table"
      >
        <el-table-column>
          <template #header><p>Tiêu đề</p></template>
          <template #default="scoped">
            <p
              class="cursor-pointer underline text-blue"
              @click="router.push(`/company/job/${scoped.row.id}`)"
            >
              {{ scoped.row.title }}
            </p>
          </template>
        </el-table-column>
        <el-table-column width="220">
          <template #header>
            <div class="flex cursor-pointer" @click="onOrderCreated">
              <p class="mr-2">Ngày đăng</p>
              <img
                v-if="query.sortCreatedAt === EOrderPaging.DESC"
                class="w-[22px]"
                src="@/assets/images/sort-up-black.svg"
              />
              <img
                v-else
                class="w-[22px]"
                src="@/assets/images/sort-down-black.svg"
              />
            </div>
          </template>
          <template #default="scoped">
            <p>{{ formatDateFull(scoped.row.createdAt) }}</p>
          </template>
        </el-table-column>
        <el-table-column width="210">
          <template #header><p>Thời hạn nộp</p></template>
          <template #default="scoped">
            <p>{{ formatDateFull(scoped.row.hiringEndDate) }}</p>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template #header><p class="text-center">Lượt xem</p></template>
          <template #default="scoped">
            <p class="text-center">{{ scoped.row.totalViews }}</p>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template #header><p class="text-center">Lượt nộp</p></template>
          <template #default="scoped">
            <p
              class="cursor-pointer underline text-blue text-center"
              @click="
                router.push({
                  path: '/company/candidate/list',
                  query: { jobId: scoped.row.id },
                })
              "
            >
              {{ scoped.row.totalCandidate }}
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column width="135">
          <template #header><p class="text-center">Trạng thái</p></template>
          <template #default="scoped">
            <p class="text-center">{{ scoped.row.status }}</p>
          </template>
        </el-table-column> -->
        <el-table-column width="120">
          <template #header><p class="text-center">Hành động</p></template>
          <template #default="scoped">
            <!-- <p>{{ scoped.row.status }}</p> -->

            <!-- <div class="flex justify-center">
              <img
                src="@/assets/images/option-black.svg"
                class="w-7 cursor-pointer"
              />
            </div> -->
            <div class="flex justify-center">
              <el-dropdown trigger="click">
                <img
                  src="@/assets/images/option-black.svg"
                  class="w-7 cursor-pointer"
                />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      :disabled="
                        scoped.row.hiringEndDate <= new Date().toISOString()
                      "
                      @click="handleEndJobEarly(scoped.row.id)"
                    >
                      <div class="flex">
                        <img
                          v-if="
                            scoped.row.hiringEndDate > new Date().toISOString()
                          "
                          src="@/assets/images/time-black.svg"
                          class="w-5 mr-2"
                        />
                        <p>Kết thúc sớm</p>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item
                      :disabled="
                        scoped.row.hiringEndDate > new Date().toISOString()
                      "
                      @click="handleConfirmReopen(scoped.row.id)"
                    >
                      <div class="flex">
                        <img
                          v-if="
                            scoped.row.hiringEndDate > new Date().toISOString()
                          "
                          src="@/assets/images/reopen-gray.svg"
                          class="w-5 mr-2"
                        />
                        <img
                          v-else
                          src="@/assets/images/reopen-black.svg"
                          class="w-5 mr-2"
                        />
                        <p>Tuyển lại</p>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click="
                        router.push({
                          path: `/company/job/${scoped.row.id}/edit`,
                        })
                      "
                    >
                      <div class="flex">
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
                      <div class="flex">
                        <img
                          src="@/assets/images/bin-danger.svg"
                          class="w-5 mr-2"
                        />
                        <p class="text-danger">Xóa</p>
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

  <dialog-confirm-action
    v-model:dialog-visible="showConfirmDelete"
    @on-confirm="handleDeleteJob"
  >
    <p>
      Xác nhận xóa bài đăng
      <span class="font-bold">{{ `"${jobTitleChose}"` }}</span>
    </p>
    <p>
      Nếu thực hiện hành động này thì thông tin của những ứng viên đã ứng tuyển
      công việc này sẽ mất đi
    </p>
  </dialog-confirm-action>

  <dialog-confirm-action
    v-model:dialog-visible="showReopenJob"
    title="Chọn ngày kết thúc"
    @on-confirm="handleReopenJob"
  >
    <el-date-picker
      v-model="jobHiringEndDateChose"
      type="date"
      placeholder="Chọn này kết thúc"
      :disabled-date="handleDisableDate"
    />
  </dialog-confirm-action>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import type { IJob } from '~/types/job';
import type { IGetListJob } from '~/types/company';
import { CJobType } from '~/utils/constant/job';

definePageMeta({
  layout: 'company-dashboard',
});

const handleDisableDate = (data: any) => {
  const now = new Date();
  return data.getTime() < now.getTime();
};

const router = useRouter();
const showConfirmDelete = ref(false);
const showReopenJob = ref(false);
const jobIdChose = ref();
const jobTitleChose = ref();
const jobHiringEndDateChose = ref();

const currentPage = ref<number>(1);
const query = ref<IGetListJob>({ sortCreatedAt: EOrderPaging.DESC });
const filterTitle = ref<string>();
const listJobs = ref<IJob[]>([]);
const meta = ref<any>({});

query.value.limit = 5;

const companyStore = useCompanyStore();
const jobStore = useJobStore();
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

const onSearchJob = async () => {
  query.value.title = filterTitle.value;
  const data = await companyStore.getListJobs({
    ...query.value,
    page: 1,
  });
  currentPage.value = 1;
  listJobs.value = data.data as IJob[];
  meta.value = data.meta;
};

const onOrderCreated = async () => {
  if (query.value.sortCreatedAt === EOrderPaging.ASC) {
    query.value.sortCreatedAt = EOrderPaging.DESC;
  } else {
    query.value.sortCreatedAt = EOrderPaging.ASC;
  }
  const data = await companyStore.getListJobs({
    ...query.value,
    page: 1,
  });
  currentPage.value = 1;
  listJobs.value = data.data as IJob[];
  meta.value = data.meta;
};

const handleEndJobEarly = async (id: number) => {
  const now = new Date();
  await jobStore.update(id, { hiringEndDate: now.toISOString() });
  const jobUpdate = listJobs.value.find((el) => el.id === id);
  if (jobUpdate) {
    jobUpdate.hiringEndDate = now.toISOString();
  }
};

const handleConfirmDelete = (id: number, title: string) => {
  showConfirmDelete.value = true;
  jobIdChose.value = id;
  jobTitleChose.value = title;
};
const handleDeleteJob = async () => {
  const id = jobIdChose.value;
  await jobStore.deleteJob(id);
  listJobs.value = listJobs.value.filter((el) => el.id !== id);
};

const handleConfirmReopen = (id: number) => {
  showReopenJob.value = true;
  jobIdChose.value = id;
};
const handleReopenJob = async () => {
  const id = jobIdChose.value;
  await jobStore.update(id, {
    hiringEndDate: jobHiringEndDateChose.value,
  });
  const jobUpdate = listJobs.value.find((el) => el.id === id);
  if (jobUpdate) {
    jobUpdate.hiringEndDate = jobHiringEndDateChose.value;
  }
  jobHiringEndDateChose.value = null;
};

watch(
  () => query.value.type,
  async (newVal) => {
    const data = await companyStore.getListJobs({
      ...query.value,
      page: 1,
    });
    currentPage.value = 1;
    listJobs.value = data.data as IJob[];
    meta.value = data.meta;
  },
);
</script>

<style lang="scss">
.custom-row-table {
  @apply h-16 #{!important};
}
</style>
