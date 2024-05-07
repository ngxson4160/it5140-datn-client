<template>
  <el-upload
    v-model:file-list="fileList"
    :on-success="uploadImage"
    class="upload-image"
  >
    <el-button :type="type">{{ title }}</el-button>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadUserFile } from 'element-plus';

const uploadStore = useUploadStore();

const fileList = ref<UploadUserFile[]>([]);

const props = defineProps({
  dataUpload: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: 'Bấm vào để tải lên',
  },
  type: {
    type: String,
    default: 'primary',
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

  const { data } = await uploadStore.uploadImage(formData);
  // syncDataUpload.value = data as IFileInformation;

  emits('onSuccess', data.absolutePath);
  syncDataUpload.value = data.absolutePath;
};
</script>

<style>
.upload-image {
  .el-upload-list {
    @apply hidden;
  }
}
</style>
