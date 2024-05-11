<template>
  <section class="bg-gray-50 dark:bg-gray-900">
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

          <UForm
            class="space-y-4 md:space-y-6"
            :schema="schema"
            :state="state"
            @submit="submit"
          >
            <div class="flex gap-x-6">
              <UFormGroup label="Họ" name="firstName" class="w-full">
                <UInput v-model="state.firstName" size="md" />
              </UFormGroup>

              <UFormGroup label="Tên" name="lastName" class="w-full">
                <UInput v-model="state.lastName" size="md" />
              </UFormGroup>
            </div>

            <UFormGroup label="Số điện thoại" name="phoneNumber">
              <UInput v-model="state.phoneNumber" size="md" />
            </UFormGroup>

            <UFormGroup label="Email" name="email">
              <UInput
                v-model="state.email"
                placeholder="name@company.com"
                size="md"
              />
            </UFormGroup>

            <UFormGroup label="Mật khẩu" name="password">
              <UInput
                v-model="state.password"
                type="password"
                placeholder="••••••••"
              />
            </UFormGroup>

            <UButton
              type="submit"
              label="Đăng ký"
              size="xl"
              :loading="loading"
              :ui="{ rounded: 'rounded-full' }"
              class="text-center justify-center w-full bg-green hover:bg-[#8ed7ab]"
            />
          </UForm>
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
import { ref } from 'vue';

import { object, string, type InferType } from 'yup';

// data
const authStore = useAuthStore();
const router = useRouter();

const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

const schema = object({
  firstName: string().required('Bắt buộc'),
  lastName: string().required('Bắt buộc'),
  phoneNumber: string()
    .required('Bắt buộc')
    .matches(phoneRegex, 'Số điện thoại không hợp lệ'),
  email: string().email('Email không hợp lệ').required('Bắt buộc'),
  password: string().min(8, 'Tối thiểu 8 ký tự').required('Bắt buộc'),
});

type Schema = InferType<typeof schema>;

const state = ref({
  firstName: undefined,
  lastName: undefined,
  phoneNumber: undefined,
  email: undefined,
  password: undefined,
});

const loading = ref(false);

const submit = async (event: any) => {
  const { data, meta } = await authStore.userSignUp({ ...event.data });

  if (meta.statusCode === 200) {
    router.push('/sign-up/sent-mail');
  }
};
</script>
