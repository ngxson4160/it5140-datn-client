<template>
  <div class="bg-[#f2f5f8] rounded-sm p-6">
    <div class="flex items-center">
      <img src="@/assets/images/location-gray.svg" class="w-5" />
      <p class="ml-2 mr-6 text-sm">Khu vực {{ indexRegion }}:</p>
      <el-select
        v-model="syncValue.cityId"
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
      v-for="(address, index) in syncValue.address"
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
      class="text-green text-sm font-bold mt-6 cursor-pointer"
      @click="addAddress"
    >
      + Thêm địa chỉ
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  indexRegion: {
    type: Number,
    default: 1,
  },
  value: {
    type: Object as PropType<IJobRegion>,
    default: () => ({
      cityId: null,
      cityName: '',
      address: [
        {
          districtId: null,
          districtName: '',
          data: '',
        },
      ],
    }),
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

const emits = defineEmits(['update:value']);

const syncValue = computed({
  get: () => props.value,
  set: (value: IJobRegion) => {
    return emits('update:value', value);
  },
});

const listDistrict = ref<Array<{ id: number; name: string }>>();

const addAddress = () => {
  syncValue.value.address.push({
    districtId: null,
    districtName: '',
    data: '',
  });
};

const removeAddress = (index: number) => {
  if (syncValue.value.address.length === 1) return;
  syncValue.value.address.splice(index, 1);
};

const handleChangeCity = () => {
  if (!syncValue.value.cityId) listDistrict.value = [];

  const city = useCity.listCities.find(
    (el) => el.id === syncValue.value.cityId,
  );
  syncValue.value.cityName = city?.name ?? '';
  listDistrict.value = city?.districts;
};
</script>

<style scoped></style>
