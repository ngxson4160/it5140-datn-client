<template>
  <div class="bg-[#f2f5f8] flex flex-col items-center md:h-screen">
    <div class="mt-16 text-center bg-white shadow-md py-6 px-20 rounded-sm">
      <p class="font-bold text-2xl">Thành công!</p>
      <img
        src="@/assets/images/verify-email.png"
        class="w-[175px] mx-auto my-4"
      />
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
