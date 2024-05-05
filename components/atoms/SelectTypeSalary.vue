<template>
  <div class="flex items-center justify-between w-[800px]">
    <div>
      <p class="text-sm text-gray mb-1">Chọn kiểu</p>
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
        <p class="text-sm text-gray mb-1">Từ</p>
        <el-input v-model="syncValue.salaryMin" />
      </div>
      <span v-if="type === ETypeSalary.FROM_TO" class="mx-8 pt-7">-</span>
      <div v-if="type === ETypeSalary.TO || type === ETypeSalary.FROM_TO">
        <p class="text-sm text-gray mb-1">Lên tới</p>
        <el-input v-model="syncValue.salaryMax" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

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

if (props.value.salaryMin && !props.value.salaryMax) {
  type.value = ETypeSalary.FROM;
} else if (!props.value.salaryMin && props.value.salaryMax) {
  type.value = ETypeSalary.TO;
} else if (props.value.salaryMax && props.value.salaryMax) {
  type.value = ETypeSalary.FROM_TO;
} else {
  type.value = ETypeSalary.DEAL;
}

const emits = defineEmits(['update:value']);

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
</script>

<style scoped></style>
