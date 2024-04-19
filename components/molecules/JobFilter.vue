<template>
  <div class="flex flex-col items-center mt-6">
    <div
      class="flex items-center justify-between rounded-lg h-[60px] bg-white w-[1050px] px-6 shadow-md"
    >
      <div class="flex items-center">
        <div class="flex">
          <img src="@/assets/images/search.svg" class="w-6 mr-2" />
          <el-input
            v-model="test"
            class="search-job-el-input h-[60px]"
            placeholder="Nhập từ khóa tìm kiếm"
          />
        </div>
        <div class="h-[60px] border-l-2 mx-4"></div>
        <div class="flex items-center bg-white">
          <select-city
            v-model="test1"
            class="job-filter-select !text-base !w-[270px]"
          />
        </div>
        <div class="h-[60px] border-l-2 mx-4"></div>

        <div class="flex items-center bg-white">
          <select-job-category class="job-filter-select !w-[315px]" />
        </div>
      </div>

      <el-button type="primary" class="!h-11">Tìm kiếm</el-button>
    </div>

    <div
      class="w-[1050px] mt-2 flex items-center border justify-center gap-x-2 rounded-lg h-[60px] bg-white px-6 shadow-md"
    >
      <!-- <div class="flex items-center"> -->
      <select-job-type class="job-filter-select !w-[220px]" />
      <select-job-salary class="job-filter-select !w-[220px]" />
      <select-job-experience class="job-filter-select !w-[220px]" />
      <select-job-level class="job-filter-select !w-[220px]" />
      <!-- </div> -->

      <el-button class="">Xóa bộ lọc</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const test = ref('');
const test1 = ref('');
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
    font-size: 24px !important;
  }
  .el-select__tags-text {
    font-size: 14px !important;
  }
}
</style>
