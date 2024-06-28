<template>
  <div
    class="mb-2 bg-white flex items-center border h-[150px] rounded-lg py-2 px-4 hover:bg-[#1caf5705] hover:border-[#1caf573f]"
  >
    <div class="w-full flex items-center justify-between">
      <div class="flex">
        <img
          :src="data.job.company?.avatar"
          class="w-24 h-24 object-contain border p-[2px] rounded-sm"
        />
        <div
          class="ml-4 cursor-pointer"
          @click="router.push(`/job/${data.job.id}`)"
        >
          <p class="font-bold text-lg truncate w-[500px]">
            {{ data.job.title }}
          </p>
          <p class="truncate w-[500px]">
            {{ data.job.company?.name }}
          </p>
          <p
            v-if="data.job.salaryMin && data.job.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{
              `${(data.job.salaryMin / 1000000).toFixed(1)} triệu - ${(data.job.salaryMax / 1000000).toFixed(1)} triệu`
            }}
          </p>
          <p
            v-if="!data.job.salaryMin && data.job.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Lên tới ${(data.job.salaryMax / 1000000).toFixed(1)} triệu` }}
          </p>
          <p
            v-if="data.job.salaryMin && !data.job.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Ít nhất ${(data.job.salaryMin / 1000000).toFixed(1)} triệu` }}
          </p>
          <p
            v-if="!data.job.salaryMin && !data.job.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `Thương lượng` }}
          </p>
          <div class="flex gap-x-1">
            <div
              v-for="(city, index) in data.job.cities"
              :key="index"
              class="text-sm"
            >
              {{ city.name }}
              <span v-if="index !== data.job.cities.length - 1">,</span>
            </div>
          </div>
          <p class="text-gray text-sm">
            Kết thúc: {{ formatDateShort(data.job.hiringEndDate) }}
          </p>
          <el-tag
            v-for="(tag, index) in data.job.tags"
            :key="index"
            class="mr-1"
            type="primary"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>

      <div>
        <div class="flex items-center">
          <img src="@/assets/images/tick-gray.svg" class="w-6" />
          <p class="text-sm text-[#a3a8ad] rounded-xl italic">
            Ứng tuyển lúc {{ formatDateFull(data.createdAt) }}
          </p>
          <!-- <img src="@/assets/images/heart-gray.svg" class="w-10 ml-4" /> -->
        </div>
        <div v-if="data.interviewSchedule" class="flex items-center">
          <img src="@/assets/images/time-gray.svg" class="w-[18px]" />
          <p class="ml-1 text-sm text-[#a3a8ad] rounded-xl itali">
            Lịch hẹn: {{ formatDateFull(data.interviewSchedule) }}
          </p>
          <!-- <img src="@/assets/images/heart-gray.svg" class="w-10 ml-4" /> -->
        </div>
        <p
          class="text-white text-sm py-[2px] px-2 mt-1 rounded-xl w-fit"
          :class="{
            'bg-[#e6a23c]':
              data.status === 0 || data.status === 3 || data.status === 4,
            'bg-[#409eff]': data.status === 1,
            'bg-danger': data.status === 2 || data.status === 6,
            'bg-primary': data.status === 5,
            'bg-[#c8c9cc]': data.status === 7,
          }"
        >
          TT: {{ CApplicationStatus[data.status].name }}
        </p>

        <!-- <div class="mt-5 flex gap-x-1"> <img src="@/assets/images/message-gray.svg" class="w-6 h-6"/><p>Nhắn tin</p></div> -->
        <el-button
          class="mt-4"
          :icon="ChatSquare"
          @click="redirectToMessagePage"
        >
          Nhắn tin
        </el-button>
        <div class="mt-1 flex justify-between items-center hover:underline">
          <div
            class="text-sm flex cursor-pointer"
            @click.stop="handleShowPreviewCV(data)"
          >
            <img
              v-if="data.cvType === EPublicCvType.ATTACHMENT_CV"
              src="@/assets/images/pdf-danger.svg"
              class="w-3 cursor-pointer"
            />
            <img
              v-if="data.cvType === EPublicCvType.SYSTEM_CV"
              src="@/assets/images/pdf-blue.svg"
              class="w-3 cursor-pointer"
            />
            <p class="ml-1 font-bold">
              {{
                data.cvType === EPublicCvType.ATTACHMENT_CV
                  ? 'Hồ sơ đính kèm'
                  : 'Hồ sơ Job Nest'
              }}
            </p>
          </div>
          <!-- <el-button round size="default" class="!h-7">Hủy ứng tuyển</el-button> -->
        </div>
      </div>
    </div>
  </div>

  <dialog-preview-cv-attachment
    v-model:dialog-visible="showCVPreview"
    :url="urlCVPreview"
  />

  <dialog-preview-cv-system
    v-if="showCVPreviewSystem"
    v-model:dialog-visible="showCVPreviewSystem"
    :data="dataCvSystem"
  />
</template>

<script setup lang="ts">
import { ChatSquare } from '@element-plus/icons-vue';
import { CApplicationStatus } from '~/utils/constant/common';

const props = defineProps({
  data: {
    type: Object,
    default: () => InitJob,
  },
  label: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter();

const urlCVPreview = ref('');
const dataCvSystem = ref();
const showCVPreview = ref(false);
const showCVPreviewSystem = ref(false);

const handleShowPreviewCV = (data: any) => {
  // urlCVPreview.value = url;
  // showCVPreview.value = true;
  const typeCV = data.cvType;
  if (typeCV === EPublicCvType.ATTACHMENT_CV) {
    urlCVPreview.value = `${data.candidateCv}`;
    showCVPreview.value = true;
  } else if (typeCV === EPublicCvType.SYSTEM_CV) {
    showCVPreviewSystem.value = true;
    dataCvSystem.value = {
      avatar: data.user.avatar,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      phoneNumber: data.user.phoneNumber,
      gender: data.user.gender,
      maritalStatus: data.user.maritalStatus,
      dob: data.user.dob,
      address: data.user.address,
      district: data.user.district,
      city: data.user.city,
      candidateInformation: data.systemCv,
    };
  }
};

const conversationStore = useConversationStore();

const redirectToMessagePage = async () => {
  const isLogin = handleCheckLogin();
  if (!isLogin) return;

  const conversation = await conversationStore.createConversation({
    withUserId: props.data?.job?.creator?.id,
  });

  router.push(`/user/message?id=${conversation.id}`);
};
</script>

<style scoped></style>
