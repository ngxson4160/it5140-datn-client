<template>
  <el-dialog v-model="syncDialogVisible" center align-center>
    <template #header>
      <p class="text-base font-bold text-center">Ứng tuyển vị trí</p>
      <p>{{ title }}</p>
    </template>

    <el-scrollbar max-height="255px">
      <el-radio-group
        v-model="formData.candidateCv"
        class="custom-radio flex flex-col gap-y-2 !w-full"
      >
        <el-radio
          v-for="(cv, index) in listCV"
          :key="index"
          value="abc1"
          :label="cv.url"
          size="large"
          border
          class="!mx-0 !w-full !h-14"
        >
          <div class="flex justify-between !w-full grow-1">
            <p>{{ cv.title }}</p>
            <p class="font-bold" @click="handleShowPreviewCV(cv.url)">
              Xem hồ sơ
            </p>
          </div>
        </el-radio>
      </el-radio-group>
    </el-scrollbar>

    <div class="flex mt-6 gap-x-10">
      <div class="w-full">
        <p class="mt-6">Họ</p>
        <el-input v-model="formData.candidateFirstName" class="!w-full" />
      </div>
      <div class="w-full">
        <p class="mt-6">Tên</p>
        <el-input v-model="formData.candidateLastName" class="!w-full" />
      </div>
    </div>

    <p class="mt-6">Email</p>
    <el-input v-model="formData.candidateEmail" />

    <p class="mt-6">Số điện thoại</p>
    <el-input v-model="formData.candidatePhoneNumber" />

    <template #footer>
      <el-button
        type="danger"
        class="w-[150px]"
        @click="syncDialogVisible = false"
      >
        Hủy
      </el-button>
      <el-button type="primary" class="w-[150px]" @click="handleConfirm">
        Ứng tuyển
      </el-button>
    </template>
  </el-dialog>

  <dialog-preview-cv
    v-model:dialog-visible="showCVPreview"
    :url="urlCVPreview"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['update:dialogVisible', 'onConfirm']);

const formData = ref({ ...props.data });
const urlCVPreview = ref('');
const showCVPreview = ref(false);

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});

const listCV = ref(formData.value.candidateCv);
formData.value.candidateCv = listCV.value[0].url;

const handleShowPreviewCV = (url: string) => {
  urlCVPreview.value = url;
  showCVPreview.value = true;
};

const handleConfirm = () => {
  emits('onConfirm', formData.value);
  syncDialogVisible.value = false;
};
</script>

<style lang="scss">
.custom-radio {
  .el-radio__label {
    @apply w-full;
  }
}
</style>
