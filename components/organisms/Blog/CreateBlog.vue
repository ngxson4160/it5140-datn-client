<template>
  <div class="bg-[#f2f5f8] pb-20">
    <el-form
      ref="ruleForm"
      label-position="top"
      :model="formData"
      :rules="rules"
      class="w-[1200px]"
    >
      <div class="mx-auto bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-title-primary.svg" class="w-8 h-8" />
        <div>
          <el-form-item prop="title" class="w-full" required>
            <p class="font-bold text-xl mb-4">Tiêu đề blog</p>
            <el-input
              v-model="formData.title"
              class="!h-10 !w-[1000px] input-border-b-only"
              placeholder="Nhập tiêu đề blog"
            />
          </el-form-item>
        </div>
      </div>

      <div class="mt-4 mx-auto bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/image-primary.svg" class="w-8 h-8" />
        <div class="flex-1">
          <p class="font-bold text-xl mb-4 mt-[2px]">Ảnh</p>

          <div class="flex justify-center items-center">
            <div>
              <img
                v-if="!isEmptyObject(formData.image)"
                :key="formData.image"
                :src="formData.image"
                class="border rounded-lg w-[760px] h-[450px] object-contain"
              />

              <div
                v-else
                class="border rounded-lg w-[760px] h-[450px] object-contain bg-[#f2f5f8]"
              ></div>

              <div class="flex justify-end items-center">
                <el-form-item prop="image" class="w-ful text-center" required>
                  <up-load-image
                    v-model:data-upload="formData.image"
                    class="mt-2"
                    title="Chọn ảnh"
                    type="primary"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-text-primary.svg" class="w-8 h-8" />
        <div>
          <el-form-item prop="content" class="w-full" required>
            <p class="font-bold text-xl mb-4">Nội dung</p>
            <div class="grow-1">
              <content-editor
                v-model:model-value="formData.content"
                class="w-[1075px]"
                placeholder="Nhập nội dung blog"
                show-full
                min-height="550"
                max-height="1050"
              />
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="flex gap-x-6 justify-end mt-10">
        <!-- <el-button
          v-if="showButtonBack"
          class="!h-10"
          @click="router.push(`/company/blog/${formData.id}`)"
        > -->
        <el-button
          v-if="showButtonBack"
          class="!h-10 w-[200px]"
          @click="router.push(urlBack)"
        >
          Quay lại
        </el-button>
        <el-button
          type="primary"
          class="!h-10 w-[200px]"
          @click="handleSubmitCreateBlog"
        >
          {{ titleButtonSubmit }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  title: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  image: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  content: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateContent, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
});

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  titleButtonSubmit: {
    type: String,
    default: 'Tạo',
  },
  showButtonBack: {
    type: Boolean,
    default: false,
  },
  urlBack: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['onSubmit']);

const router = useRouter();

const formData = ref(props.data);

const handleSubmitCreateBlog = () => {
  if (!ruleForm.value) return;
  ruleForm.value.validate((valid) => {
    if (valid) {
      emits('onSubmit', formData.value);
    }
  });
};
</script>

<style class="scss"></style>
