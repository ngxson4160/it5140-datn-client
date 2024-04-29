<template>
  <dialog-form
    :dialog-visible="isShowEditInformationGeneral"
    title="Thông tin cá nhân"
  >
    <div>
      <p>Họ và tên</p>
      <el-input class="mt-2 !h-10" />
    </div>

    <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
      <div class="col-span-1">
        <p class="mb-2">Số điện thoại</p>
        <el-input />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Ngày sinh</p>
        <el-date-picker class="!w-full" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Giới tính</p>
        <el-select class="w-full" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Tình trạng hôn nhân</p>
        <el-select class="w-full" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Tỉnh/Thành phố</p>
        <el-select class="w-full" />
      </div>

      <div class="col-span-1">
        <p class="mb-2">Quận/Huyện</p>
        <el-select class="w-full" />
      </div>
    </div>
    <div>
      <p>Địa chỉ</p>
      <el-input class="mt-2 !h-10" />
    </div>
  </dialog-form>
</template>

<script setup lang="ts"></script>

<style scoped></style>
