<template>
  <el-dialog v-model="syncDialogVisible" center align-center>
    <template #header>
      <p class="text-base font-bold text-center">Lựa chọn hồ sơ ứng tuyển</p>
      <p>{{ title }}</p>
    </template>

    <p class="font-bold mb-2">Hồ sơ Job Nest:</p>
    <el-radio-group
      v-model="formData.candidateCv"
      class="custom-radio flex flex-col gap-y-2 !w-full mb-4"
    >
      <el-radio size="large" border class="!mx-0 !w-full !h-14">
        <div class="flex justify-between !w-full grow-1">
          <p>Nguyen Xuan Son</p>
          <p class="font-bold" @click="showCVPreviewSystem = true">Xem hồ sơ</p>
        </div>
      </el-radio>
    </el-radio-group>

    <p class="font-bold mb-2">Hồ sơ đính kèm:</p>
    <div v-if="!listCV.length" class="text-center">Chưa có hồ sơ đính kèm</div>
    <el-scrollbar v-else max-height="255px">
      <el-radio-group
        v-model="formData.candidateCv"
        class="custom-radio flex flex-col gap-y-2 !w-full"
      >
        <el-radio
          v-for="(cv, index) in listCV"
          :key="index"
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
        <p class="mt-6">Họ và tên</p>
        <el-input v-model="formData.candidateName" class="!w-full" />
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

  <dialog-preview-cv-attachment
    v-if="showCVPreviewAttachment"
    v-model:dialog-visible="showCVPreviewAttachment"
    :url="urlCVPreview"
  />

  <dialog-preview-cv-system
    v-if="showCVPreviewSystem"
    v-model:dialog-visible="showCVPreviewSystem"
    :data="dataCvSystem"
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

const userStore = useUserStore();
await userStore.getMyProfile();

const formData = ref({ ...props.data });
const dataCvSystem = ref();
const urlCVPreview = ref('');
const showCVPreviewSystem = ref(false);
const showCVPreviewAttachment = ref(false);
dataCvSystem.value = userStore.myProfile;

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});

const listCV = ref(formData.value.candidateCv);
// if (listCV.value.length) {
//   formData.value.candidateCv = listCV.value[0]?.url;
// }

const handleShowPreviewCV = (url: string) => {
  urlCVPreview.value = url;
  showCVPreviewAttachment.value = true;
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
