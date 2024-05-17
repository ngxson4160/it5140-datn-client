<template>
  <div class="bg-white h-full mr-4 p-4 shadow-md rounded-md">
    <p class="font-bold text-xl mb-10 pb-2 border-b">Hồ sơ đã ứng tuyển</p>

    <div class="flex gap-x-4 items-center">
      <p class="text-[15px]">Bộ lọc:</p>
      <el-select
        v-model:model-value="query.jobId"
        size="large"
        style="width: 350px"
        placeholder="Tất cả công việc tuyển dụng"
        clearable
      >
        <el-option
          v-for="(el, index) in listJobs"
          :key="index"
          :value="el.id"
          :label="el.title"
        />
      </el-select>
      <el-select
        v-model:model-value="query.status"
        size="large"
        style="width: 275px"
        placeholder="Tất cả trạng thái tuyển dụng"
        clearable
      >
        <el-option
          v-for="(el, index) in CApplicationStatus"
          :key="index"
          :value="el.value"
          :label="el.name"
        />
      </el-select>
      <el-button size="large" type="primary" :icon="Filter">
        Bộ lọc nâng cao
      </el-button>
    </div>

    <div class="flex justify-end mt-4"></div>

    <div class="mt-10">
      <el-table
        :data="listCandidates"
        style=""
        class="!text-black relative"
        stripe
        row-class-name="custom-row-table"
      >
        <el-table-column>
          <template #header>
            <p>Tên ứng viên</p>
          </template>
          <template #default="scoped">
            <p>
              {{
                `${scoped.row.candidateFirstName} ${scoped.row.candidateLastName}`
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <p>Thông tin liên hệ</p>
          </template>
          <template #default="scoped">
            <div class="flex">
              <img src="@/assets/images/mail-primary.svg" class="mr-2 w-5" />
              <p>{{ scoped.row.candidateEmail }}</p>
            </div>
            <div class="flex">
              <img src="@/assets/images/phone-primary.svg" class="mr-2 w-5" />
              <p>{{ scoped.row.candidatePhoneNumber }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <p>Công việc ứng tuyển</p>
          </template>
          <template #default="scoped">
            {{ scoped.row.job.title }}
          </template>
        </el-table-column>
        <el-table-column width="200">
          <template #header>
            <div class="flex cursor-pointer" @click="onOrderCreated">
              <p class="mr-2">Thời gian nộp</p>
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
        <el-table-column width="175">
          <template #header>
            <p>Hồ sơ</p>
          </template>
          <template #default="scoped">
            <div
              class="flex"
              @click="handleShowPreviewCV(scoped.row.candidateCv)"
            >
              <img src="@/assets/images/pdf-danger.svg" />
              <p class="cursor-pointer font-bold ml-2">Hồ sơ đính kèm</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="205">
          <template #header>
            <p>Trạng thái tuyển dụng</p>
          </template>
          <template #default="scoped">
            <el-select
              v-model:model-value="scoped.row.status"
              @change="
                onChangeStatusRecruitment(
                  scoped.row.jobId,
                  scoped.row.id,
                  scoped.row.status,
                )
              "
            >
              <el-option
                v-for="(el, index) in CApplicationStatus"
                :key="index"
                :value="el.value"
                :label="el.name"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="85">
          <template #header>
            <p>Ghi chú</p>
          </template>
          <template #default="scoped">
            <div
              class="flex justify-center cursor-pointer"
              @click="
                handleShowRemark(
                  scoped.row.jobId,
                  scoped.row.id,
                  scoped.row.companyRemark,
                )
              "
            >
              <img src="@/assets/images/write-primary.svg " class="w-6" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="w-full flex justify-end mt-8 mb-16">
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

    <dialog-preview-cv-attachment
      v-if="showCVPreview"
      v-model:dialog-visible="showCVPreview"
      :url="urlCVPreview"
    />

    <dialog-edit-text
      v-if="showRemark"
      v-model:dialog-visible="showRemark"
      v-model:value="textRemark"
      draggable
      @on-confirm="onChangeCompanyRemark"
    />
  </div>
</template>

<script setup lang="ts">
import { Filter } from '@element-plus/icons-vue';
import type { ICandidate, IGetListCandidate } from '~/types/company';
import { CJobLevel } from '~/utils/constant/job';
import { CApplicationStatus } from '~/utils/constant/common';
import type { EApplicationStatus } from '#imports';
import type { IJob } from '~/types/job';

definePageMeta({
  layout: 'company-dashboard',
});

const { query: urlQuery } = useRoute();
const router = useRouter();

const currentPage = ref<number>(1);
const query = ref<IGetListCandidate>({ sortCreatedAt: EOrderPaging.DESC });
const listCandidates = ref<ICandidate[]>([]);
const meta = ref<any>({});
const listJobs = ref<IJob[]>([]);

const urlCVPreview = ref('');
const showCVPreview = ref(false);

const showRemark = ref(false);
const textRemark = ref('');
const jobIdClicked = ref<number>(0);
const applicationIdClick = ref<number>(0);

query.value.limit = 5;

const companyStore = useCompanyStore();

const dataListJob = await companyStore.getListJobs();
listJobs.value = dataListJob.data as IJob[];

if (urlQuery.jobId) {
  const jobId = +urlQuery.jobId;
  if (!listJobs.value.find((el) => el.id === jobId)) router.push('/404');
  query.value.jobId = +urlQuery.jobId;
}

const getListCandidate = async (query: IGetListCandidate) => {
  const data = await companyStore.getListCandidate({
    ...query,
  });
  listCandidates.value = data.data as ICandidate[];
  meta.value = data.meta;
};

await getListCandidate({
  ...query.value,
});

const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  await getListCandidate({
    ...query.value,
    page,
  });
};

const onOrderCreated = async () => {
  if (query.value.sortCreatedAt === EOrderPaging.ASC) {
    query.value.sortCreatedAt = EOrderPaging.DESC;
  } else {
    query.value.sortCreatedAt = EOrderPaging.ASC;
  }

  await getListCandidate({
    ...query.value,
    page: 1,
  });
  currentPage.value = 1;
};

const handleShowPreviewCV = (url: string) => {
  urlCVPreview.value = url;
  showCVPreview.value = true;
};

const handleShowRemark = (
  jobId: number,
  applicationId: number,
  value: string,
) => {
  jobIdClicked.value = jobId;
  applicationIdClick.value = applicationId;
  textRemark.value = value;
  showRemark.value = true;
};

const onChangeStatusRecruitment = async (
  jobId: number,
  applicationId: number,
  status: EApplicationStatus,
) => {
  await companyStore.updateJobApplication(jobId, applicationId, { status });
};

const onChangeCompanyRemark = async () => {
  await companyStore.updateJobApplication(
    jobIdClicked.value,
    applicationIdClick.value,
    { companyRemark: textRemark.value },
  );

  const candidate = listCandidates.value.find(
    (el) => el.jobId === jobIdClicked.value,
  );

  if (candidate) {
    candidate.companyRemark = textRemark.value;
  }
};

watch(
  () => query.value.status,
  async (newVal) => {
    if (newVal === '') {
      delete query.value.status;
    }
    await getListCandidate({
      ...query.value,
      page: 1,
    });
    currentPage.value = 1;
  },
);

watch(
  () => query.value.jobId,
  async (newVal) => {
    if (!newVal) {
      delete query.value.jobId;
    }

    await getListCandidate({
      ...query.value,
      page: 1,
    });
    currentPage.value = 1;
  },
);
</script>

<style lang="scss">
.custom-row-table {
  @apply h-16 #{!important};
}
</style>
