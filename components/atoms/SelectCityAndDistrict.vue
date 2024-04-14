<template>
  <el-cascader
    v-model="value"
    class="!h-11 !w-[450px]"
    :options="options"
    :props="props"
    size="large"
    placeholder="Chọn quận huyện"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
const value = ref([]);

const props = {
  expandTrigger: 'hover' as const,
};

const handleChange = (value: any) => {
  //   console.log(value);
};

const listCityAndDistrict = ref<any>({});
const { data } = await useBaseFetch('cities/districts');
listCityAndDistrict.value = data;

const options = listCityAndDistrict.value.map((city: any) => {
  const listDistrict = city.districts.map((district: any) => ({
    value: district.name,
    label: district.name,
  }));

  return {
    value: city.name,
    label: city.name,
    children: listDistrict,
  };
});
</script>

<style scoped></style>
