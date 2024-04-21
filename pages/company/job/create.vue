<template>
  <header-guest />
  <div class="bg-[#f2f5f8] pt-4 pb-20">
    <div class="w-[1200px] mx-auto">
      <div class="mx-auto bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/edit-circle-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Tiêu đề tuyển dụng</p>
          <el-input
            v-model="text"
            class="!h-10 !w-[800px] input-border-b-only"
            placeholder="Nhập tiêu đề công việc"
          />
        </div>
      </div>

      <div class="mt-6 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/job-primary.svg" class="w-8 h-8" />
        <div>
          <p class="font-bold text-xl mb-4">Ngành nghề</p>

          <div class="flex gap-x-8">
            <div>
              <p class="text-sm mb-2">Nhóm ngành nghề</p>
              <select-job-category />
            </div>
            <div>
              <p class="text-sm mb-2">Ngành nghề hẹp</p>
              <select-job-category />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img
          src="@/assets/images/information-circle-primary.svg"
          class="w-8 h-8"
        />
        <div>
          <p class="font-bold text-xl mb-4">Thông tin chung</p>
          <el-input
            v-model="text"
            class="!h-10 !w-[800px] input-border-b-only"
            placeholder="Nhập tiêu đề công việc"
          />
        </div>
      </div>

      <div class="mt-6 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/paragraph-primary.svg" class="w-7 h-7" />
        <div>
          <p class="font-bold text-xl mb-4">Mô tả công việc</p>
          <div class="grow-1">
            <content-editor
              v-model:model-value="test"
              class="w-[1075px]"
              placeholder="Nhập nội dung mô tả công việc"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/paragraph-primary.svg" class="w-7 h-7" />
        <div>
          <p class="font-bold text-xl mb-4">Yêu cầu ứng viên</p>
          <content-editor
            v-model:model-value="test"
            class="w-[1075px]"
            placeholder="Nhập nội dung mô tả yêu cầu ứng viên"
          />
        </div>
      </div>

      <div class="mt-6 bg-white flex gap-x-4 px-4 py-6 rounded-lg">
        <img src="@/assets/images/paragraph-primary.svg" class="w-7 h-7" />
        <div>
          <p class="font-bold text-xl mb-4">Phúc lợi ứng viên</p>
          <content-editor
            v-model:model-value="test"
            class="w-[1075px]"
            placeholder="Nhập nội dung mô tả phúc lợi ứng viên"
          />
        </div>
      </div>

      <div class="flex justify-end mt-10">
        <el-button type="primary" class="!h-10">Đăng tin tuyển dụng</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const test = ref();
const text = ref();
</script>

<style scoped></style>
