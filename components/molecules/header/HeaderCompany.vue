<template>
  <div
    class="h-[80px] pr-[150px] flex w-full justify-between items-center shadow-lg bg-[#1caf57]"
  >
    <div
      class="w-[350px] text-center flex items-center justify-center bg-white h-full"
    >
      <div
        class="text-4xl font-bold hover:cursor-pointer"
        @click="router.push('/company/profile')"
      >
        Job
        <span class="text-green">Nest</span>
      </div>
    </div>

    <div class="flex items-center gap-x-4">
      <div class="flex items-center">
        <img src="@/assets/images/notification-white.svg" class="w-7" />
      </div>
      <div class="flex items-center">
        <img src="@/assets/images/message-white.svg" class="w-7" />
      </div>
      <div
        class="flex items-center gap-x-2 border-grey border rounded-full px-[6px] py-[3px]"
      >
        <img
          src="https://job-nest.s3.ap-southeast-1.amazonaws.com/images/0016cf9101bd8164b99c675804f14b0ff6ea6a552fbcc7d113ae90a7f2032a9f4b4893f4377a704a44d28bd91beee557913fe95abedf75a54f74b8890886a47b.png"
          class="w-[48px] h-[48px] rounded-full border hover:cursor-pointer focus:outline-none"
        />
        <p class="text-white text-[15px]">Bộ phân tuyển dụng</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
