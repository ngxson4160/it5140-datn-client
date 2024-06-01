<template>
  <el-dialog
    v-model="syncDialogVisible"
    center
    align-center
    width="1200px"
    class="my-10"
  >
    <div class="h-[750px] overflow-auto">
      <div class="flex gap-x-8 mt-6 mx-6">
        <div>
          <img
            :src="data?.avatar"
            class="rounded-full w-[150px] h-[150px] border object-contain"
          />
        </div>
        <div>
          <p class="text-xl font-bold">
            {{
              data?.firstName
                ? `${data?.firstName} ${data?.lastName}`
                : data?.candidateName
            }}
          </p>
          <p>Email: {{ data?.email || data?.candidateEmail }}</p>
          <p>
            Số điện thoại: {{ data.phoneNumber || data.candidatePhoneNumber }}
          </p>
          <p>
            Giới tính:
            {{ data.gender !== null ? CGender[data?.gender]?.name : '' }}
          </p>
          <p>
            Tình trạng hôn nhân:
            {{
              data.maritalStatus !== null
                ? CMaritalStatus[data?.maritalStatus]?.name
                : ''
            }}
          </p>
          <p>Ngày sinh: {{ data?.dob ? formatDateShort(data?.dob) : '' }}</p>
          <p>
            Địa chỉ:
            {{
              `${data?.address ? data?.address + ', ' : ''}${data?.district ? data?.district?.name + ', ' : ''}${data.city?.name || ''}`
            }}
          </p>
        </div>
      </div>

      <div class="w-full rounded-sm bg-white px-6 py-4 mt-4">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Thông tin chung</p>
        </div>
        <p class="font-bold">Mục tiêu nghề nghiệp</p>
        <p class="text-sm">
          {{ data.candidateInformation?.target || '' }}
        </p>
        <div class="grid grid-cols-2 mt-6 gap-y-6">
          <div class="col-span-1">
            <p class="font-bold">Ví trị mong muốn</p>
            <p class="text-sm">
              {{
                data.candidateInformation?.desiredJobCategory
                  ? data.candidateInformation.desiredJobCategory?.name
                  : ''
              }}
            </p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Số năm kinh nghiệm</p>
            <p class="text-sm">
              {{ data.candidateInformation?.yearExperience || '' }}
            </p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Cấp bậc mong muốn</p>
            <p class="text-sm">
              {{
                data?.candidateInformation?.desiredJobLevel
                  ? CJobLevel[data.candidateInformation?.desiredJobLevel]?.name
                  : ''
              }}
            </p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Mức lương mong muốn</p>
            <p class="text-sm">
              {{ data.candidateInformation?.desiredSalary || '' }}
              VND
            </p>
          </div>

          <div class="col-span-1">
            <p class="font-bold">Trình độ học vấn</p>
            <p class="text-sm">
              {{
                data?.educationalLevel !== null
                  ? CEducationLevel[data.educationalLevel]?.name
                  : ''
              }}
            </p>
          </div>
          <div class="col-span-1">
            <p class="font-bold">Hình thức làm việc mong muốn</p>
            <p class="text-sm">
              {{
                data?.candidateInformation?.desiredJobMode
                  ? CJobMode[data.candidateInformation.desiredJobMode]?.name
                  : ''
              }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-full rounded-sm bg-white px-6 py-4 mt-4">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Kinh nghiệm làm việc</p>
        </div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(workExperience, index) in data.candidateInformation
              ?.workExperience"
            :key="index"
            class="relative"
            :timestamp="`${formatDateShort(workExperience?.start)} - ${workExperience?.end ? formatDateShort(workExperience?.end) : 'Hiện tại'} `"
            placement="top"
          >
            <div>
              <p class="font-bold text-base">
                {{ workExperience?.position }}
              </p>
              <p>{{ workExperience?.companyName }}</p>
              <p>{{ workExperience?.description }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div class="w-full rounded-sm bg-white px-6 py-4 mt-4">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Thông tin học vấn</p>
        </div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(education, index) in data.candidateInformation?.education"
            :key="index"
            class="relative"
            :timestamp="`${formatDateShort(education?.start)} - ${education?.end ? formatDateShort(education?.end) : 'Hiện tại'}`"
            placement="top"
          >
            <div>
              <p class="font-bold text-base">
                {{ education?.name }}
              </p>
              <p class="text-sm">{{ education?.organization }}</p>
              <p class="text-sm">{{ education?.major }}</p>
              <p class="text-sm">{{ education?.description }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div class="w-full rounded-sm bg-white px-6 py-4 mt-4">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Chứng chỉ</p>
        </div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(certificate, index) in data.candidateInformation
              ?.certificate"
            :key="index"
            class="relative"
            :timestamp="`${formatDateShort(certificate?.start)} - ${certificate?.end ? formatDateShort(certificate?.end) : 'Vô thời hạn'}`"
            placement="top"
          >
            <div>
              <p class="font-bold text-base">
                {{ certificate?.name }}
              </p>
              <p class="text-sm">{{ certificate?.organization }}</p>
              <p class="text-sm">{{ certificate?.description }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div class="w-full rounded-sm bg-white px-6 py-4 mt-4">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Kỹ năng chuyên môn</p>
        </div>
        <div class="pb-1 grid grid-cols-3 gap-y-2 gap-x-4 border-b">
          <p class="col-span-1">Kỹ năng</p>
          <p class="col-span-1">Trình độ</p>
        </div>
        <div
          v-for="(advancedSkill, index) in data.candidateInformation
            ?.advancedSkill"
          :key="index"
          class="grid grid-cols-3 border-b py-1 gap-x-4 items-center"
        >
          <p class="col-span-1">{{ advancedSkill?.name }}</p>
          <el-progress
            class="col-span-2 mr-6"
            :percentage="advancedSkill?.level"
            status="success"
            :show-text="false"
          />
        </div>
      </div>

      <div class="w-full rounded-sm bg-white px-6 pt-4 mt-4">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Kỹ năng ngoại ngữ</p>
        </div>
        <div class="pb-1 grid grid-cols-3 gap-y-2 gap-x-4 border-b">
          <p class="col-span-1">Ngôn ngữ</p>
          <p class="col-span-1">Trình độ</p>
        </div>

        <div
          v-for="(languageSkill, index) in data.candidateInformation
            ?.languageSkill"
          :key="index"
          class="grid grid-cols-3 border-b py-1 gap-x-4 items-center"
        >
          <p class="col-span-1">{{ languageSkill?.name }}</p>
          <el-progress
            class="col-span-2 mr-6"
            :percentage="languageSkill?.level"
            status="success"
            :show-text="false"
          />
        </div>
      </div>

      <div class="w-full rounded-sm bg-white px-6 py-4 mt-4">
        <div class="flex mb-6 t justify-between items-center">
          <p class="font-bold text-xl">Dự án đã làm</p>
        </div>
        <el-timeline style="max-width: 600px">
          <el-timeline-item
            v-for="(project, index) in data.candidateInformation?.project"
            :key="index"
            class="relative"
            :timestamp="`${formatDateShort(project?.start)} - ${project?.end ? formatDateShort(project?.end) : 'Hiện tại'} `"
            placement="top"
          >
            <div>
              <p class="font-bold text-base">
                {{ project?.name }}
              </p>
              <div class="tiptap" v-html="project?.description"></div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <template #footer>
      <el-button
        type="primary"
        class="w-[150px]"
        @click="syncDialogVisible = false"
      >
        Đóng
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  CEducationLevel,
  CGender,
  CMaritalStatus,
} from '~/utils/constant/common';
import { CJobLevel, CJobMode } from '~/utils/constant/job';

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['update:dialogVisible', 'onConfirm']);

const syncDialogVisible = computed({
  get: () => props.dialogVisible,
  set: (value: boolean) => {
    return emits('update:dialogVisible', value);
  },
});
</script>
