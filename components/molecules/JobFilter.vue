<template>
  <div
    class="w-[1220px] mt-6 flex items-center border justify-between rounded-lg h-[60px] bg-white px-6 shadow-md"
  >
    <div class="flex items-center">
      <select-city
        v-model="test1"
        class="job-filter-select !text-base !w-[300px]"
      />
      <select-job-category class="job-filter-select !ml-4 !w-[315px]" />
      <select-job-type class="job-filter-select !ml-4 !w-[200px]" />
      <select-job-level class="job-filter-select !ml-4 !w-[200px]" />
    </div>

    <el-button type="primary" class="!h-11">Áp dụng</el-button>
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
