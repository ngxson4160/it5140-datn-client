<template>
  <div class="bg-white h-full mr-4 p-4 shadow-md rounded-md">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Thông tin chung" name="information-general">
        <div class="w-[1250px]">
          <div class="grid grid-cols-2 gap-x-6 mt-4">
            <div class="col-span-1">
              <p class="mb-2 text-sm">Tên công ty</p>
              <el-input
                v-model:model-value="company.name"
                class="col-span-1"
                size="large"
              />
            </div>
            <div class="col-span-1">
              <p class="mb-2 text-sm">Email</p>
              <el-input
                v-model:model-value="company.primaryEmail"
                class="col-span-1"
                size="large"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-x-6 mt-4">
            <div class="col-span-1">
              <p class="mb-2 text-sm">Mã số thuế</p>
              <el-input
                v-model:model-value="company.taxCode"
                class="col-span-1"
                size="large"
              />
            </div>
            <div class="col-span-1">
              <p class="mb-2 text-sm">Website</p>
              <el-input
                v-model:model-value="company.website"
                class="col-span-1"
                size="large"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-x-6 mt-4">
            <div class="col-span-1">
              <p class="mb-2 text-sm">Lĩnh vực hoạt động</p>
              <select-job-parent
                v-model="company.jobCategoryParentId"
                class="col-span-1 w-full"
                size="large"
                :is-multiple="false"
              />
            </div>
            <div class="col-span-1">
              <p class="mb-2 text-sm">Quy mô công ty</p>
              <select-company-size
                v-model="company.sizeType"
                class="col-span-1 w-full"
                size="large"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-x-6 mt-4">
            <div class="col-span-1">
              <p class="mb-2 text-sm">Địa chỉ</p>
              <el-input
                v-model:model-value="company.primaryAddress"
                class="col-span-1"
                size="large"
              />
            </div>
            <div class="col-span-1">
              <p class="mb-2 text-sm">Số điện thoại</p>
              <el-input
                v-model:model-value="company.primaryPhoneNumber"
                class="col-span-1"
                size="large"
              />
            </div>
          </div>

          <p class="text-sm mt-4 mb-2">Mô tả công ty</p>
          <content-editor v-model:model-value="company.aboutUs" />

          <div class="flex justify-end mt-10">
            <el-button type="primary" size="large" @click="onUpdateCompany">
              Lưu
            </el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Avatar/Ảnh bìa" name="avatar-coverImage">
        <div class="w-[1196px]">
          <div class="flex ml-10">
            <div class="flex flex-col gap-y-2">
              <p class="text-sm">Logo công ty</p>
              <img
                v-if="!isEmptyObject(company.avatar)"
                :key="company.avatar"
                :src="company.avatar"
                class="w-[150px] h-[150px] object-cover border p-[3px] bg-white rounded-md"
              />
              <div
                v-else
                class="w-[150px] h-[150px] flex items-center justify-center border p-[3px] bg-white rounded-md"
              >
                <loading-custom />
              </div>
              <up-load-image
                v-model:data-upload="company.avatar"
                title="Thay đổi avatar"
                @on-success="onUpdateAvatar"
              />
            </div>

            <div class="flex flex-col gap-y-2 ml-[250px] !w-[698px]">
              <p class="text-sm">Ảnh bìa</p>
              <img
                v-if="!isEmptyObject(company.coverImage)"
                :key="company.coverImage"
                :src="company.coverImage"
                class="!w-[698px] h-[150px] border rounded-lg object-cover"
              />
              <div
                v-else
                class="flex justify-center items-center !w-[698px] h-[150px] border rounded-lg"
              >
                <loading-custom />
              </div>
              <div class="flex justify-end">
                <up-load-image
                  v-model:data-upload="company.coverImage"
                  title="Thay đổi ảnh bìa"
                  @on-success="onUpdateCoverImage"
                />
              </div>
            </div>
          </div>

          <!-- <div class="mt-10 flex justify-end">
            <el-button type="primary" size="large" @click="onUpdateCompany">
              Lưu
            </el-button>
          </div> -->
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'company-dashboard',
  middleware: ['redirect'],
});

const activeName = ref('information-general');

const companyStore = useCompanyStore();

const loading = ref(false);

const company = ref();
const { data } = await companyStore.getMyCompany();
company.value = data;

const onUpdateCompany = async () => {
  await companyStore.updateMyCompany({ ...company.value });
};

const onUpdateAvatar = async (url: string) => {
  await companyStore.updateMyCompany({ avatar: url });
};

const onUpdateCoverImage = async (url: string) => {
  await companyStore.updateMyCompany({ coverImage: url });
};
</script>

<style scoped></style>
