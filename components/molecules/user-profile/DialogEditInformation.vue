<template>
  <el-dialog v-model="syncDialogVisible">
    <template #header>
      <p class="text-center font-bold text-xl">Thông tin cá nhân</p>
    </template>
    <el-form
      ref="ruleForm"
      label-position="top"
      :model="formData"
      :rules="rules"
    >
      <div class="grid grid-cols-2 gap-x-10 mt-4">
        <div class="col-span-1">
          <el-form-item label="Họ" prop="firstName" class="w-full" required>
            <el-input v-model="formData.firstName" size="large" />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item label="Tên" prop="lastName" class="w-full" required>
            <el-input v-model="formData.lastName" size="large" />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item
            label="Số điện thoại"
            prop="phoneNumber"
            class="w-full"
            required
          >
            <el-input v-model="formData.phoneNumber" size="large" />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item label="Ngày sinh" prop="dob" class="w-full" required>
            <el-date-picker
              v-model="formData.dob"
              class="!w-full"
              size="large"
            />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item label="Giới tính" prop="gender" class="w-full" required>
            <select-gender
              v-model="formData.gender"
              class="w-full"
              size="large"
            />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item
            label="Tình trạng hôn nhân"
            prop="maritalStatus"
            class="w-full"
            required
          >
            <select-marital-status
              v-model="formData.maritalStatus"
              class="w-full"
              size="large"
            />
          </el-form-item>
        </div>

        <div class="col-span-1">
          <el-form-item
            label="Tỉnh/Thành phố"
            prop="cityId"
            class="w-full"
            required
          >
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
          </el-form-item>
        </div>

        <div class="col-span-1">
          {{ formData.district }}
          <el-form-item
            label="Quận/Huyện"
            prop="districtId"
            class="w-full"
            required
          >
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
          </el-form-item>
        </div>
      </div>

      <div>
        <el-form-item label="Địa chỉ" prop="address" class="w-full" required>
          <el-input
            v-model="formData.address"
            class="mt-2 !h-10"
            size="large"
          />
        </el-form-item>
      </div>
    </el-form>

    <template #footer>
      <div class="flex justify-center">
        <el-button type="primary" @click="handleConfirm">Lưu</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { MESSAGE_VALIDATE } from '~/utils/constant/message-validate';

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

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  firstName: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  phoneNumber: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validatePhoneNumber,
      message: MESSAGE_VALIDATE.PHONE_NUMBER,
      trigger: 'change',
    },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  dob: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  maritalStatus: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  cityId: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  districtId: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  address: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
});

const handleConfirm = () => {
  if (!ruleForm.value) return;
  ruleForm.value.validate((valid) => {
    if (valid) {
      emits('onConfirm', formData.value);
      syncDialogVisible.value = false;
    }
  });
};

const useCity = useCityStore();
await useCity.getListCityAndDistrict();

const listDistrict = ref<Array<{ id: number; name: string }>>();
const handleChangeCity = () => {
  if (!formData.value.cityId) listDistrict.value = [];

  const city = useCity.listCities.find((el) => el.id === formData.value.cityId);

  formData.value.cityName = city?.name ?? '';
  listDistrict.value = city?.districts;

  formData.value.districtId = null;
};

const city = useCity.listCities.find((el) => el.id === formData.value.cityId);
formData.value.cityName = city?.name ?? '';
listDistrict.value = city?.districts;
</script>

<style scoped></style>
