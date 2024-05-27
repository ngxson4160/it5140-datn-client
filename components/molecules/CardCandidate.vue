<template>
  <div class="border rounded-lg px-4 py-2">
    <div class="flex justify-between">
      <div class="text-sm">
        <p class="font-bold mb-2 text-base">
          {{
            `${data?.firstName} ${data?.lastName} (${calcAge(data?.dob)} tuổi)`
          }}
        </p>
        <p class="mb-1">
          {{ data.candidateInformation?.desiredJobCategory?.name }}
        </p>
        <div class="flex gap-x-2 items-center mb-1">
          <img src="@/assets/images/mail-gray.svg" class="w-5" />
          <p class="">{{ data.email }}</p>
        </div>

        <div class="flex gap-x-2 items-center mb-1">
          <img src="@/assets/images/phone-gray.svg" class="w-5" />
          <p class="">{{ data.phoneNumber }}</p>
        </div>
        <div class="flex gap-x-2 items-center mb-1">
          <img
            v-if="CJobLevel[data.candidateInformation?.desiredJobLevel]?.name"
            src="@/assets/images/people-tie-gray.svg"
            class="w-[18px]"
          />
          <p>
            {{ CJobLevel[data.candidateInformation?.desiredJobLevel]?.name }}
          </p>
        </div>
        <div class="flex gap-x-2 items-center mb-1">
          <img
            v-if="CEducationLevel[data.educationalLevel]?.name"
            src="@/assets/images/education-gray.svg"
            class="w-5"
          />
          <p>
            {{ CEducationLevel[data.educationalLevel]?.name }}
          </p>
        </div>
        <div class="flex gap-x-2 mt-2">
          <div
            v-if="data.candidateInformation?.desiredSalary"
            class="flex gap-x-1 justify-center items-center rounded-full bg-[#e0ebf7] px-2 py-[2px] text-xs"
          >
            <img src="@/assets/images/dollar-circle-gray.svg" class="w-5" />
            <p>
              {{
                `${data.candidateInformation?.desiredSalary / 1000000} triệu`
              }}
            </p>
          </div>

          <div
            v-if="data.candidateInformation?.yearExperience"
            class="flex gap-x-1 justify-center items-center rounded-full bg-[#e0ebf7] px-2 py-[2px] text-xs"
          >
            <img src="@/assets/images/hourglass-gray.svg" class="w-5" />
            <p>
              {{
                `${data.candidateInformation?.yearExperience} năm kinh nhiệm`
              }}
            </p>
          </div>

          <div
            v-if="data?.city?.name"
            class="flex gap-x-1 justify-center items-center rounded-full bg-[#e0ebf7] px-2 py-[2px] text-xs"
          >
            <img src="@/assets/images/location-gray.svg" class="w-5" />
            <p>{{ data?.city?.name }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between">
        <div class="flex items-center justify-end gap-x-3">
          <img
            src="@/assets/images/heart-gray.svg"
            class="w-7 cursor-pointer"
          />
          <img
            src="@/assets/images/message-gray.svg"
            class="w-7 cursor-pointer"
            @click="handleRedirectToMessagePage"
          />
        </div>
        <div class="text-sm mt-4">
          <div
            class="flex justify-end mb-1 items-center gap-x-2 cursor-pointer hover:underline"
            @click="handleViewCV(data)"
          >
            <img
              v-if="
                data?.candidateInformation?.publicCvType ===
                EPublicCvType.ATTACHMENT_CV
              "
              src="@/assets/images/pdf-danger.svg"
              class="w-3 cursor-pointer"
            />
            <img
              v-if="
                data?.candidateInformation?.publicCvType ===
                EPublicCvType.SYSTEM_CV
              "
              src="@/assets/images/pdf-blue.svg"
              class="w-3 cursor-pointer"
            />
            <p class="font-bold">
              {{
                data?.candidateInformation?.publicCvType ===
                EPublicCvType.ATTACHMENT_CV
                  ? 'Hồ sơ đính kèm'
                  : 'Hồ sơ Job Nest'
              }}
            </p>
          </div>
          <p>{{ `Cập nhật lần cuối: ${formatDateShort(data?.updatedAt)}` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CEducationLevel } from '~/utils/constant/common';
import { CJobLevel } from '~/utils/constant/job';
import { EPublicCvType } from '~/utils/enum';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['onViewCv', 'onRedirectMessagePage']);

const handleViewCV = (data: any) => {
  emits('onViewCv', data);
};

const handleRedirectToMessagePage = () => {
  emits('onRedirectMessagePage');
};
</script>

<style scoped></style>
