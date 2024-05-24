<template>
  <div class="grid grid-cols-7 gap-x-4 mr-4">
    <div class="col-span-5 rounded-lg shadow-xl bg-white h-[750px] px-4 py-6">
      <div class="flex gap-x-4 items-center border-b pb-2 mb-4">
        <div class="border p-[2px] w-[72px] h-[72px] bg-white rounded-full">
          <img
            src="@/assets/images/logo.jpg"
            class="object-contain w-full h-full rounded-full"
          />
        </div>
        <p class="font-bold">Nguyễn Xuân Sơn</p>
      </div>

      <top-infinite-scroll
        :data="listData"
        :height="541"
        @load-data="handleLoadData"
      >
        <template #default="props">
          <p>{{ props.data }}</p>
        </template>
      </top-infinite-scroll>

      <div class="flex gap-x-4 mt-6">
        <el-input size="large" />
        <el-button type="primary" size="large">Gửi</el-button>
      </div>
    </div>

    <div
      class="col-span-2 shadow-xl bg-white pl-4 py-6 h-[750px] overflow-auto rounded-lg"
    >
      <div
        v-infinite-scroll="handleGetListDataPaging"
        infinite-scroll-distance="10"
        :infinite-scroll-immediate="false"
      >
        <div
          v-for="(el, index) in listUser"
          :key="index"
          class="hover:bg-[#f2f5f8] px-2 py-4 rounded-lg cursor-pointer"
        >
          <div class="flex gap-x-3">
            <img
              src="@/assets/images/logo.jpg"
              class="w-[56px] h-[56px] object-contain rounded-full border bg-white"
            />
            <div class="flex justify-between flex-1">
              <div class="flex flex-col justify-between">
                <p>{{ el }}</p>
                <p class="text-sm w-[250px] truncate">
                  Hulaaaaaaaaaaaaaaaaaaaaaaaaaaaaa fsd dsf sdf sdf
                </p>
              </div>
              <p class="text-xs">12:58 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const listData = ref([
  9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -5, -6, -7,
  -8, -9, -5, -6, -7, -8, -9, -5, -6, -7, -8, -9, -5, -6, -7, -8, -9, -5, -6,
  -7, -8, -9,
]);
const listUser = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
]);
const handleLoadData = () => {
  const index = listData.value[0];
  for (let i = index; i <= index + 20; i++) {
    listData.value.unshift(i);
  }
};

const handleGetListDataPaging = () => {
  const index = listUser.value[listUser.value.length - 1];
  for (let i = index; i <= index + 20; i++) {
    listUser.value.push(i);
  }
};
</script>

<style scoped></style>
