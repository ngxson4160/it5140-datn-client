<template>
  <section class="bg-[#f2f5f8] dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center"
          >
            Quên mật khẩu?
          </h1>
          <p class="text-center text-base text-grey">
            Vui lòng kiểm tra email của bạn sau khi gửi.
          </p>

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

            <UButton
              type="submit"
              label="Gửi"
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

// data
const authStore = useAuthStore();

const router = useRouter();

const schema = object({
  email: string().email('Email không hợp lệ').required('Bắt buộc'),
});

type Schema = InferType<typeof schema>;

const state = ref({
  email: undefined,
});

const loading = ref(false);

const submit = async (event: any) => {
  loading.value = true;
  const { data, meta } = await authStore.requestResetPassword({
    ...event.data,
  });
  loading.value = false;

  if (meta.statusCode === 200) {
    router.push('/forgot-password/sent-mail');
  }
};
</script>
