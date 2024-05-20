<template>
  <div class="bg-white h-full mr-4 p-4 shadow-md rounded-md">
    <p class="font-bold text-xl mb-10 pb-2 border-b">Hồ sơ đã ứng tuyển</p>

    <div class="flex gap-x-4 mb-4">
      <el-input
        v-model:model-value="filterName"
        placeholder="Nhập tên ứng viên"
        class="!w-[875px]"
      />
      <el-button type="primary" size="large" @click="handleSearch">
        Tìm kiếm
      </el-button>
    </div>
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
      <el-select
        v-model:model-value="query.classify"
        size="large"
        style="width: 275px"
        placeholder="Tất cả trạng thái phân nhóm"
        clearable
      >
        <el-option
          v-for="(el, index) in CApplicationClassify"
          :key="index"
          :value="el.value"
          :label="el.name"
        />
      </el-select>
      <!-- <el-button size="large" type="primary" :icon="Filter">
        Bộ lọc nâng cao
      </el-button> -->
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
              {{ `${scoped.row.candidateName}` }}
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column>
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
        </el-table-column> -->
        <el-table-column>
          <template #header>
            <p>Công việc ứng tuyển</p>
          </template>
          <template #default="scoped">
            <p class="truncate">
              {{ scoped.row.job.title }}
            </p>
          </template>
        </el-table-column>
        <el-table-column width="200">
          <template #header>
            <div class="flex cursor-pointer" @click="onOrderInterviewSchedule">
              <p class="mr-2">Lịch hẹn</p>
              <img
                v-if="query.sortInterviewSchedule === EOrderPaging.DESC"
                class="w-[22px]"
                src="@/assets/images/sort-up-black.svg"
              />
              <img
                v-else-if="query.sortInterviewSchedule === EOrderPaging.ASC"
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
            <p v-if="scoped.row.interviewSchedule">
              {{ formatDateFull(scoped.row.interviewSchedule) }}
            </p>
            <p v-else class="text-grey">Chưa có</p>
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
                v-else-if="query.sortCreatedAt === EOrderPaging.ASC"
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
            <p>{{ formatDateFull(scoped.row.createdAt) }}</p>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template #header>
            <p>Hồ sơ</p>
          </template>
          <template #default="scoped">
            <div class="flex" @click="handleShowPreviewCV(scoped.row)">
              <img
                v-if="scoped.row.candidateCv"
                src="@/assets/images/pdf-danger.svg"
                class="w-3 cursor-pointer"
              />
              <img
                v-else
                src="@/assets/images/pdf-blue.svg"
                class="w-3 cursor-pointer"
              />
              <p
                v-if="scoped.row.candidateCv"
                class="cursor-pointer font-bold ml-2"
              >
                Đính kèm
              </p>
              <p v-else class="cursor-pointer font-bold ml-2">Job Nest</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template #header>
            <p>Phân nhóm</p>
          </template>
          <template #default="scoped">
            <el-select
              v-model:model-value="scoped.row.classify"
              placeholder="Chọn nhóm"
              @change="
                onChangeClassify(
                  scoped.row.jobId,
                  scoped.row.id,
                  scoped.row.classify,
                )
              "
            >
              <el-option
                v-for="(el, index) in CApplicationClassify"
                :key="index"
                :value="el.value"
                :label="el.name"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="170">
          <template #header>
            <p>Trạng thái</p>
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
                      @click="
                        handleConfirmEditInterviewSchedule(
                          scoped.row.jobId,
                          scoped.row.id,
                          scoped.row.interviewSchedule,
                        )
                      "
                    >
                      <div class="flex">
                        <img
                          src="@/assets/images/time-black.svg"
                          class="w-5 mr-2"
                        />
                        <p>Thêm/Sửa lịch hẹn</p>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div class="flex">
                        <img
                          src="@/assets/images/message-black.svg"
                          class="w-5 mr-2"
                        />
                        <p>Nhắn tin</p>
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

    <dialog-preview-cv-system
      v-if="showCVPreviewSystem"
      v-model:dialog-visible="showCVPreviewSystem"
      :data="dataCvSystem"
    />

    <dialog-edit-text
      v-if="showRemark"
      v-model:dialog-visible="showRemark"
      v-model:value="textRemark"
      draggable
      @on-confirm="onChangeCompanyRemark"
    />

    <dialog-confirm-action
      v-model:dialog-visible="showEditInterviewSchedule"
      title="Chọn ngày kết thúc"
      @on-confirm="handleEditInterviewSchedule"
    >
      <el-date-picker
        v-model="interviewScheduleDateChose"
        type="datetime"
        placeholder="Chọn này kết thúc"
        format="DD-MM-YYYY HH:mm"
      />
    </dialog-confirm-action>
  </div>
</template>

<script setup lang="ts">
import type { ICandidate, IGetListCandidate } from '~/types/company';
import {
  CApplicationClassify,
  CApplicationStatus,
} from '~/utils/constant/common';
import type { EApplicationStatus } from '#imports';
import type { IJob } from '~/types/job';
import type { EApplicationClassify } from '~/utils/enum';

definePageMeta({
  layout: 'company-dashboard',
  middleware: ['redirect'],
});

const { query: urlQuery } = useRoute();
const router = useRouter();

const currentPage = ref<number>(1);
const query = ref<IGetListCandidate>({
  sortCreatedAt: EOrderPaging.DESC,
});
const filterName = ref<string>();
const listCandidates = ref<ICandidate[]>([]);
const meta = ref<any>({});
const listJobs = ref<IJob[]>([]);

const dataCvSystem = ref();
const urlCVPreview = ref('');
const showCVPreviewSystem = ref(false);
const showCVPreview = ref(false);
const showEditInterviewSchedule = ref(false);
const interviewScheduleDateChose = ref();

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
  if (
    query.value.sortCreatedAt === EOrderPaging.ASC ||
    !query.value.sortCreatedAt
  ) {
    query.value.sortCreatedAt = EOrderPaging.DESC;
  } else {
    query.value.sortCreatedAt = EOrderPaging.ASC;
  }

  delete query.value.sortInterviewSchedule;
  await getListCandidate({
    ...query.value,
    page: 1,
  });
  currentPage.value = 1;
};

const onOrderInterviewSchedule = async () => {
  if (
    query.value.sortInterviewSchedule === EOrderPaging.ASC ||
    !query.value.sortInterviewSchedule
  ) {
    query.value.sortInterviewSchedule = EOrderPaging.DESC;
  } else {
    query.value.sortInterviewSchedule = EOrderPaging.ASC;
  }

  delete query.value.sortCreatedAt;
  await getListCandidate({
    ...query.value,
    page: 1,
  });
  currentPage.value = 1;
};

const handleShowPreviewCV = (data: any) => {
  const candidateCv = data?.candidateCv;
  if (candidateCv) {
    urlCVPreview.value = candidateCv;
    showCVPreview.value = true;
  } else {
    showCVPreviewSystem.value = true;
    dataCvSystem.value = data;
  }
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

const handleSearch = async () => {
  query.value.name = filterName.value;
  await getListCandidate({
    ...query.value,
    page: 1,
  });
  currentPage.value = 1;
};

const onChangeStatusRecruitment = async (
  jobId: number,
  applicationId: number,
  status: EApplicationStatus,
) => {
  await companyStore.updateJobApplication(jobId, applicationId, { status });
};

const onChangeClassify = async (
  jobId: number,
  applicationId: number,
  classify: EApplicationClassify,
) => {
  await companyStore.updateJobApplication(jobId, applicationId, { classify });
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

const handleConfirmEditInterviewSchedule = (
  jobId: number,
  applicationId: number,
  interviewSchedule: string,
) => {
  showEditInterviewSchedule.value = true;
  jobIdClicked.value = jobId;
  applicationIdClick.value = applicationId;
  interviewScheduleDateChose.value = interviewSchedule;
};

const handleEditInterviewSchedule = async () => {
  await companyStore.updateJobApplication(
    jobIdClicked.value,
    applicationIdClick.value,
    { interviewSchedule: interviewScheduleDateChose.value },
  );
  const candidateUpdated = listCandidates.value.find(
    (el) => el.id === applicationIdClick.value,
  );
  if (candidateUpdated) {
    candidateUpdated.interviewSchedule = interviewScheduleDateChose.value;
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
  () => query.value.classify,
  async (newVal) => {
    if (newVal === '') {
      delete query.value.classify;
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
