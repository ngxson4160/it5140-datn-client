<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Đặt lại mật khẩu
          </h1>

          <UForm
            class="space-y-4 md:space-y-6"
            :schema="schema"
            :state="state"
            @submit="submit"
          >
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

            <UFormGroup label="Xác nhận mật khẩu" name="confirmPassword">
              <UInput
                v-model="state.confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </UFormGroup>

            <UButton
              type="submit"
              label="Đặt lại mật khẩu"
              size="xl"
              :loading="loading"
              :ui="{ rounded: 'rounded-full' }"
              class="text-center justify-center w-full bg-green hover:bg-[#8ed7ab]"
            />
          </UForm>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { object, string, type InferType } from 'yup';
definePageMeta({
  middleware: ['redirect-to-home-page'],
});
// data
const authStore = useAuthStore();
const router = useRouter();
const { query } = useRoute();

if (!query.token) {
  router.push('/404');
}

const schema = object({
  email: string().email('Email không hợp lệ').required('Bắt buộc'),
  password: string().min(8, 'Tối thiểu 8 ký tự').required('Bắt buộc'),
  confirmPassword: string().min(8, 'Tối thiểu 8 ký tự').required('Bắt buộc'),
});

type Schema = InferType<typeof schema>;

const state = ref({
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const loading = ref(false);

const submit = async (event: any) => {
  if (state.value.password !== state.value.confirmPassword) {
    useNotificationError({ title: 'Xác nhận mật khẩu không chính xác!' });
    return;
  }

  const { data, meta } = await authStore.resetPassword({
    email: state.value.email,
    password: state.value.password,
    token: query.token,
  });

  if (meta.statusCode === 200) {
    router.push('/login');
  }
};
</script>
