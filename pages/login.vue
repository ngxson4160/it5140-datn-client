<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Job Nest
      </div>

      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in
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

            <UFormGroup label="Password" name="password">
              <UInput
                v-model="state.password"
                type="password"
                placeholder="••••••••"
              />
            </UFormGroup>

            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    disabled
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    class="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>

            <UButton
              type="submit"
              label="Sign in"
              size="xl"
              :loading="loading"
              :ui="{ rounded: 'rounded-full' }"
              class="text-center justify-center w-full"
            />

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>
          </UForm>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { object, string, type InferType } from 'yup';
import { useAuthStore } from '../stores/auth';

// data
const authStore = useAuthStore();

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
});

type Schema = InferType<typeof schema>;

const state = ref({
  email: undefined,
  password: undefined,
});

const loading = ref(false);

const submit = async (event: any) => {
  loading.value = true;
  const { data, error } = await authStore.systemLogin({ ...event.data });

  if (!error) {
    if (
      data.user.roles[0] === ERole.ROOT ||
      data.user.roles[0] === ERole.ADMIN
    ) {
      navigateTo('/admin', {
        external: true,
      });
    } else if (data.user.roles[0] === ERole.COMPANY) {
      navigateTo('/company', {
        external: true,
      });
    } else if (data.user.roles[0] === ERole.USER) {
      navigateTo('/user', {
        external: true,
      });
    }
  }
  loading.value = false;
};
</script>
