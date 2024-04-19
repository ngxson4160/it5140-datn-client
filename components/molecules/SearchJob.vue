<template>
  <div
    class="flex items-center justify-between rounded-lg h-[60px] bg-white min-w-[1000px] px-6"
  >
    <div class="flex items-center">
      <div class="flex">
        <img src="@/assets/images/search.svg" class="w-6 mr-2" />
        <el-input
          v-model="test"
          class="search-job-el-input h-[60px] !text-base"
          placeholder="Nhập từ khóa tìm kiếm"
        />
      </div>
      <div class="h-[60px] border-l-2 mx-4"></div>
      <div class="flex items-center bg-white">
        <img src="@/assets/images/location.svg" class="w-7 mr-1" />
        <select-city
          v-model="test1"
          class="search-job-select !text-base !w-[300px]"
        />
      </div>
      <div class="h-[60px] border-l-2 mx-4"></div>

      <div class="flex items-center bg-white">
        <img src="@/assets/images/category.svg" class="w-7 mr-1" />
        <select-job-category class="search-job-select !w-[335px]" />
      </div>
    </div>

    <el-button type="primary" class="!h-11">Tìm kiếm</el-button>
  </div>
</template>

<script setup lang="ts">
const test = ref('');
const test1 = ref('');
</script>

<style>
.search-job-el-input {
  .el-input__wrapper {
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
    &:focus-within {
      box-shadow: none;
    }
  }
}
</style>
