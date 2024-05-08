<template>
  <div
    class="bg-white rounded-t-lg rounded-b-sm h-[358px] mb-4 relative flex flex-col shadow-sm"
  >
    <img :src="company?.coverImage" class="rounded-t-lg h-[245px]" />

    <div
      class="absolute w-[150px] h-[150px] left-6 bottom-6 border p-[3px] bg-white rounded-md"
    >
      <img :src="company?.avatar" class="object-contain" />
    </div>

    <div class="ml-[200px] mr-7 flex h-full justify-between items-center">
      <div class="h-full flex flex-col justify-center rounded-b-lg">
        <p class="font-bold mb-2 text-xl">{{ company?.name }}</p>
        <div class="flex items-center gap-x-6">
          <div class="flex gap-x-2">
            <img src="@/assets/images/company-black.svg" class="w-6" />
            <p>{{ company?.jobCategoryParent.name }}</p>
          </div>

          <div class="flex gap-x-2">
            <img src="@/assets/images/people-group-black.svg" class="w-6" />
            <p>{{ CCompanySizeType[company?.sizeType].name }}</p>
          </div>

          <div class="flex gap-x-2">
            <img src="@/assets/images/view-black.svg" class="w-6" />
            <p>0 lượt theo dõi</p>
          </div>
        </div>
      </div>
      <el-button size="large" class="!text-base w-[200px]" :icon="Plus">
        Theo dõi
      </el-button>
    </div>
  </div>

  <div class="grid grid-cols-10 gap-x-4">
    <div class="col-span-7 rounded-sm bg-white px-4 pb-4 shadow-sm">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane class="!text-sm" label="Giới thiệu" name="about">
          <div class="tiptap" v-html="company?.aboutUs"></div>
        </el-tab-pane>
        <el-tab-pane label="Công việc" name="job">
          <div v-if="!metaJob?.pagination.totalItem" class="text-center mt-4">
            Chưa có công việc nào
          </div>
          <div v-else>
            <card-job-full
              v-for="(job, index) in listJob"
              :key="index"
              class="mt-1 w-full"
              :data="job"
            />
            <div class="w-full flex justify-end mt-4 mb-16">
              <el-pagination
                :current-page="pageJob"
                :page-size="metaJob?.pagination.pageSize"
                :total="
                  metaJob?.pagination.totalPage * metaJob?.pagination.pageSize
                "
                :pager-count="9"
                layout="prev, pager, next"
                background
                @current-change="handleSetPageJob"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Blog" name="blog">Blog</el-tab-pane>
      </el-tabs>
    </div>
    <div class="col-span-3 rounded-sm bg-white py-2 shadow-sm h-fit">
      <p class="font-bold pb-2 border-b-2 px-4">Thông tin chung</p>

      <div class="flex gap-x-2 px-4 mt-4">
        <img src="@/assets/images/network-primary.svg" class="w-5" />
        <p>Website</p>
      </div>
      <p class="text-grey text-[15px] px-4 mt-1">{{ company?.website }}</p>

      <div class="flex gap-x-2 px-4 mt-4">
        <img src="@/assets/images/mail-primary.svg" class="w-5" />
        <p>Mail</p>
      </div>
      <p class="text-grey text-[15px] px-4 mt-1">{{ company?.primaryEmail }}</p>

      <div class="flex gap-x-2 px-4 mt-4">
        <img src="@/assets/images/location-primary.svg" class="w-5" />
        <p>Địa chỉ</p>
      </div>
      <p class="text-grey text-[15px] px-4 mt-1">
        {{ company?.primaryAddress }}
      </p>

      <div class="flex gap-x-2 px-4 mt-4">
        <img src="@/assets/images/phone-primary.svg" class="w-5" />
        <p>Số điện thoại</p>
      </div>
      <p class="text-grey text-[15px] px-4 mt-1">
        {{ company?.primaryPhoneNumber }}
      </p>

      <div class="flex gap-x-2 px-4 mt-4 mb-2">
        <img src="@/assets/images/social-media-primary.svg" class="w-5" />
        <p>Mạng xã hội</p>
      </div>
      <div class="flex px-4 mt-1 gap-x-4 items-center">
        <img src="@/assets/images/facebook.svg" class="w-6" />
        <img src="@/assets/images/twitter-x.svg" class="w-6" />
        <img src="@/assets/images/linkedin.svg" class="w-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { CCompanySizeType } from '~/utils/constant/common';

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
  listJob: {
    type: Object,
    required: true,
  },
  listBlog: {
    type: Object,
    required: true,
  },
  metaJob: {
    type: Object,
    required: true,
  },
  pageJob: {
    type: Number,
    required: true,
  },
});
const activeName = ref('about');

const emits = defineEmits(['onSetPageJob', 'onSetPageBlog']);

const handleSetPageJob = (page: number) => {
  emits('onSetPageJob', page);
};

const handleSetPageBlog = (page: number) => {
  emits('onSetPageBlog', page);
};
</script>
