<template>
  <div class="bg-white h-full mr-4 p-4 shadow-md rounded-md">
    <p class="font-bold text-xl mb-6 pb-2 border-b">Tìm kiếm ứng viên</p>

    <div class="grid grid-cols-9 gap-x-4">
      <el-input
        v-model:model-value="filterData.filter"
        class="col-span-5"
        placeholder="Nhập từ khóa"
        size="large"
      />
      <select-city
        v-model="filterData.cityId"
        class="col-span-2"
        :is-multiple="false"
      />
      <el-button
        class="col-span-1"
        type="primary"
        size="large"
        @click="onSubmit"
      >
        Tìm kiếm
      </el-button>
    </div>

    <div class="grid grid-cols-7 mt-10 w-full gap-x-6">
      <div class="col-span-2">
        <div class="flex justify-between items-center">
          <p class="font-bold text-lg">Bộ lọc nâng cao</p>
          <div class="text-sm">Xóa bộ lọc</div>
        </div>

        <p class="text-sm mt-6 mb-1">Ngành nghề</p>
        <div class="w-full">
          <select-job-category
            v-model="filterData.desiredJobCategoryIds"
            class="!w-full"
            clearable
          />
        </div>
        <p class="text-sm mt-6 mb-1">Số năm kinh nghiệm</p>
        <div class="w-full">
          <select-job-experience
            v-model:value="filterData.yearExperience"
            class="!w-full"
          />
        </div>

        <p class="text-sm mt-6 mb-1">Cấp bậc</p>
        <div class="w-full">
          <select-job-level
            v-model="filterData.desiredJobLevel"
            class="!w-full"
          />
        </div>

        <p class="text-sm mt-6 mb-1">Giới tính</p>
        <div class="w-full">
          <select-gender v-model="filterData.gender" class="!w-full" />
        </div>

        <p class="text-sm mt-6 mb-1">Hình thức</p>
        <div class="w-full">
          <select-job-mode
            v-model="filterData.desiredJobMode"
            class="!w-full"
          />
        </div>

        <p class="text-sm mt-6 mb-1">Học vấn</p>
        <div class="w-full">
          <select-education-level
            v-model="filterData.educationalLevel"
            class="!w-full"
          />
        </div>

        <p class="text-sm mt-6 mb-1">Tình trạng hôn nhân</p>
        <div class="w-full">
          <select-marital-status
            v-model="filterData.maritalStatus"
            class="!w-full"
          />
        </div>
      </div>
      <div class="col-span-5">
        <p class="font-bold text-lg mb-6">
          Kết quả tìm thấy
          <span class="text-danger">
            {{ `${meta?.pagination?.totalItem} hồ sơ` }}
          </span>
        </p>
        <card-candidate
          v-for="el in listCandidate"
          :key="el.id"
          class="mb-4"
          :data="el"
          @on-view-cv="handleShowPreviewCV"
        />
        <p v-if="!meta?.pagination?.totalItem" class="text-center mt-2">
          Không tìm thấy ứng viên phù hợp
        </p>

        <div v-else class="w-full flex justify-end mt-4 mb-16">
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
    </div>
  </div>

  <dialog-preview-cv-attachment
    v-if="showCVPreviewAttachment"
    v-model:dialog-visible="showCVPreviewAttachment"
    :url="urlCVPreview"
  />

  <dialog-preview-cv-system
    v-if="showCVPreviewSystem"
    v-model:dialog-visible="showCVPreviewSystem"
    :data="dataCvSystem"
  />
</template>

<script setup lang="ts">
import type { EEducationLevel, EGender, EMaritalStatus } from '#imports';
import type { EJobLevel, EJobMode } from '~/types/job';
import { EPublicCVType } from '~/utils/enum';

definePageMeta({
  layout: 'company-dashboard',
  roles: [ERole.COMPANY],
});

export interface IFilterCandidate {
  filter: string;
  cityId: number | null;
  yearExperience: {
    yearExperienceMin: number | null;
    yearExperienceMax: number | null;
  };
  desiredJobCategoryIds: number[];
  gender: EGender | null;
  jobMode: EJobMode | null;
  desiredJobLevel: EJobLevel | null;
  desiredJobMode: EJobMode | null;
  maritalStatus: EMaritalStatus | null;
  educationalLevel: EEducationLevel | null;
}

const filterData = ref<IFilterCandidate>({
  filter: '',
  cityId: null,
  yearExperience: {
    yearExperienceMin: null,
    yearExperienceMax: null,
  },
  desiredJobCategoryIds: [] as number[],
  gender: null,
  jobMode: null,
  desiredJobLevel: null,
  desiredJobMode: null,
  maritalStatus: null,
  educationalLevel: null,
});

const companyStore = useCompanyStore();

const dataCvSystem = ref();
const urlCVPreview = ref('');
const showCVPreviewSystem = ref(false);
const showCVPreviewAttachment = ref(false);
const currentPage = ref<number>(1);
const query = ref<any>({});
const listCandidate = ref<any[]>([]);
const meta = ref<any>({});

const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  const data = await companyStore.searchCandidate({
    ...query.value,
    page,
  });
  listCandidate.value = data.data as any[];
  meta.value = data.meta;
};

query.value.limit = 15;

const data = await companyStore.searchCandidate({
  ...query.value,
});
listCandidate.value = data.data as Array<any>;
meta.value = data.meta;

const onSubmit = async () => {
  delete query.value.filter;
  delete query.value.cityId;
  const data = {
    filter: filterData.value.filter,
    cityId: filterData.value?.cityId ? filterData.value?.cityId : undefined,
  };
  query.value = { ...query.value, ...data };
  await callGetListCandidate();
};

watch(
  () => filterData.value.desiredJobCategoryIds,
  async (newVal) => {
    query.value.desiredJobCategoryIds = newVal.join(',');
    await callGetListCandidate();
  },
);

watch(
  () => filterData.value.desiredJobLevel,
  async (newVal) => {
    if (typeof newVal === 'string') {
      delete query.value.desiredJobLevel;
    } else {
      query.value.desiredJobLevel = newVal;
    }
    await callGetListCandidate();
  },
);

watch(
  () => filterData.value.gender,
  async (newVal) => {
    if (typeof newVal === 'string') {
      delete query.value.gender;
    } else {
      query.value.gender = newVal;
    }
    await callGetListCandidate();
  },
);

watch(
  () => filterData.value.desiredJobMode,
  async (newVal) => {
    if (typeof newVal === 'string') {
      delete query.value.desiredJobMode;
    } else {
      query.value.desiredJobMode = newVal;
    }
    await callGetListCandidate();
  },
);

watch(
  () => filterData.value.educationalLevel,
  async (newVal) => {
    if (typeof newVal === 'string') {
      delete query.value.educationalLevel;
    } else {
      query.value.educationalLevel = newVal;
    }
    await callGetListCandidate();
  },
);

watch(
  () => filterData.value.maritalStatus,
  async (newVal) => {
    if (typeof newVal === 'string') {
      delete query.value.maritalStatus;
    } else {
      query.value.maritalStatus = newVal;
    }
    await callGetListCandidate();
  },
);

watch(
  () => filterData.value.yearExperience,
  async (newVal) => {
    query.value.yearExperienceMin = newVal?.yearExperienceMin ?? undefined;
    query.value.yearExperienceMax = newVal?.yearExperienceMax ?? undefined;
    await callGetListCandidate();
  },
);

const callGetListCandidate = async () => {
  query.value.page = 1;
  currentPage.value = 1;
  const data = await companyStore.searchCandidate({
    ...query.value,
  });
  listCandidate.value = data.data as any[];
  meta.value = data.meta;
};

const handleShowPreviewCV = (data: any) => {
  const typeCV = data?.candidateInformation?.publicCVType;
  if (typeCV === EPublicCVType.ATTACHMENT_CV) {
    urlCVPreview.value = `${data?.candidateInformation?.publicAttachmentCV}`;
    showCVPreviewAttachment.value = true;
  } else if (typeCV === EPublicCVType.SYSTEM_CV) {
    showCVPreviewSystem.value = true;
    dataCvSystem.value = data;
  }
};
</script>

<style scoped></style>
