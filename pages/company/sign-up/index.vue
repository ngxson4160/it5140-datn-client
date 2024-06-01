<template>
  <div class="flex flex-col w-full mt-20 mx-auto">
    <p class="font-bold text-[32px] text-green text-center">
      Nhà tuyển dụng đăng ký
    </p>
    <el-steps
      style="width: 800px"
      :active="active"
      class="my-10 mx-auto"
      align-center
    >
      <el-step title="Tài khoản" />
      <el-step title="Công ty" />
    </el-steps>

    <div class="w-[600px] mx-auto">
      <div v-if="active === 0">
        <el-form
          ref="ruleFormAccount"
          label-position="top"
          :model="account"
          :rules="ruleAccount"
          style="max-width: 600px"
        >
          <div class="flex justify-between">
            <el-form-item label="Họ" class="w-full" prop="firstName">
              <el-input v-model="account.firstName" size="large" />
            </el-form-item>
            <el-form-item label="Tên" class="w-full ml-10" prop="lastName">
              <el-input v-model="account.lastName" size="large" />
            </el-form-item>
          </div>
          <el-form-item label="Địa chỉ email" class="w-full" prop="email">
            <el-input v-model="account.email" size="large" />
          </el-form-item>
          <el-form-item label="Mật khẩu" class="w-full" prop="password">
            <el-input v-model="account.password" type="password" size="large" />
          </el-form-item>
          <el-form-item
            label="Nhập lại mật khẩu"
            class="w-full"
            prop="confirmPassword"
          >
            <el-input
              v-model="account.confirmPassword"
              type="password"
              size="large"
            />
          </el-form-item>
        </el-form>
      </div>

      <el-form
        v-if="active === 1"
        ref="ruleFormCompany"
        label-position="top"
        :model="companyInformation"
        :rules="ruleCompany"
        style="max-width: 600px"
      >
        <el-form-item label="Tên công ty" class="w-full" prop="name">
          <el-input v-model="companyInformation.name" size="large" />
        </el-form-item>
        <el-form-item
          label="Lĩnh vực hoạt động"
          class="w-full"
          prop="jobCategoryParentId"
        >
          <select-job-parent
            v-model="companyInformation.jobCategoryParentId"
            class="col-span-1 w-full"
            size="large"
            :is-multiple="false"
          />
        </el-form-item>
        <el-form-item label="Địa chỉ" class="w-full" prop="primaryAddress">
          <el-input v-model="companyInformation.primaryAddress" size="large" />
        </el-form-item>
        <div class="flex gap-x-6 w-full">
          <el-form-item label="Quy mô công ty" class="!w-full" prop="sizeType">
            <select-company-size
              v-model="companyInformation.sizeType"
              size="large"
            />
          </el-form-item>
          <el-form-item
            label="Số điện thoại"
            class="w-full"
            prop="primaryPhoneNumber"
          >
            <el-input
              v-model="companyInformation.primaryPhoneNumber"
              size="large"
            />
          </el-form-item>
        </div>
      </el-form>

      <div class="flex justify-end mt-10">
        <el-button
          v-if="active !== 3"
          :disabled="active === 0"
          type="danger"
          @click="handleBack"
        >
          Quay lại
        </el-button>
        <el-button v-if="active !== 3" type="primary" @click="handleNext">
          Tiếp tục
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { MESSAGE_VALIDATE } from '~/utils/constant/message-validate';
definePageMeta({
  middleware: ['redirect'],
});
const authStore = useAuthStore();

const initCompanyRegisterAccount = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

const initCompanyInformation = {
  name: '',
  jobCategoryParentId: null,
  primaryPhoneNumber: '',
  primaryAddress: '',
  sizeType: null,
};
const active = ref(0);
const router = useRouter();
const account = ref(initCompanyRegisterAccount);
const companyInformation = ref(initCompanyInformation);

const validatePassConfirm = (rule: any, value: any, callback: any) => {
  if (value !== account.value.password) {
    callback(new Error('Nhập lại mật khảu không đúng!'));
  } else {
    callback();
  }
};

const ruleFormAccount = ref<FormInstance>();
const ruleFormCompany = ref<FormInstance>();
const ruleAccount = reactive<FormRules<any>>({
  firstName: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  lastName: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  email: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateEmail,
      message: MESSAGE_VALIDATE.EMAIL,
      trigger: 'change',
    },
  ],
  password: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { min: 8, message: 'Tối thiểu 8 ký tự', trigger: 'change' },
  ],
  confirmPassword: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { min: 8, message: 'Tối thiểu 8 ký tự', trigger: 'change' },
    { validator: validatePassConfirm, trigger: 'blur' },
  ],
});

const ruleCompany = reactive<FormRules<any>>({
  name: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  jobCategoryParentId: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
  ],
  primaryAddress: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  sizeType: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
  primaryPhoneNumber: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validatePhoneNumber,
      message: MESSAGE_VALIDATE.PHONE_NUMBER,
      trigger: 'change',
    },
  ],
});

const handleNextAccount = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { meta } = await authStore.checkEmailExist(account.value.email);
      if (meta.statusCode === 200) active.value = 1;
    }
  });
};

const handleNextCompany = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { meta } = await handleSignUp();
      if (meta.statusCode === 200) router.push('/company/sign-up/sent-mail');
    }
  });
};

const handleBack = () => {
  if (active.value > 0) {
    active.value -= 1;
  }
};

const handleNext = () => {
  if (active.value === 0) {
    return handleNextAccount(ruleFormAccount.value);
  } else if (active.value === 1) {
    return handleNextCompany(ruleFormCompany.value);
  }
};

const handleSignUp = async () => {
  const user = { ...account.value };
  const company = { ...companyInformation.value };
  return await authStore.companySignUp({ user, company });
};
</script>

<style scoped></style>
