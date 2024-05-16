<template>
  <div class="border rounded-lg px-4 py-2">
    <div class="flex justify-between">
      <div class="text-sm">
        <p class="font-bold mb-2">
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
          <img src="@/assets/images/people-tie-gray.svg" class="w-[18px]" />
          <p>
            {{ CJobLevel[data.candidateInformation?.desiredJobLevel]?.name }}
          </p>
        </div>
        <div class="flex gap-x-2 items-center mb-1">
          <img src="@/assets/images/education-gray.svg" class="w-5" />
          <p>
            {{ CEducationLevel[data.educationalLevel]?.name }}
          </p>
        </div>
        <div class="flex gap-x-2 mt-2">
          <div
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
            class="flex gap-x-1 justify-center items-center rounded-full bg-[#e0ebf7] px-2 py-[2px] text-xs"
          >
            <img src="@/assets/images/location-gray.svg" class="w-5" />
            <p>{{ data?.city?.name }}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-end gap-x-2">
          <img
            src="@/assets/images/heart-gray.svg"
            class="w-5 cursor-pointer"
          />
          <img src="@/assets/images/view-gray.svg" class="w-6 cursor-pointer" />
          <img
            src="@/assets/images/message-gray.svg"
            class="w-6 cursor-pointer"
          />
        </div>
        <p class="text-sm mt-4">
          {{ `Cập nhật lúc ${formatDateFull(data?.updatedAt)}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CEducationLevel } from '~/utils/constant/common';
import { CJobLevel } from '~/utils/constant/job';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
