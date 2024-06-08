<template>
  <div class="h-[160px] bg-[#007c32b8] flex items-center justify-center">
    <job-filter
      class="mx-auto"
      :init-filter="initFilter"
      @job-mode="handleChangeJobMode"
      @salary="handleChangeSalary"
      @year-experience="handleChangeYearExperience"
      @level="handleChangeLevel"
      @search="handleSearch"
      @delete-filter="handleDeleteFilter"
    />
  </div>

  <div class="w-[1050px] mx-auto">
    <div v-if="listJob.length === 0" class="text-center mt-6">
      Không tìm thấy kết quả phù hợp
    </div>
    <div v-else>
      <div class="flex flex-col items-center mt-2">
        <card-job-full
          v-for="(job, index) in listJob"
          :key="index"
          class="mt-1 w-full"
          :data="job"
        />
      </div>
      <div class="w-full flex justify-center mt-4 pb-16">
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
</template>

<script setup lang="ts">
import type { IGetListJobParams, IJob } from '~/types/job';

const jobStore = useJobStore();

const { query: queryUrl } = useRoute();

const currentPage = ref<number>(1);
const query = ref<IGetListJobParams>({ ...queryUrl });

const convertStringToArray = (string: any) => {
  if (typeof string === 'string') {
    const arr = string.split(',');
    return arr.map((el) => +el);
  }
};
const initFilter = {
  filter: queryUrl?.filter,
  cityIds: queryUrl?.cityIds ? convertStringToArray(queryUrl?.cityIds) : [],
  jobCategoryIds: queryUrl?.jobCategoryIds
    ? convertStringToArray(queryUrl?.jobCategoryIds)
    : [],
};
const listJob = ref<IJob[]>([]);
const meta = ref<any>({});

const setCurrentPage = async (page: number) => {
  window.scrollTo({ top: 0 });

  currentPage.value = page;
  const data = await jobStore.getListJob({
    ...query.value,
    page,
  });
  listJob.value = data.data as IJob[];
  meta.value = data.meta;
};

query.value.limit = 15;

const data = await jobStore.getListJob({
  ...query.value,
});

listJob.value = data.data as Array<IJob>;
meta.value = data.meta;

const handleChangeJobMode = async (jobMode: any) => {
  query.value.jobMode = jobMode;
  query.value.page = 1;

  await callGetListJob();
};

const handleChangeSalary = async (salary: any) => {
  if (salary) {
    query.value.salaryMin = salary.salaryMin;
    query.value.salaryMax = salary.salaryMax;
  } else {
    delete query.value.salaryMin;
    delete query.value.salaryMax;
  }

  query.value.page = 1;
  await callGetListJob();
};

const handleChangeYearExperience = async (yearExperience: any) => {
  // if (yearExperience) {
  //   query.value.yearExperienceMin = yearExperience.yearExperienceMin;
  //   query.value.yearExperienceMax = yearExperience.yearExperienceMax;
  // } else {
  //   delete query.value.yearExperienceMin;
  //   delete query.value.yearExperienceMax;
  // }

  if (yearExperience || yearExperience === 0) {
    query.value.yearExperience = yearExperience;
  } else {
    delete query.value.yearExperience;
  }

  query.value.page = 1;
  await callGetListJob();
};

const handleChangeLevel = async (level: any) => {
  query.value.level = level;

  query.value.page = 1;
  await callGetListJob();
};

const handleSearch = async (data: any) => {
  query.value = { ...query.value, ...data };

  query.value.page = 1;
  await callGetListJob();
};

const callGetListJob = async () => {
  const data = await jobStore.getListJob({
    ...query.value,
  });
  listJob.value = data.data as IJob[];
  meta.value = data.meta;
};

const handleDeleteFilter = () => {};
</script>

<style scoped></style>
