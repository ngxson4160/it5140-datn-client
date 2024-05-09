<template>
  <div class="bg-white shadow-sm p-4 w-[850px]">
    <p class="font-bold text-xl mb-10 pb-2 border-b">Thông tin tài khoản</p>

    <div class="flex justify-center">
      <div>
        <img
          v-if="!isEmptyObject(syncData.avatar)"
          :src="syncData.avatar"
          class="w-[135px] h-[135px] rounded-full object-contain border p-[3px] bg-white mb-2"
        />
        <div
          v-else
          class="w-[150px] h-[150px] flex items-center justify-center border p-[3px] bg-white rounded-md"
        >
          <loading-custom />
        </div>
        <up-load-image
          v-model:data-upload="syncData.avatar"
          class="mt-1"
          title="Thay đổi avatar"
          type="default"
          @on-success="onUpdateAvatar"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-x-4 mt-4">
      <div>
        <p class="mt-4 mb-2 text-sm">Họ</p>
        <el-input v-model="syncData.firstName" size="large" />
      </div>
      <div>
        <p class="mt-4 mb-2 text-sm">Tên</p>
        <el-input v-model="syncData.lastName" size="large" />
      </div>
    </div>

    <p class="mt-4 mb-2 text-sm">Email</p>
    <el-input v-model="syncData.email" size="large" disabled />

    <p class="mt-4 mb-2 text-sm">Mật khẩu</p>
    <el-input v-model="passwordFake" size="large" disabled type="password" />
    <div class="flex justify-end mt-2 cursor-pointer">
      <p
        class="text-green text-sm hover:text-[#8ed7ab]"
        @click="syncShowDialogChangePassword = true"
      >
        Thay đổi mật khẩu
      </p>
    </div>

    <div class="flex justify-end mt-10">
      <el-button type="primary" size="large" @click="handleSave">Lưu</el-button>
    </div>

    <el-dialog v-model="syncShowDialogChangePassword" center align-center>
      <template #header>
        <p class="text-base font-bold text-center">Thay đổi mật khẩu</p>
      </template>

      <p class="mt-4 mb-2 text-sm">Mật khẩu hiện tại</p>
      <el-input
        v-model="newPass.currentPassword"
        size="large"
        type="password"
      />

      <p class="mt-4 mb-2 text-sm">Mật khẩu mới</p>
      <el-input v-model="newPass.password" size="large" type="password" />

      <p class="mt-4 mb-2 text-sm">Nhập lại mật khẩu mới</p>
      <el-input
        v-model="newPass.confirmPassword"
        size="large"
        type="password"
      />

      <template #footer>
        <el-button
          type="danger"
          class="w-[150px]"
          @click="syncShowDialogChangePassword = false"
        >
          Hủy
        </el-button>
        <el-button
          type="primary"
          class="w-[150px]"
          @click="handleUpdatePassword"
        >
          Thay đổi
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  showDialogChangePassword: {
    type: Boolean,
    required: true,
  },
});

const passwordFake = ref('1234567890987654321');

const newPass = ref({
  currentPassword: '',
  password: '',
  confirmPassword: '',
});

const emits = defineEmits([
  'update:data',
  'onUpdatePassword',
  'onSave',
  'onUpdateAvatar',
  'update:showDialogChangePassword',
]);

const syncData = computed({
  get: () => props.data,
  set: (value: object) => {
    return emits('update:data', value);
  },
});
const syncShowDialogChangePassword = computed({
  get: () => props.showDialogChangePassword,
  set: (value: boolean) => {
    return emits('update:showDialogChangePassword', value);
  },
});

const handleUpdatePassword = () => {
  if (newPass.value.password !== newPass.value.confirmPassword) {
    useNotificationError({ title: 'Nhập lại mật khẩu không chính xác' });
    return;
  }
  emits('onUpdatePassword', { ...newPass.value });
};

const handleSave = () => {
  emits('onSave');
};

const onUpdateAvatar = (url: string) => {
  emits('onUpdateAvatar', url);
};
</script>

<style scoped></style>
