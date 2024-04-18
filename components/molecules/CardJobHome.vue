<template>
  <div
    class="bg-white flex items-center border w-[400px] h-[150px] rounded-md p-2 hover:bg-[#1caf5705] hover:border-[#1caf573f] cursor-pointer"
  >
    <div class="flex items-center">
      <img src="@/assets/images/logo.jpg" class="w-24 object-contain" />
      <div class="ml-4">
        <p class="font-bold w-[270px] text-one-line">Giám đốc kinh doanh</p>
        <p class="text-sm w-[270px] text-one-line">Công ty cổ phần Vinhomes</p>
        <p class="text-sm text-danger w-[270px] text-one-line">$800 - $2500</p>
        <p class="text-sm w-[270px] text-one-line">Đà Nẵng</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  label: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
