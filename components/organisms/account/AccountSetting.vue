<template>
  <div class="bg-white shadow-sm p-4 w-[850px]">
    <p class="font-bold text-xl mb-10 pb-2 border-b">Thông tin tài khoản</p>

    <div class="flex justify-center">
      <div>
        <img
          v-if="!isEmptyObject(syncData?.avatar)"
          :src="syncData?.avatar"
          class="w-[135px] h-[135px] rounded-full object-contain border p-[3px] bg-white mb-2"
        />
        <div
          v-else
          class="w-[135px] h-[135px] flex items-center border p-[3px] bg-white rounded-full"
        >
          <loading-custom class="ml-11" />
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

    <el-form
      ref="ruleFormAccount"
      label-position="top"
      :model="syncData"
      :rules="rulesAccount"
    >
      <div class="grid grid-cols-2 gap-x-4 mt-4">
        <el-form-item label="Họ" prop="firstName" class="w-full" required>
          <el-input v-model="syncData.firstName" size="large" />
        </el-form-item>
        <el-form-item label="Tên" prop="lastName" class="w-full" required>
          <el-input v-model="syncData.lastName" size="large" />
        </el-form-item>
      </div>
    </el-form>

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

    <el-dialog
      v-model:model-value="syncShowDialogChangePassword"
      center
      align-center
    >
      <template #header>
        <p class="text-base font-bold text-center">Thay đổi mật khẩu</p>
      </template>

      <el-form
        ref="ruleFormChangePassword"
        label-position="top"
        :model="syncNewPass"
        :rules="rulesChangePassword"
      >
        <el-form-item
          label="Mật khẩu hiện tại"
          prop="currentPassword"
          class="w-full"
          required
        >
          <el-input
            v-model="syncNewPass.currentPassword"
            size="large"
            type="password"
          />
        </el-form-item>

        <el-form-item
          label="Mật khẩu mới"
          prop="password"
          class="w-full"
          required
        >
          <el-input
            v-model="syncNewPass.password"
            size="large"
            type="password"
          />
        </el-form-item>

        <el-form-item
          label="Nhập lại mật khẩu mới"
          prop="confirmPassword"
          class="w-full"
          required
        >
          <el-input
            v-model="syncNewPass.confirmPassword"
            size="large"
            type="password"
          />
        </el-form-item>
      </el-form>

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
import type { FormInstance, FormRules } from 'element-plus';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  showDialogChangePassword: {
    type: Boolean,
    required: true,
  },
  newPass: {
    type: Object,
    required: true,
  },
});

const passwordFake = ref('1234567890987654321');

const emits = defineEmits([
  'update:data',
  'onUpdatePassword',
  'onSave',
  'onUpdateAvatar',
  'update:showDialogChangePassword',
  'update:newPass',
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
const syncNewPass = computed({
  get: () => props.newPass,
  set: (value: object) => {
    return emits('update:newPass', value);
  },
});

const ruleFormAccount = ref<FormInstance>();
const rulesAccount = reactive<FormRules<any>>({
  firstName: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
});

const validatePassConfirm = (rule: any, value: any, callback: any) => {
  if (value !== syncNewPass.value.password) {
    callback(new Error('Nhập lại mật khảu không đúng!'));
  } else {
    callback();
  }
};
const ruleFormChangePassword = ref<FormInstance>();
const rulesChangePassword = reactive<FormRules<any>>({
  currentPassword: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { min: 8, message: 'Tối thiểu 8 ký tự', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { min: 8, message: 'Tối thiểu 8 ký tự', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { min: 8, message: 'Tối thiểu 8 ký tự', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
    { validator: validatePassConfirm, trigger: 'blur' },
  ],
});

const handleUpdatePassword = () => {
  if (!ruleFormChangePassword.value) return;
  ruleFormChangePassword.value.validate((valid) => {
    if (valid) {
      emits('onUpdatePassword');
    }
  });
};

const handleSave = () => {
  if (!ruleFormAccount.value) return;
  ruleFormAccount.value.validate((valid) => {
    if (valid) {
      emits('onSave');
    }
  });
};

const onUpdateAvatar = (url: string) => {
  emits('onUpdateAvatar', url);
};
</script>

<style scoped></style>
