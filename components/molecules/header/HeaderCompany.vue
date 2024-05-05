<template>
  <div
    class="h-[80px] px-[250px] flex w-full justify-between items-center shadow-lg"
  >
    <div
      class="text-4xl font-bold hover:cursor-pointer"
      @click="router.push('/')"
    >
      Job
      <span class="text-green">Nest</span>
    </div>

    <div class="flex gap-x-10">
      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/company/profile')"
      >
        Trang chủ
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/company/job/list')"
      >
        Quản lý tuyển dụng
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/company/candidate/list')"
      >
        Quản lý ứng viên
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/company/blog/list')"
      >
        Quản lý blog
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/company/message')"
      >
        Tin nhắn
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/about-us')"
      >
        Về chúng tôi
      </p>
    </div>

    <div class="flex items-center">
      <div class="mr-10 flex items-center">
        <img src="@/assets/images/notification.svg" class="w-7 mr-1" />
        Thông báo
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
