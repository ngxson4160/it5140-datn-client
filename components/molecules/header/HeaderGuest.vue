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
        @click="router.push('/')"
      >
        Trang chủ
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/job/list')"
      >
        Tìm việc
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/company/list')"
      >
        Công ty
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/candidate')"
      >
        Ứng viên
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/blog')"
      >
        Blog
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/about-us')"
      >
        Về chúng tôi
      </p>
    </div>

    <div class="flex">
      <el-button type="grey" class="w-[125px]" @click="router.push('/login')">
        <span class="text-base !font-medium">Đăng nhập</span>
      </el-button>
      <el-button type="primary" class="w-[125px]">
        <span class="text-base !font-medium" @click="router.push('/sign-up')">
          Đăng kí
        </span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>
