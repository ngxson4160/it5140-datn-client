<template>
  <div class="flex flex-col items-center">
    <div
      class="flex items-center justify-between rounded-lg h-[60px] bg-white w-[1050px] px-6 shadow-md"
    >
      <div class="flex items-center">
        <div class="flex">
          <img src="@/assets/images/search.svg" class="w-6 mr-2" />
          <el-input
            v-model="filterData.filter"
            class="search-job-el-input h-[60px]"
            placeholder="Nhập từ khóa tìm kiếm"
          />
        </div>
        <div class="h-[60px] border-l-2 mx-4"></div>
        <div class="flex items-center bg-white">
          <select-city
            v-model="filterData.cityIds"
            class="job-filter-select !text-base !w-[270px]"
          />
        </div>
        <div class="h-[60px] border-l-2 mx-4"></div>

        <div class="flex items-center bg-white">
          <select-job-category
            v-model="filterData.jobCategoryIds"
            class="job-filter-select !w-[315px]"
          />
        </div>
      </div>

      <el-button type="primary" class="!h-11 !w-[110px]" @click="emitSearch">
        Tìm kiếm
      </el-button>
    </div>

    <div
      class="w-[1050px] mt-2 flex items-center border justify-center gap-x-2 rounded-lg h-[60px] bg-white px-6 shadow-md"
    >
      <select-job-mode
        v-model="filterData.jobMode"
        class="job-filter-select !w-[250px]"
      />
      <select-job-salary
        v-model:value="filterData.salary"
        class="job-filter-select !w-[250px]"
      />
      <select-job-experience
        v-model:value="filterData.yearExperience"
        class="job-filter-select !w-[250px]"
      />
      <select-job-level
        v-model="filterData.level"
        class="job-filter-select !w-[250px]"
      />

      <!-- <el-button @click="onDeleteFilter">Xóa bộ lọc</el-button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { EJobLevel, EJobMode } from '~/types/job';

export interface IFilterJob {
  filter: string;
  cityIds: number[];
  jobCategoryIds: number[];
  jobMode: EJobMode | null;
  level: EJobLevel | null;
  salary: {
    salaryMin: number | null;
    salaryMax: number | null;
  };
  // yearExperience: {
  //   yearExperienceMin: number | null;
  //   yearExperienceMax: number | null;
  // };
  yearExperience: number | null;
}

const initFilterJob = {
  filter: '',
  cityIds: [] as number[],
  jobCategoryIds: [] as number[],
  jobMode: null,
  level: null,
  salary: {
    salaryMin: null,
    salaryMax: null,
  },
  // yearExperience: {
  //   yearExperienceMin: null,
  //   yearExperienceMax: null,
  // },
  yearExperience: null,
};

const filterData = ref<IFilterJob>({
  filter: '',
  cityIds: [] as number[],
  jobCategoryIds: [] as number[],
  jobMode: null,
  level: null,
  salary: {
    salaryMin: null,
    salaryMax: null,
  },
  // yearExperience: {
  //   yearExperienceMin: null,
  //   yearExperienceMax: null,
  // },
  yearExperience: null,
});

const props = defineProps({
  initFilter: {
    type: Object as PropType<{
      filter: string;
      cityIds: number[];
      jobCategoryIds: number[];
    }>,
    default: () => ({
      filter: '',
      cityIds: [] as number[],
      jobCategoryIds: [] as number[],
    }),
  },
});

filterData.value.filter = props.initFilter?.filter;
filterData.value.cityIds = props.initFilter?.cityIds;
filterData.value.jobCategoryIds = props.initFilter?.jobCategoryIds;

const emits = defineEmits([
  'search',
  'jobMode',
  'level',
  'salary',
  'yearExperience',
  'deleteFilter',
]);

watch(
  () => filterData.value.jobMode,
  (newVal) => {
    emits('jobMode', newVal);
  },
);

watch(
  () => filterData.value.level,
  (newVal) => {
    emits('level', newVal);
  },
);

watch(
  () => filterData.value.salary,
  (newVal) => {
    emits('salary', newVal);
  },
);

watch(
  () => filterData.value.yearExperience,
  (newVal) => {
    emits('yearExperience', newVal);
  },
);

const emitSearch = () => {
  const data = {
    filter: filterData.value.filter,
    cityIds: filterData.value.cityIds.join(','),
    jobCategoryIds: filterData.value.jobCategoryIds.join(','),
  };
  emits('search', data);
};

// const onDeleteFilter = () => {
//   emits('deleteFilter');
// };
</script>

<style lang="scss">
.job-filter-select {
  .el-input__inner {
    font-size: 14;
  }
  span {
    font-size: 14 !important;
  }
  .el-select__icon {
    font-size: 16px !important;
  }
  .el-select__tags-text {
    font-size: 14px !important;
  }
}
</style>
