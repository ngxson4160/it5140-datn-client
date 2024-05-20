<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">Thông tin cá nhân</p>
    </template>

    <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
      <div class="col-span-1">
        <p class="mb-2">Họ</p>
        <el-input v-model="formData.firstName" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Tên</p>
        <el-input v-model="formData.lastName" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Số điện thoại</p>
        <el-input v-model="formData.phoneNumber" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Ngày sinh</p>
        <el-date-picker v-model="formData.dob" class="!w-full" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Giới tính</p>
        <select-gender v-model="formData.gender" class="w-full" size="medium" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Tình trạng hôn nhân</p>
        <select-marital-status
          v-model="formData.maritalStatus"
          class="w-full"
          size="medium"
        />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Tỉnh/Thành phố</p>
        <el-select
          v-model="formData.cityId"
          size="large"
          placeholder="Chọn thành phố"
          class="w-full"
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

      <div class="col-span-1">
        <p class="mb-2">Quận/Huyện</p>
        <el-select
          v-model="formData.districtId"
          size="large"
          placeholder="Chọn quận/huyện"
          class="w-full"
        >
          <el-option
            v-for="item in listDistrict"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            {{ item.name }}
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="mt-4">
      <p>Địa chỉ</p>
      <el-input v-model="formData.address" class="mt-2 !h-10" />
    </div>

    <template #footer>
      <div class="flex justify-center">
        <el-button type="primary" @click="handleConfirm">Lưu</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['update:dialogVisible', 'onConfirm']);

const formData = ref(props.data);

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});

const handleConfirm = () => {
  emits('onConfirm', formData.value);
  syncDialogVisible.value = false;
};

const useCity = useCityStore();
await useCity.getListCityAndDistrict();

const listDistrict = ref<Array<{ id: number; name: string }>>();
const handleChangeCity = () => {
  if (!formData.value.cityId) listDistrict.value = [];
  const city = useCity.listCities.find((el) => el.id === formData.value.cityId);
  formData.value.cityName = city?.name ?? '';
  listDistrict.value = city?.districts;
};
handleChangeCity();
</script>

<style scoped></style>
