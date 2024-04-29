<template>
  <div class="bg-[#f2f5f8] rounded-sm p-6">
    <div class="flex items-center">
      <img src="@/assets/images/location-gray.svg" class="w-5" />
      <p class="ml-2 mr-6 text-sm">Khu vực {{ indexRegion }}:</p>
      <el-select
        v-model="data.cityId"
        class="w-[300px]"
        @change="handleChangeCity"
      >
        <el-option
          v-for="item in useCity.listCities"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          {{ item.name }}
        </el-option>
      </el-select>
    </div>

    <p class="mt-10 mb-2 text-sm">Địa chỉ</p>
    <div
      v-for="(address, index) in data.address"
      :key="index"
      class="flex mb-2 gap-6 w-[750px]"
    >
      <el-select v-model="address.districtName">
        <el-option
          v-for="item in listDistrict"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
          {{ item.name }}
        </el-option>
      </el-select>
      <el-input v-model="address.data" />
      <img
        src="@/assets/images/multiply-circle-danger.svg"
        class="w-8 cursor-pointer"
        @click="removeAddress(index)"
      />
    </div>
    <span
      class="text-primary text-sm font-bold mt-6 cursor-pointer"
      @click="addAddress"
    >
      + Thêm địa chỉ
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  indexRegion: {
    type: Number,
    default: 1,
  },
});

export interface IJobRegion {
  cityId: number | null;
  cityName: string;
  address: Array<{
    districtId: number | null;
    districtName: string;
    data: string;
  }>;
}

const useCity = useCityStore();
await useCity.getListCityAndDistrict();

const data = ref<IJobRegion>({
  cityId: null,
  cityName: '',
  address: [
    {
      districtId: null,
      districtName: '',
      data: '',
    },
  ],
});
const listDistrict = ref<Array<{ id: number; name: string }>>();

const addAddress = () => {
  data.value.address.push({
    districtId: null,
    districtName: '',
    data: '',
  });
};

const removeAddress = (index: number) => {
  if (data.value.address.length === 1) return;
  data.value.address.splice(index, 1);
};

const emits = defineEmits(['update:value']);

watch(
  () => [data.value.cityId, data.value.address],
  () => {
    emits('update:value', data.value);
  },
);

const handleChangeCity = () => {
  if (!data.value.cityId) listDistrict.value = [];

  const city = useCity.listCities.find((el) => el.id === data.value.cityId);
  data.value.cityName = city?.name ?? '';
  listDistrict.value = city?.districts;
};
</script>

<style scoped></style>
