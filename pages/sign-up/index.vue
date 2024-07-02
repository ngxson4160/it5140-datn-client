<template>
  <section class="bg-[#f2f5f8] dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="min-w-[750px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Đăng ký thành viên
          </h1>

          <el-form
            ref="ruleForm"
            label-position="top"
            :model="formSignUp"
            :rules="rules"
          >
            <div class="flex gap-x-6">
              <el-form-item label="Họ" prop="firstName" class="w-full" required>
                <el-input v-model="formSignUp.firstName" size="large" />
              </el-form-item>

              <el-form-item label="Tên" prop="lastName" class="w-full" required>
                <el-input v-model="formSignUp.lastName" size="large" />
              </el-form-item>
            </div>

            <!-- <div class="flex gap-x-6">
              <el-form-item
                label="Công việc mong muốn"
                prop="desiredJobCategoryId"
                class="w-full"
                required
              >
                <select-job-category
                  v-model="formSignUp.desiredJobCategoryId"
                  class="!w-full"
                  :is-multiple="false"
                />
              </el-form-item>

              <el-form-item
                label="Số năm kinh nghiệm"
                prop="yearExperience"
                class="w-full"
                required
              >
                <select-job-experience
                  v-model="formSignUp.yearExperience"
                  class="w-full"
                />
              </el-form-item>
            </div> -->

            <el-form-item label="Số điện thoại" prop="phoneNumber" required>
              <el-input v-model="formSignUp.phoneNumber" size="large" />
            </el-form-item>

            <el-form-item label="Email" prop="email" required>
              <el-input
                v-model="formSignUp.email"
                placeholder="name@company.com"
                size="large"
              />
            </el-form-item>

            <el-form-item label="Mật khẩu" prop="password" required>
              <el-input
                v-model="formSignUp.password"
                type="password"
                placeholder="••••••••"
                size="large"
              />
            </el-form-item>

            <el-button
              type="primary"
              round
              class="w-full"
              size="large"
              @click="submit"
            >
              Đăng ký
            </el-button>
          </el-form>
        </div>

        <p class="text-center">
          Bạn đã có tài khoản?
          <span
            class="text-green hover:underline cursor-pointer font-bold"
            @click="router.push('/login')"
          >
            Đăng nhập
          </span>
        </p>

        <p class="text-center pb-10 mt-2">
          Nếu bạn đang có nhu cầu tuyển dụng, vui lòng đăng ký
          <span
            class="text-green hover:underline cursor-pointer"
            @click="router.push('/company/sign-up')"
          >
            tại đây
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { ref } from 'vue';
import { MESSAGE_VALIDATE } from '~/utils/constant/message-validate';

definePageMeta({
  middleware: ['redirect-to-home-page'],
});

// data
const authStore = useAuthStore();
const router = useRouter();

const formSignUp = ref({
  firstName: undefined,
  lastName: undefined,
  phoneNumber: undefined,
  email: undefined,
  password: undefined,
  // desiredJobCategoryId: undefined,
  // yearExperience: undefined,
});

const ruleForm = ref<FormInstance>();
const rules = reactive<FormRules<any>>({
  firstName: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  phoneNumber: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validatePhoneNumber,
      message: MESSAGE_VALIDATE.PHONE_NUMBER,
      trigger: 'change',
    },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    {
      validator: validateEmail,
      message: MESSAGE_VALIDATE.EMAIL,
      trigger: 'change',
    },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Bắt buộc', trigger: 'change' },
    { min: 8, message: 'Tối thiểu 8 ký tự', trigger: 'change' },
    { validator: validateEmptyString, message: 'Bắt buộc', trigger: 'blur' },
  ],
  // desiredJobCategoryId: [
  //   { required: true, message: 'Bắt buộc', trigger: 'change' },
  // ],
  // yearExperience: [{ required: true, message: 'Bắt buộc', trigger: 'change' }],
});

const submit = () => {
  if (!ruleForm.value) return;
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      const { data, meta } = await authStore.userSignUp({
        ...formSignUp.value,
      });

      if (meta.statusCode === 200) {
        router.push('/sign-up/sent-mail');
      }
    }
  });
};
</script>
