<template>
  <div class="bg-white mr-4 px-4 pt-4 pb-10 shadow-md rounded-md">
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
              class="cursor-pointer underline text-blue line-clamp-1"
              @click="router.push(`/company/job/${scoped.row.id}`)"
            >
              {{ scoped.row.title }}
            </p>
          </template>
        </el-table-column>
        <el-table-column width="220">
          <template #header>
            <div class="flex cursor-pointer" @click="onOrderHiringStartDate">
              <p class="mr-2">Ngày đăng</p>
              <img
                v-if="query.sortHiringStartDate === EOrderPaging.DESC"
                class="w-[22px]"
                src="@/assets/images/sort-up-black.svg"
              />
              <img
                v-else-if="query.sortHiringStartDate === EOrderPaging.ASC"
                class="w-[22px]"
                src="@/assets/images/sort-down-black.svg"
              />
              <img
                v-else
                class="w-[24px]"
                src="@/assets/images/sort-up-down-black.svg"
              />
            </div>
          </template>
          <template #default="scoped">
            <p>{{ formatDateFull(scoped.row.hiringStartDate) }}</p>
          </template>
        </el-table-column>
        <el-table-column width="210">
          <template #header>
            <div class="flex cursor-pointer" @click="onOrderHiringEndDate">
              <p class="mr-2">Thời gian nộp</p>
              <img
                v-if="query.sortHiringEndDate === EOrderPaging.DESC"
                class="w-[22px]"
                src="@/assets/images/sort-up-black.svg"
              />
              <img
                v-else-if="query.sortHiringEndDate === EOrderPaging.ASC"
                class="w-[22px]"
                src="@/assets/images/sort-down-black.svg"
              />
              <img
                v-else
                class="w-[24px]"
                src="@/assets/images/sort-up-down-black.svg"
              />
            </div>
          </template>
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
                        new Date(scoped.row.hiringEndDate) < new Date()
                      "
                      @click="handleEndJobEarly(scoped.row.id)"
                    >
                      <div class="flex">
                        <img
                          v-if="new Date(scoped.row.hiringEndDate) < new Date()"
                          src="@/assets/images/time-gray.svg"
                          class="w-5 mr-2"
                        />
                        <img
                          v-else
                          src="@/assets/images/time-black.svg"
                          class="w-5 mr-2"
                        />
                        <p>Kết thúc sớm</p>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item
                      :disabled="
                        new Date(scoped.row.hiringEndDate) >= new Date()
                      "
                      @click="handleConfirmReopen(scoped.row.id)"
                    >
                      <div class="flex">
                        <img
                          v-if="
                            new Date(scoped.row.hiringEndDate) >= new Date()
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

    <div class="w-full flex justify-end mt-8">
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
    :auto-close-dialog="false"
    @on-confirm="handleReopenJob"
  >
    <el-form
      ref="ruleForm"
      label-position="top"
      :model="formReopen"
      :rules="rules"
    >
      <el-form-item prop="jobHiringEndDateChose" required>
        <el-date-picker
          v-model="formReopen.jobHiringEndDateChose"
          type="date"
          placeholder="Chọn này kết thúc"
          :disabled-date="handleDisableDate"
        />
      </el-form-item>
    </el-form>
  </dialog-confirm-action>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { IJob } from '~/types/job';
import type { IGetListJob } from '~/types/company';
import { CJobType } from '~/utils/constant/job';

definePageMeta({
  layout: 'company-dashboard',
  // middleware: ['redirect'],
  roles: [ERole.COMPANY],
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
// const jobHiringEndDateChose = ref();
const formReopen = ref({
  jobHiringEndDateChose: '',
});

const currentPage = ref<number>(1);
const query = ref<IGetListJob>({ sortHiringStartDate: EOrderPaging.DESC });
const filterTitle = ref<string>();
const listJobs = ref<IJob[]>([]);
const meta = ref<any>({});

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  jobHiringEndDateChose: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
  ],
});

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

const onOrderHiringStartDate = async () => {
  if (
    query.value.sortHiringStartDate === EOrderPaging.ASC ||
    !query.value.sortHiringStartDate
  ) {
    query.value.sortHiringStartDate = EOrderPaging.DESC;
  } else {
    query.value.sortHiringStartDate = EOrderPaging.ASC;
  }

  delete query.value.sortHiringEndDate;
  const data = await companyStore.getListJobs({
    ...query.value,
    page: 1,
  });
  currentPage.value = 1;
  listJobs.value = data.data as IJob[];
  meta.value = data.meta;
};

const onOrderHiringEndDate = async () => {
  if (
    query.value.sortHiringEndDate === EOrderPaging.ASC ||
    !query.value.sortHiringEndDate
  ) {
    query.value.sortHiringEndDate = EOrderPaging.DESC;
  } else {
    query.value.sortHiringEndDate = EOrderPaging.ASC;
  }

  delete query.value.sortHiringStartDate;
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
const handleReopenJob = () => {
  if (!ruleForm.value) return;
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      const id = jobIdChose.value;
      const now = new Date().toISOString();
      await jobStore.reopen(id, {
        hiringStartDate: now,
        hiringEndDate: formReopen.value.jobHiringEndDateChose,
      });
      const jobUpdate = listJobs.value.find((el) => el.id === id);
      if (jobUpdate) {
        jobUpdate.hiringStartDate = now;
        jobUpdate.hiringEndDate = formReopen.value.jobHiringEndDateChose;
      }
      formReopen.value.jobHiringEndDateChose = '';
      showReopenJob.value = false;
    }
  });
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
