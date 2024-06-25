<template>
  <!-- <div class="flex items-center justify-between w-[800px]"> -->
  <el-form
    ref="ruleForm"
    label-position="top"
    :model="syncValue"
    :rules="rules"
    class="flex items-center justify-between w-[800px]"
  >
    <div>
      <p class="text-sm mb-1">Chọn kiểu</p>
      <el-select v-model="type" @change="changeSalaryType">
        <el-option
          v-for="(item, index) in ETypeSalary"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div class="flex justify-between">
      <div v-if="type === ETypeSalary.FROM || type === ETypeSalary.FROM_TO">
        <el-form-item label="Từ" prop="salaryMin" class="w-full" required>
          <el-input v-model="syncValue.salaryMin" />
        </el-form-item>
      </div>
      <span v-if="type === ETypeSalary.FROM_TO" class="mx-8 pt-7">-</span>
      <div v-if="type === ETypeSalary.TO || type === ETypeSalary.FROM_TO">
        <el-form-item label="Lên tới" prop="salaryMax" class="w-full" required>
          <el-input v-model="syncValue.salaryMax" />
        </el-form-item>
      </div>
    </div>
  </el-form>
  <!-- </div> -->
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { PropType } from 'vue';
import { MESSAGE_VALIDATE } from '~/utils/constant/message-validate';

enum ETypeSalary {
  FROM = 'Từ',
  TO = 'Lên tới',
  FROM_TO = 'Khoảng',
  DEAL = 'Thương lượng',
}

const props = defineProps({
  value: {
    type: Object as PropType<{
      salaryMin: number | null;
      salaryMax: number | null;
    }>,
    default: () => ({
      salaryMin: null,
      salaryMax: null,
    }),
  },
});
const type = ref();

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  salaryMin: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateSalary,
      message: MESSAGE_VALIDATE.DESIRED_SALARY,
      trigger: 'blur',
    },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  salaryMax: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateSalary,
      message: MESSAGE_VALIDATE.DESIRED_SALARY,
      trigger: 'blur',
    },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
});

if (props.value.salaryMin && !props.value.salaryMax) {
  type.value = ETypeSalary.FROM;
} else if (!props.value.salaryMin && props.value.salaryMax) {
  type.value = ETypeSalary.TO;
} else if (props.value.salaryMax && props.value.salaryMax) {
  type.value = ETypeSalary.FROM_TO;
} else {
  type.value = ETypeSalary.DEAL;
}

const emits = defineEmits(['update:value', 'ruleForm']);

const syncValue = computed({
  get: () => props.value,
  set: (value: { salaryMin: number | null; salaryMax: number | null }) => {
    return emits('update:value', value);
  },
});

const changeSalaryType = () => {
  syncValue.value = {
    salaryMin: null,
    salaryMax: null,
  };
};

onMounted(() => {
  emits('ruleForm', ruleForm.value);
});
</script>

<style scoped></style>
