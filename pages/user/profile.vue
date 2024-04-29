<template>
  <div class="flex">
    <div class="flex-1">
      <div id="part1" class="w-full rounded-sm bg-white px-6 py-4">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Thông tin cá nhân</p>
          <img
            src="@/assets/images/edit-title-primary.svg"
            class="cursor-pointer w-8"
            @click="showEditInformationGeneral = true"
          />
        </div>
        <div class="grid grid-cols-2 mt-6 gap-y-6">
          <div class="col-span-1">
            <p class="font-bold">Họ và tên</p>
            <p class="text-sm">
              {{ `${userProfile.firstName} ${userProfile.lastName}` }}
            </p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Tỉnh/Thành phố</p>
            <p class="text-sm">{{ userProfile.city.name }}</p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Số điện thoại</p>
            <p class="text-sm">{{ userProfile.phoneNumber }}</p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Quận/Huyện</p>
            <p class="text-sm">{{ userProfile.district }}</p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Giới tính</p>
            <p class="text-sm">{{ CGender[userProfile.gender].name }}</p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Địa chỉ</p>
            <p class="text-sm">{{ userProfile.address }}</p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Ngày sinh</p>
            <p class="text-sm">
              {{ formatDateShort(userProfile.dob) }}
            </p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Tình trạng hôn nhân</p>
            <p class="text-sm">
              {{ CMaritalStatus[userProfile.maritalStatus].name }}
            </p>
          </div>
        </div>
      </div>

      <div id="part2" class="w-full rounded-sm bg-white px-6 py-4 mt-6">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Thông tin chung</p>
          <img
            src="@/assets/images/edit-title-primary.svg"
            class="cursor-pointer w-8"
            @click="showEditProfile = true"
          />
        </div>
        <p class="font-bold">Mục tiêu nghề nghiệp</p>
        <p class="text-sm">
          {{ userProfile.candidateInformation.target }}
        </p>
        <div class="grid grid-cols-2 mt-6 gap-y-6">
          <div class="col-span-1">
            <p class="font-bold">Ví trị mong muốn</p>
            <p class="text-sm">
              {{ userProfile.candidateInformation.desiredJobCategory.name }}
            </p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Địa điểm làm việc mong muốn</p>
            <p class="text-sm">
              {{ userProfile.candidateInformation.desiredCity.name }}
            </p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Cấp bậc mong muốn</p>
            <p class="text-sm">
              {{
                CJobLevel[userProfile.candidateInformation.desiredJobLevel].name
              }}
            </p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Mức lương mong muốn</p>
            <p class="text-sm">
              {{ userProfile.candidateInformation.desiredSalary }} VND
            </p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Trình độ học vấn</p>
            <p class="text-sm">
              {{ CEducationLevel[userProfile.educationalLevel].name }}
            </p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Hình thức làm việc mong muốn</p>
            <p class="text-sm">
              {{ CJobMode[userProfile.candidateInformation.desiredMode].name }}
            </p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Số năm kinh nghiệp</p>
            <p class="text-sm">
              {{ userProfile.candidateInformation.yearExperience }}
            </p>
          </div>
        </div>
      </div>

      <div id="part3" class="w-full rounded-sm bg-white px-6 py-4 mt-6">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Kinh nghiệm làm việc</p>
          <img
            src="@/assets/images/add-primary.svg"
            class="cursor-pointer w-10"
            @click="showWorkExperience = true"
          />
        </div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(workExperience, index) in userProfile.candidateInformation
              .workExperience"
            :key="index"
            :timestamp="formatDateShort(workExperience.start)"
            placement="top"
          >
            <div>
              <p class="font-bold text-base">
                {{ workExperience.position }}
              </p>
              <p>{{ workExperience.companyName }}</p>
              <p>{{ workExperience.description }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div id="part5" class="w-full rounded-sm bg-white px-6 py-4 mt-6">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Thông tin học vấn</p>
          <img
            src="@/assets/images/add-primary.svg"
            class="cursor-pointer w-10"
            @click="showEducation = true"
          />
        </div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(education, index) in userProfile.candidateInformation
              .education"
            :key="index"
            :timestamp="formatDateShort(education.start)"
            placement="top"
          >
            <div>
              <p class="font-bold text-base">
                {{ education.name }}
              </p>
              <p class="text-sm">{{ education.organization }}</p>
              <p class="text-sm">{{ education.major }}</p>
              <p class="text-sm">{{ education.description }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div id="part6" class="w-full rounded-sm bg-white px-6 py-4 mt-6">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Chứng chỉ</p>
          <img
            src="@/assets/images/add-primary.svg"
            class="cursor-pointer w-10"
            @click="showCertificate = true"
          />
        </div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(certificate, index) in userProfile.candidateInformation
              .certificate"
            :key="index"
            :timestamp="formatDateShort(certificate.start)"
            placement="top"
          >
            <div>
              <p class="font-bold text-base">
                {{ certificate.name }}
              </p>
              <p class="text-sm">{{ certificate.organization }}</p>
              <p class="text-sm">{{ certificate.major }}</p>
              <p class="text-sm">{{ certificate.description }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div id="part8" class="w-full rounded-sm bg-white px-6 py-4 mt-6">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Kỹ năng chuyên môn</p>
          <img
            src="@/assets/images/add-primary.svg"
            class="cursor-pointer w-10"
            @click="showAdvancedSkill = true"
          />
        </div>
        <div class="pb-1 grid grid-cols-3 gap-y-2 gap-x-4 border-b">
          <p class="col-span-1">Kỹ năng</p>
          <p class="col-span-1">Trình độ</p>
          <p class="col-span-1">Hành động</p>
        </div>
        <div
          v-for="(advancedSkill, index) in userProfile.candidateInformation
            .advancedSkill"
          :key="index"
          class="grid grid-cols-3 border-b py-1 gap-x-4 items-center"
        >
          <p class="col-span-1">{{ advancedSkill.name }}</p>
          <el-progress
            :percentage="advancedSkill.level"
            status="success"
            :show-text="false"
          />
          <div class="col-span-1 flex">
            <img
              src="@/assets/images/pencil-primary.svg"
              class="w-6 cursor-pointer"
            />
            <img
              src="@/assets/images/bin-danger.svg"
              class="w-6 ml-2 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div id="part7" class="w-full rounded-sm bg-white px-6 py-4 mt-6 mb-20">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Kỹ năng ngoại ngữ</p>
          <img
            src="@/assets/images/add-primary.svg"
            class="cursor-pointer w-10"
            @click="showLanguageSkill = true"
          />
        </div>
        <div class="pb-1 grid grid-cols-3 gap-y-2 gap-x-4 border-b">
          <p class="col-span-1">Ngôn ngữ</p>
          <p class="col-span-1">Trình độ</p>
          <p class="col-span-1">Hành động</p>
        </div>

        <div
          v-for="(languageSkill, index) in userProfile.candidateInformation
            .languageSkill"
          :key="index"
          class="grid grid-cols-3 border-b py-1 gap-x-4 items-center"
        >
          <p class="col-span-1">{{ languageSkill.name }}</p>
          <el-progress
            :percentage="languageSkill.level"
            status="success"
            :show-text="false"
          />
          <div class="col-span-1 flex">
            <img
              src="@/assets/images/pencil-primary.svg"
              class="w-6 cursor-pointer"
            />
            <img
              src="@/assets/images/bin-danger.svg"
              class="w-6 ml-2 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>

    <dialog-form
      v-model:dialogVisible="showEditInformationGeneral"
      title="Thông tin cá nhân"
      @on-confirm="onSaveEditInformationGeneral"
    >
      <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
        <div class="col-span-1">
          <p class="mb-2">Họ</p>
          <el-input />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Tên</p>
          <el-input />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Số điện thoại</p>
          <el-input />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Ngày sinh</p>
          <el-date-picker class="!w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Giới tính</p>
          <el-select class="w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Tình trạng hôn nhân</p>
          <el-select class="w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Tỉnh/Thành phố</p>
          <el-select class="w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Quận/Huyện</p>
          <el-select class="w-full" />
        </div>
      </div>
      <div class="mt-4">
        <p>Địa chỉ</p>
        <el-input class="mt-2 !h-10" />
      </div>
    </dialog-form>

    <dialog-form
      v-model:dialogVisible="showEditProfile"
      title="Thông tin hồ sơ"
      @on-confirm="onSaveEditInformationGeneral"
    >
      <div>
        <p>Mục tiêu nghề nghiệp</p>
        <el-input class="mt-2 !h-10" />
      </div>

      <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
        <div class="col-span-1">
          <p class="mb-2">Vị trí mong muốn</p>
          <el-input />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Địa điểm làm việc mong muốn</p>
          <el-date-picker class="!w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Cấp bậc mong muốn</p>
          <el-select class="w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Mức lương mong muốn</p>
          <el-select class="w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Trình độ học vấn</p>
          <el-select class="w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Hình thức làm việc</p>
          <el-select class="w-full" />
        </div>

        <div class="col-span-1">
          <p>Kinh nghiệm</p>
          <el-input class="mt-2 !h-10" />
        </div>
      </div>
    </dialog-form>

    <!-- Work Experience -->
    <dialog-form
      v-model:dialogVisible="showWorkExperience"
      title="Kinh nghiệm làm việc"
      @on-confirm="onSaveEditInformationGeneral"
    >
      <p>Vị trí công việc</p>
      <el-input class="mt-2 !h-10" />

      <p class="mt-4">Tên công ty</p>
      <el-input class="mt-2 !h-10" />

      <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
        <div class="col-span-1">
          <p class="mb-2">Ngày bắt đầu</p>
          <el-date-picker class="!w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Ngày kết thúc</p>
          <el-date-picker class="!w-full" />
        </div>
      </div>

      <p class="mt-4">Mô tả thêm</p>
      <el-input class="mt-2 !h-10" />
    </dialog-form>

    <!-- Education-->
    <dialog-form
      v-model:dialogVisible="showEducation"
      title="Thông tin học vấn"
      @on-confirm="onSaveEditInformationGeneral"
    >
      <p>Tên bằng cấp/Chứng chỉ</p>
      <el-input class="mt-2 !h-10" />

      <p class="mt-4">Chuyên ngành đào tạo</p>
      <el-input class="mt-2 !h-10" />

      <p class="mt-4">Trường/Trung tâm đào tạo</p>
      <el-input class="mt-2 !h-10" />

      <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
        <div class="col-span-1">
          <p class="mb-2">Ngày bắt đầu</p>
          <el-date-picker class="!w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Ngày kết thúc</p>
          <el-date-picker class="!w-full" />
        </div>
      </div>

      <p class="mt-4">Mô tả thêm</p>
      <el-input class="mt-2 !h-10" />
    </dialog-form>

    <!-- Certificate-->
    <dialog-form
      v-model:dialogVisible="showCertificate"
      title="Chứng chỉ"
      @on-confirm="onSaveEditInformationGeneral"
    >
      <p>Tên chứng chỉ</p>
      <el-input class="mt-2 !h-10" />

      <p class="mt-4">Trường/Trung tâm đào tạo</p>
      <el-input class="mt-2 !h-10" />

      <div class="grid grid-cols-2 gap-y-4 gap-x-10 mt-4">
        <div class="col-span-1">
          <p class="mb-2">Ngày bắt đầu</p>
          <el-date-picker class="!w-full" />
        </div>

        <div class="col-span-1">
          <p class="mb-2">Ngày hết hạn</p>
          <el-date-picker class="!w-full" />
        </div>
      </div>

      <p class="mt-4">Mô tả thêm</p>
      <el-input class="mt-2 !h-10" />
    </dialog-form>

    <!-- Language skill -->
    <dialog-form
      v-model:dialogVisible="showLanguageSkill"
      title="Kỹ năng ngoại ngữ"
      @on-confirm="onSaveEditInformationGeneral"
    >
      <p>Tên Kỹ năng</p>
      <el-input class="mt-2 !h-10" />

      <p class="mt-4">Trình độ</p>
      <div class="mx-1">
        <el-slider v-model="value1" :step="10" />
      </div>
    </dialog-form>

    <!-- Advanced skill -->
    <dialog-form
      v-model:dialogVisible="showAdvancedSkill"
      title="Kỹ năng chuyên môn"
      @on-confirm="onSaveEditInformationGeneral"
    >
      <p>Tên Kỹ năng</p>
      <el-input class="mt-2 !h-10" />

      <p class="mt-4">Trình độ</p>
      <div class="mx-1">
        <el-slider v-model="value1" :step="10" />
      </div>
    </dialog-form>
  </div>
</template>

<script setup lang="ts">
import {
  CMaritalStatus,
  CGender,
  CEducationLevel,
} from '@/utils/constant/common';
import { CJobLevel, CJobMode } from '@/utils/constant/job';

definePageMeta({
  layout: 'user-dashboard',
});

const userStore = useUserStore();

const showEditInformationGeneral = ref(false);
const showEditProfile = ref(false);
const showWorkExperience = ref(false);
const showEducation = ref(false);
const showCertificate = ref(false);
const showLanguageSkill = ref(false);
const showAdvancedSkill = ref(false);

const value1 = ref();

const onSaveEditInformationGeneral = () => {};

const userProfile = ref();
const { data } = await userStore.getMyProfile();
userProfile.value = data;
</script>

<style lang="scss">
.el-timeline-item__node--normal {
  @apply bg-[#1caf57];
}

.el-timeline-item__tail {
  @apply border-[#1caf5757]  #{!important};
}
</style>
