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
        @click="router.push('/candidates')"
      >
        Ứng viên
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/blogs')"
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

    <div class="flex items-center">
      <div class="mr-10 flex items-center">
        <img src="@/assets/images/notification.svg" class="w-7 mr-1" />
        Thông báo
      </div>
      <el-dropdown>
        <img
          src="https://job-nest.s3.ap-southeast-1.amazonaws.com/images/0016cf9101bd8164b99c675804f14b0ff6ea6a552fbcc7d113ae90a7f2032a9f4b4893f4377a704a44d28bd91beee557913fe95abedf75a54f74b8890886a47b.png"
          class="w-[54px] h-[54px] rounded-full border hover:cursor-pointer focus:outline-none"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/user/profile')">
              Hồ sơ
            </el-dropdown-item>
            <el-dropdown-item @click="router.push('/user/job/application')">
              Ứng tuyển
            </el-dropdown-item>
            <el-dropdown-item @click="router.push('/user/message')">
              Tin nhắn
            </el-dropdown-item>
            <el-dropdown-item @click="handleLogout">Đăng xuất</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>

<style scoped></style>
