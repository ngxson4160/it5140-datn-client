<template>
  <el-upload
    v-model:file-list="fileList"
    :on-success="uploadImage"
    class="upload-image"
    :before-upload="beforeAvatarUpload"
  >
    <el-button :type="type">{{ title }}</el-button>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus';

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

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const fileType = rawFile.type;
  if (!allowedTypes.includes(fileType)) {
    useNotificationError({
      title: 'Ảnh tải lên phải ở định dạng jpg/png/webp!',
    });
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    useNotificationError({ title: 'Kích thước ảnh không được vượt quá 5MB!' });
    return false;
  }
  return true;
};
</script>

<style>
.upload-image {
  .el-upload-list {
    @apply hidden;
  }
}
</style>
