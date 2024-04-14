<template>
  <el-select
    v-model="value"
    placeholder="Chọn tỉnh/thành phố"
    size="large"
    class="!h-11 !w-[240px]"
  >
    <el-option
      v-for="item in listCity"
      :key="item.id"
      :label="item.name"
      :value="item.name"
    />
  </el-select>
</template>

<script setup lang="ts">
const value = ref('');

const listCity = ref<any>({});
const { data } = await useBaseFetch('cities');
listCity.value = data;
</script>

<style scoped></style>
