<template>
  <div class="bg-[#f2f5f8] pb-20">
    <div class="grid grid-cols-7 w-[1300px] gap-x-6">
      <div class="col-span-5">
        <div class="bg-white rounded-lg px-6 pt-6 pb-10">
          <div class="pb-10 border-b mb-6">
            <img
              class="border rounded-lg w-[760px] h-[450px] object-contain shadow-sm mx-auto"
              :src="blogDetail.image"
            />
            <p class="font-bold text-xl mt-10 mb-2">
              {{ blogDetail.title }}
            </p>

            <div class="flex justify-between">
              <div class="flex gap-x-4 items-center justify-center">
                <img
                  :src="blogDetail.company?.avatar"
                  class="border w-[68px] h-[68px] rounded-full object-contain"
                />
                <div>
                  <p>{{ blogDetail.company?.name }}</p>
                  <p class="text-sm">
                    {{ formatDateFull(blogDetail.createdAt) }}
                  </p>
                </div>
              </div>
              <div class="flex gap-x-2 items-center">
                <img
                  v-if="blogDetail.isFollow"
                  src="@/assets/images/heart-primary.svg"
                  class="w-8 h-8 cursor-pointer"
                  @click="handleFollowBlog(false)"
                />
                <img
                  v-else
                  src="@/assets/images/heart-gray.svg"
                  class="w-8 h-8 cursor-pointer"
                  @click="handleFollowBlog(true)"
                />
                <span>{{ blogDetail.totalFollow }}</span>
              </div>
            </div>
          </div>
          <div v-html="blogDetail.content"></div>
        </div>

        <div v-if="isCompany" class="flex justify-end gap-x-6 mt-4">
          <el-button
            class="w-[200px]"
            type="default"
            size="large"
            @click="router.push('/company/blog/list')"
          >
            Quay lại
          </el-button>
          <el-button
            class="w-[200px]"
            type="primary"
            size="large"
            @click="router.push(`/company/blog/${blogDetail.id}/edit`)"
          >
            Chỉnh sửa
          </el-button>
        </div>
      </div>

      <div v-if="!isCompany" class="col-span-2">
        <div class="bg-white rounded-lg px-6 py-4">
          <div class="grid grid-cols-3 gap-x-4 gap-y-2">
            <div class="col-span-1">
              <img
                :src="blogDetail.company?.avatar"
                class="w-[88px] h-[88px] object-contain border rounded-md"
              />
            </div>
            <div class="col-span-2">
              <p class="font-bold">
                {{ blogDetail.company?.name }}
              </p>
            </div>
            <div class="col-span-1">
              <div class="flex">
                <p class="text-sm text-gray">Quy mô:</p>
              </div>
            </div>
            <div class="col-span-2">
              <p class="font-bold text-sm">
                {{ CCompanySizeType[blogDetail.company?.sizeType]?.name }}
              </p>
            </div>
            <div class="col-span-1">
              <div class="flex"></div>
              <p class="text-sm text-gray">Địa điểm:</p>
            </div>
            <div class="col-span-2">
              <p class="font-bold text-sm">
                {{ blogDetail.company?.primaryAddress }}
              </p>
            </div>
          </div>
          <div
            class="flex items-center justify-center gap-x-1 mt-4 text-sm text-green cursor-pointer"
            @click="router.push(`/company/${blogDetail.company?.id}`)"
          >
            <p>Xem chi tiết công ty</p>
            <img src="@/assets/images/newscreen-primary.svg" class="w-[22px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CCompanySizeType } from '~/utils/constant/common';

defineProps({
  isCompany: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const { params } = useRoute();

const blogStore = useBlogStore();

const blogId = params.id;

if (!blogId) {
  router.push('/404');
}

const { data, meta } = await blogStore.getDetailBlog(+blogId);

if (meta?.statusCode === 404) {
  router.push('/404');
}

const blogDetail = ref(data);

const handleFollowBlog = async (isFavorite: boolean) => {
  const isLogin = handleCheckLogin();
  if (!isLogin) return;
  await blogStore.favoriteBlog(+blogId, { isFavorite });

  if (isFavorite) {
    blogDetail.value.totalFollow++;
  } else {
    blogDetail.value.totalFollow--;
  }
  blogDetail.value.isFollow = isFavorite;
};
</script>

<style scoped></style>
