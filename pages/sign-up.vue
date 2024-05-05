<template>
  <div class="flex">
    <img
      src="@/assets/images/search.webp"
      class="cursor-pointer w-[1040px] h-full !mr-[6px]"
    />
    <div class="flex flex-col w-full mt-10 mx-auto">
      <p class="font-bold text-[32px] text-green text-center">Đăng ký</p>
      <el-steps
        style="width: 1000px"
        :active="active"
        finish-status="success"
        class="mt-10 mx-auto"
        align-center
      >
        <el-step title="Tài khoản" />
        <el-step title="Công ty" />
        <el-step title="Xác thực" />
      </el-steps>

      <div class="w-[600px] mx-auto">
        <company-account-register
          v-if="active === 0"
          class="mt-10 mx-auto w-full"
          :data="account"
        />
        <company-information-register
          v-if="active === 1"
          class="mt-10 mx-auto w-full"
          :data="companyInformation"
        />
        <div v-if="active === 3" class="mt-10 text-center">
          <img
            src="@/assets/images/verify-email.png"
            class="w-[100px] mx-auto"
          />
          <p>Chúc mừng bạn đã tạo tài khoàn thành công!</p>
          <p>Hãy kiểm tra thư kích hoạt để hoàn tất bước đăng ký</p>
          <el-button class="mt-10" type="primary" @click="router.push('login')">
            Đăng nhập
          </el-button>
        </div>
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
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const initCompanyRegisterAccount = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  dob: '',
  gender: null,
  phoneNumber: null,
};

const initCompanyInformation = {
  jobCategoryParentId: null,
  name: '',
  avatar: null,
  coverImage: null,
  totalStaff: null,
  averageAge: null,
  primaryCity: '',
  primaryAddress: '',
  primaryPhoneNumber: '',
};
const active = ref(0);
const router = useRouter();
const account = ref(initCompanyRegisterAccount);
const companyInformation = ref(initCompanyInformation);

const handleNext = async () => {
  if (active.value === 0) {
    const { error } = await authStore.checkEmailExist(account.value.email);
    if (!error) active.value = 1;
  } else if (active.value === 1) {
    const { error } = await handleSignUp();
    if (!error) active.value = 3;
  }
};

const handleBack = () => {
  if (active.value > 0) {
    active.value -= 1;
  }
};

const handleSignUp = async () => {
  const user = { ...account.value };
  // delete user.confirmPassword;
  const company = { ...companyInformation.value };
  return await authStore.companySignUp({ user, company });
};
</script>

<style scoped></style>
