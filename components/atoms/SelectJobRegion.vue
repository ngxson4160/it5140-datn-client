<template>
  <div class="bg-[#f2f5f8] rounded-sm p-6">
    <div class="flex items-center justify-between">
      <el-form
        ref="ruleForm"
        :model="syncValue"
        :rules="rules"
        label-width="auto"
      >
        <!-- <img src="@/assets/images/location-gray.svg" class="w-5" /> -->
        <el-form-item
          :label="`Khu vực ${indexRegion}:`"
          prop="cityId"
          required
          class="!flex !items-center"
        >
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
        </el-form-item>
      </el-form>
      <img
        v-if="showRemoveRegion"
        src="@/assets/images/multiply-circle-danger.svg"
        class="w-8 cursor-pointer"
        @click="handleRemoveRegion"
      />
    </div>

    <p class="mt-10 mb-2 text-sm">Địa chỉ</p>
    <div
      v-for="(address, index) in syncValue.address"
      :key="index"
      class="flex mb-2 gap-6 w-[1025px]"
    >
      <el-select v-model="address.districtName" class="w-[350px]">
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
      <div class="w-8">
        <img
          v-if="syncValue.address.length > 1"
          src="@/assets/images/multiply-circle-danger.svg"
          class="w-8 cursor-pointer"
          @click="removeAddress(index)"
        />
      </div>
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
import type { FormInstance, FormRules } from 'element-plus';
import type { PropType } from 'vue';

const props = defineProps({
  indexRegion: {
    type: Number,
    default: 1,
  },
  showRemoveRegion: {
    type: Boolean,
    default: false,
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

const emits = defineEmits(['update:value', 'ruleForm', 'removeRegion']);

const syncValue = computed({
  get: () => props.value,
  set: (value: IJobRegion) => {
    return emits('update:value', value);
  },
});

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  cityId: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
});

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

  syncValue.value.address = [
    {
      districtId: null,
      districtName: '',
      data: '',
    },
  ];
};

const listDistrict = ref<Array<{ id: number; name: string }>>();
if (!syncValue.value.cityId) listDistrict.value = [];
const city = useCity.listCities.find((el) => el.id === syncValue.value.cityId);
syncValue.value.cityName = city?.name ?? '';
listDistrict.value = city?.districts;

const handleRemoveRegion = () => {
  emits('removeRegion');
};

onMounted(() => {
  emits('ruleForm', ruleForm.value);
});
</script>

<style scoped></style>
