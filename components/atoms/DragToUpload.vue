<template>
  <el-upload
    v-model:file-list="fileList"
    class="w-full upload-pdf"
    :drag="true"
    :on-success="uploadImage"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Thả file vào đây hoặc
      <em>bấm vào để tải lên</em>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import type { UploadUserFile } from 'element-plus';
import { type IFileInformation } from '@/stores/upload';

const uploadStore = useUploadStore();

const fileList = ref<UploadUserFile[]>([]);

const props = defineProps({
  dataUpload: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(['update:dataUpload', 'onSuccess']);
const syncDataUpload = computed({
  get: () => props.dataUpload,
  set: (value: object) => {
    return emits('update:dataUpload', value);
  },
});

const uploadImage = async () => {
  syncDataUpload.value = {};
  const formData = new FormData();
  const file: any = fileList.value[fileList.value.length - 1].raw;
  formData.append('file', file);

  const { data } = await uploadStore.uploadPdf(formData);
  syncDataUpload.value = data as IFileInformation;

  emits('onSuccess', data);
};
</script>

<style>
.upload-pdf {
  .el-upload-list {
    @apply hidden;
  }
}
</style>
