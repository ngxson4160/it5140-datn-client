<template>
  <div class="flex">
    <div class="flex-1">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="Danh sách hồ sơ" name="general">
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
                  {{
                    `${userStore.myProfile.firstName} ${userStore.myProfile.lastName}`
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Tỉnh/Thành phố</p>
                <p class="text-sm">
                  {{ userStore.myProfile.city?.name || '' }}
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Số điện thoại</p>
                <p class="text-sm">{{ userStore.myProfile.phoneNumber }}</p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Quận/Huyện</p>
                <p class="text-sm">
                  {{ userStore.myProfile?.district?.name || '' }}
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Giới tính</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.gender !== null
                      ? CGender[userStore.myProfile?.gender].name
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Địa chỉ</p>
                <p class="text-sm">{{ userStore.myProfile?.address || '' }}</p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Ngày sinh</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile?.dob
                      ? formatDateShort(userStore.myProfile?.dob)
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Tình trạng hôn nhân</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.maritalStatus !== null
                      ? CMaritalStatus[userStore.myProfile?.maritalStatus].name
                      : ''
                  }}
                </p>
              </div>
            </div>
          </div>

          <div id="part2" class="w-full rounded-sm bg-white px-6 py-4 my-4">
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
              {{ userStore.myProfile.candidateInformation?.target || '' }}
            </p>
            <div class="grid grid-cols-2 mt-6 gap-y-6">
              <div class="col-span-1">
                <p class="font-bold">Ví trị mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.desiredJobCategory
                      ? userStore.myProfile.candidateInformation
                          .desiredJobCategory?.name
                      : ''
                  }}
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Số năm kinh nghiệm</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.yearExperience ||
                    ''
                  }}
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Cấp bậc mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation
                      ?.desiredJobLevel !== null
                      ? CJobLevel[
                          userStore.myProfile.candidateInformation
                            .desiredJobLevel
                        ].name
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Mức lương mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.desiredSalary ||
                    ''
                  }}
                  VND
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Trình độ học vấn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile?.educationalLevel !== null
                      ? CEducationLevel[userStore.myProfile.educationalLevel]
                          .name
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Hình thức làm việc mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.desiredJobMode !==
                    null
                      ? CJobMode[
                          userStore.myProfile.candidateInformation
                            .desiredJobMode
                        ].name
                      : ''
                  }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white px-4 py-6 mr-4">
            <div class="flex justify-between">
              <p class="font-bold text-xl">Hồ sơ Job Nest</p>
              <div>
                <div
                  class="flex gap-x-1 items-center rounded-full bg-[#f2f5f8] px-2 cursor-pointer"
                  :class="
                    userStore.myProfile.candidateInformation?.publicCvType ===
                    EPublicCvType.SYSTEM_CV
                      ? 'is-public-cv'
                      : 'custom-public-cv'
                  "
                  @click="openDialogPublicSystemCV"
                >
                  <el-rate max="1" :void-icon="StarFilled" clearable />
                  <p>Cho phép tìm kiếm</p>
                </div>
                <el-button
                  class="mt-2"
                  type="warning"
                  :icon="View"
                  round
                  @click="showCVPreviewSystem = true"
                >
                  Xem như nhà tuyển dụng
                </el-button>
              </div>
            </div>

            <div class="flex gap-x-8 mt-6 mx-4">
              <div>
                <img
                  :src="userStore.myProfile?.avatar"
                  class="rounded-full w-[150px] h-[150px] border object-contain"
                />
              </div>
              <div>
                <p class="text-lg font-bold">Nguyễn Xuân Sơn</p>
                <p class="text-sm font-bold">
                  {{
                    userStore.myProfile.candidateInformation?.desiredJobCategory
                      ? userStore.myProfile.candidateInformation
                          .desiredJobCategory?.name
                      : ''
                  }}
                </p>
                <div class="flex items-center gap-x-1 mb-[2px]">
                  <img src="@/assets/images/hourglass-gray.svg" class="w-5" />
                  <p class="text-sm">
                    Kinh nghiệm:
                    {{
                      userStore.myProfile.candidateInformation
                        ?.yearExperience || ''
                    }}
                    năm
                  </p>
                </div>
                <div class="flex items-center gap-x-1 mb-[2px]">
                  <img src="@/assets/images/medal-gray.svg" class="w-5" />
                  <p class="text-sm">
                    Cấp bậc mong muốn:
                    {{
                      userStore.myProfile.candidateInformation
                        ?.desiredJobLevel !== null
                        ? CJobLevel[
                            userStore.myProfile.candidateInformation
                              .desiredJobLevel
                          ].name
                        : ''
                    }}
                  </p>
                </div>
                <div class="flex items-center gap-x-1 mb-[2px]">
                  <img
                    src="@/assets/images/dollar-circle-gray.svg"
                    class="w-5"
                  />
                  <p class="text-sm">
                    Mức lương mong muốn:
                    {{
                      userStore.myProfile.candidateInformation?.desiredSalary ||
                      ''
                    }}
                    VND
                  </p>
                </div>
                <div class="flex items-center gap-x-1">
                  <img src="@/assets/images/time-gray.svg" class="w-[19px]" />
                  <p class="text-sm">
                    Ngày cập nhật:
                    {{ formatDateFull(userStore.myProfile.updatedAt) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex justify-center mt-4">
              <el-button type="primary" @click="activeName = 'system-cv'">
                Chỉnh sửa hồ sơ
              </el-button>
            </div>
          </div>

          <div class="rounded-sm bg-white px-6 py-4 mt-4 mb-20 mr-4">
            <div class="flex mb-6 items-center">
              <p class="font-bold text-xl">
                Hồ sơ đính kèm
                <span class="font-bold text-xl text-danger">
                  {{
                    `(${userStore.myProfile.candidateInformation?.cv.length ?? 0})`
                  }}
                </span>
              </p>
            </div>
            <div class="flex gap-4 flex-wrap">
              <div
                v-for="(cv, index) in userStore.myProfile.candidateInformation
                  ?.cv"
                :key="index"
                class="relative"
              >
                <iframe
                  :src="`${cv?.url}#toolbar=0&navpanes=0&scrolling=0`"
                  class="border rounded-lg !overflow-hidden w-[220px] h-[283px] !m-0"
                ></iframe>
                <div class="absolute inset-0 bg-[#0000001a]"></div>
                <div
                  class="h-7 absolute right-4 top-4 flex items-center rounded-full bg-[#f2f5f8] px-1 cursor-pointer"
                  :class="
                    userStore.myProfile.candidateInformation?.publicCvType ===
                      EPublicCvType.ATTACHMENT_CV &&
                    cv?.url ===
                      userStore.myProfile.candidateInformation
                        ?.publicAttachmentCv
                      ? 'is-public-cv'
                      : 'custom-public-cv'
                  "
                  @click="openDialogPublicAttachmentCV(cv?.title, cv?.url)"
                >
                  <el-rate max="1" :void-icon="StarFilled" clearable />
                  <p class="text-sm">Cho phép tìm kiếm</p>
                </div>
                <div class="absolute inset-x-0 bottom-6">
                  <p
                    class="text-center mb-4 font-bold text-[15px] truncate px-2"
                  >
                    {{ cv?.title }}
                  </p>
                </div>
                <div class="absolute flex right-4 bottom-2">
                  <el-button
                    type="warning"
                    :icon="View"
                    circle
                    @click="handleShowPreviewAttachmentCV(cv?.url)"
                  />
                  <el-button
                    type="danger"
                    :icon="Delete"
                    circle
                    @click="onShowDeleteCV(index)"
                  />
                </div>
              </div>
            </div>
            <div class="mt-6 mx-auto w-[750px]">
              <drag-to-upload @on-success="onAddCV" />
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Hồ sơ đính kèm" name="system-cv">
          <!-- <div id="part1" class="w-full rounded-sm bg-white px-6 py-4">
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
                  {{
                    `${userStore.myProfile.firstName} ${userStore.myProfile.lastName}`
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Tỉnh/Thành phố</p>
                <p class="text-sm">
                  {{ userStore.myProfile.city?.name || '' }}
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Số điện thoại</p>
                <p class="text-sm">{{ userStore.myProfile.phoneNumber }}</p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Quận/Huyện</p>
                <p class="text-sm">
                  {{ userStore.myProfile?.district?.name || '' }}
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Giới tính</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.gender !== null
                      ? CGender[userStore.myProfile?.gender].name
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Địa chỉ</p>
                <p class="text-sm">{{ userStore.myProfile?.address || '' }}</p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Ngày sinh</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile?.dob
                      ? formatDateShort(userStore.myProfile?.dob)
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Tình trạng hôn nhân</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.maritalStatus !== null
                      ? CMaritalStatus[userStore.myProfile?.maritalStatus].name
                      : ''
                  }}
                </p>
              </div>
            </div>
          </div>

          <div id="part2" class="w-full rounded-sm bg-white px-6 py-4 mt-4">
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
              {{ userStore.myProfile.candidateInformation?.target || '' }}
            </p>
            <div class="grid grid-cols-2 mt-6 gap-y-6">
              <div class="col-span-1">
                <p class="font-bold">Ví trị mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.desiredJobCategory
                      ? userStore.myProfile.candidateInformation
                          .desiredJobCategory?.name
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Địa điểm làm việc mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.desiredCity
                      ? userStore.myProfile.candidateInformation.desiredCity
                          ?.name
                      : ''
                  }}
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Cấp bậc mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation
                      ?.desiredJobLevel !== null
                      ? CJobLevel[
                          userStore.myProfile.candidateInformation
                            .desiredJobLevel
                        ].name
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Mức lương mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.desiredSalary ||
                    ''
                  }}
                  VND
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Trình độ học vấn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile?.educationalLevel !== null
                      ? CEducationLevel[userStore.myProfile.educationalLevel]
                          .name
                      : ''
                  }}
                </p>
              </div>
              <div class="col-span-1">
                <p class="font-bold">Hình thức làm việc mong muốn</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.desiredJobMode !==
                    null
                      ? CJobMode[
                          userStore.myProfile.candidateInformation
                            .desiredJobMode
                        ].name
                      : ''
                  }}
                </p>
              </div>

              <div class="col-span-1">
                <p class="font-bold">Số năm kinh nghiệm</p>
                <p class="text-sm">
                  {{
                    userStore.myProfile.candidateInformation?.yearExperience ||
                    ''
                  }}
                </p>
              </div>
            </div>
          </div> -->

          <div id="part3" class="w-full rounded-sm bg-white px-6 py-4">
            <div class="flex mb-6 t justify-between items-center">
              <p class="font-bold text-xl">Kinh nghiệm làm việc</p>
              <img
                src="@/assets/images/add-primary.svg"
                class="cursor-pointer w-10"
                @click="onShowDialogAddWorkExperience"
              />
            </div>
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="(workExperience, index) in userStore.myProfile
                  .candidateInformation?.workExperience"
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
                <div class="absolute top-0 left-[250px]">
                  <action
                    @edit="
                      onShowDialogEditWorkExperience(workExperience, index)
                    "
                    @delete="onDeleteWorkExperience(index)"
                  />
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>

          <div id="part5" class="w-full rounded-sm bg-white px-6 py-4 mt-4">
            <div class="flex mb-6 t justify-between items-center">
              <p class="font-bold text-xl">Thông tin học vấn</p>
              <img
                src="@/assets/images/add-primary.svg"
                class="cursor-pointer w-10"
                @click="onShowDialogAddEducation"
              />
            </div>
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="(education, index) in userStore.myProfile
                  .candidateInformation?.education"
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
                <div class="absolute top-0 left-[250px]">
                  <action
                    @edit="onShowDialogEditEducation(education, index)"
                    @delete="onDeleteEducation(index)"
                  />
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>

          <div id="part6" class="w-full rounded-sm bg-white px-6 py-4 mt-4">
            <div class="flex mb-6 t justify-between items-center">
              <p class="font-bold text-xl">Chứng chỉ</p>
              <img
                src="@/assets/images/add-primary.svg"
                class="cursor-pointer w-10"
                @click="onShowDialogAddCertificate"
              />
            </div>
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="(certificate, index) in userStore.myProfile
                  .candidateInformation?.certificate"
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
                <div class="absolute top-0 left-[250px]">
                  <action
                    @edit="onShowDialogEditCertificate(certificate, index)"
                    @delete="onDeleteCertificate(index)"
                  />
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>

          <div id="part8" class="w-full rounded-sm bg-white px-6 py-4 mt-4">
            <div class="flex mb-6 t justify-between items-center">
              <p class="font-bold text-xl">Kỹ năng chuyên môn</p>
              <img
                src="@/assets/images/add-primary.svg"
                class="cursor-pointer w-10"
                @click="onShowDialogAddAdvancedSkill"
              />
            </div>
            <div class="pb-1 grid grid-cols-3 gap-y-2 gap-x-4 border-b">
              <p class="col-span-1">Kỹ năng</p>
              <p class="col-span-1">Trình độ</p>
              <p class="col-span-1">Hành động</p>
            </div>
            <div
              v-for="(advancedSkill, index) in userStore.myProfile
                .candidateInformation?.advancedSkill"
              :key="index"
              class="grid grid-cols-3 border-b py-1 gap-x-4 items-center"
            >
              <p class="col-span-1">{{ advancedSkill?.name }}</p>
              <el-progress
                :percentage="advancedSkill?.level"
                status="success"
                :show-text="false"
              />
              <div class="col-span-1">
                <action
                  @edit="onShowDialogEditAdvancedSkill(advancedSkill, index)"
                  @delete="onDeleteAdvancedSkill(index)"
                />
              </div>
            </div>
          </div>

          <div id="part7" class="w-full rounded-sm bg-white px-6 pt-4 mt-4">
            <div class="flex mb-6 t justify-between items-center">
              <p class="font-bold text-xl">Kỹ năng ngoại ngữ</p>
              <img
                src="@/assets/images/add-primary.svg"
                class="cursor-pointer w-10"
                @click="onShowDialogAddLanguageSkill"
              />
            </div>
            <div class="pb-1 grid grid-cols-3 gap-y-2 gap-x-4 border-b">
              <p class="col-span-1">Ngôn ngữ</p>
              <p class="col-span-1">Trình độ</p>
              <p class="col-span-1">Hành động</p>
            </div>

            <div
              v-for="(languageSkill, index) in userStore.myProfile
                .candidateInformation?.languageSkill"
              :key="index"
              class="grid grid-cols-3 border-b py-1 gap-x-4 items-center"
            >
              <p class="col-span-1">{{ languageSkill?.name }}</p>
              <el-progress
                :percentage="languageSkill?.level"
                status="success"
                :show-text="false"
              />
              <div class="col-span-1">
                <action
                  @edit="onShowDialogEditLanguageSkill(languageSkill, index)"
                  @delete="onDeleteLanguageSkill(index)"
                />
              </div>
            </div>
          </div>

          <div
            id="part9"
            class="w-full rounded-sm bg-white px-6 py-4 mt-4 mb-[104px]"
          >
            <div class="flex mb-6 t justify-between items-center">
              <p class="font-bold text-xl">Dự án đã làm</p>
              <img
                src="@/assets/images/add-primary.svg"
                class="cursor-pointer w-10"
                @click="onShowDialogAddProject"
              />
            </div>
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="(project, index) in userStore.myProfile
                  .candidateInformation?.project"
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
                  <!-- <p>{{ project?.description }}</p> -->
                </div>
                <div class="absolute top-0 left-[250px]">
                  <action
                    @edit="onShowDialogEditProject(project, index)"
                    @delete="onDeleteProject(index)"
                  />
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- Information General -->
    <dialog-edit-information
      v-if="showEditInformationGeneral"
      v-model:dialogVisible="showEditInformationGeneral"
      :data="formDataEditInformation"
      @on-confirm="onSaveEditInformationGeneral"
    />

    <!-- Information General -->
    <dialog-information-general
      v-if="showEditProfile"
      v-model:dialogVisible="showEditProfile"
      :data="formDataInformationGeneral"
      @on-confirm="onSaveEditInformationGeneral"
    />

    <!-- Work Experience -->
    <dialog-work-experience
      v-if="showWorkExperience"
      v-model:dialogVisible="showWorkExperience"
      :data="formDataWorkExperience"
      @on-confirm="onAddWorkExperience"
    />

    <!-- Education-->
    <dialog-education
      v-if="showEducation"
      v-model:dialogVisible="showEducation"
      :data="formDataEducation"
      @on-confirm="onUpdateEducation"
    />

    <!-- Certificate-->
    <dialog-certificate
      v-if="showCertificate"
      v-model:dialogVisible="showCertificate"
      :data="formDataCertificate"
      @on-confirm="onUpdateCertificate"
    />

    <!-- Advanced skill -->
    <dialog-advanced-skill
      v-if="showAdvancedSkill"
      v-model:dialogVisible="showAdvancedSkill"
      :data="formDataAdvancedSkill"
      @on-confirm="onUpdateAdvancedSkill"
    />

    <!-- Language skill -->
    <dialog-language-skill
      v-if="showLanguageSkill"
      v-model:dialogVisible="showLanguageSkill"
      :data="formDataLanguageSkill"
      @on-confirm="onUpdateLanguageSkill"
    />

    <!-- Delete CV -->
    <dialog-confirm-delete
      v-model:dialogVisible="isShowDialogConfirmDeleteCV"
      @on-confirm="onDeleteCV()"
    />

    <!-- Project -->
    <dialog-project
      v-if="showProject"
      v-model:dialogVisible="showProject"
      :data="formDataProject"
      @on-confirm="onAddProject"
    />

    <!-- Public system CV -->
    <dialog-confirm-action
      v-model:dialogVisible="showDialogPublicSystemCV"
      @on-confirm="handlePublicSystemCV()"
    >
      <template #default>
        <p>Xác nhận cho phép tìm kiếm hồ sơ Job Nest?</p>
        <p class="mt-2">
          Lưu ý điền đầy đủ
          <span class="font-bold">Thông tin cá nhân</span>
          và
          <span class="font-bold">Thông tin chung</span>
          để nhà tuyển dụng có thể dễ dàng tìm thấy bạn.
        </p>
      </template>
    </dialog-confirm-action>

    <!-- Public attachment CV -->
    <dialog-confirm-action
      v-model:dialogVisible="showDialogPublicAttachmentCV"
      @on-confirm="handlePublicAttachmentCV(attachmentCVUrl)"
    >
      <template #default>
        <p>{{ `Xác nhận cho phép tìm kiếm hồ sơ '${attachmentCVTitle}'?` }}</p>
        <p class="mt-2">
          Lưu ý điền đầy đủ
          <span class="font-bold">Thông tin cá nhân</span>
          và
          <span class="font-bold">Thông tin chung</span>
          để nhà tuyển dụng có thể dễ dàng tìm thấy bạn.
        </p>
      </template>
    </dialog-confirm-action>

    <!-- Public attachment CV -->
    <dialog-confirm-action
      v-model:dialogVisible="showNotPublicCV"
      @on-confirm="handleNotPublicCV"
    >
      <template #default>
        <p>Xác nhận hủy chia sẻ hồ sơ này?</p>
        <p>
          Nếu thực hiện hành động này nhà tuyển dụng sẽ không tìm thấy hồ sơ của
          bạn nữa!
        </p>
      </template>
    </dialog-confirm-action>

    <!-- Preview CV -->
    <dialog-preview-cv-system
      v-if="showCVPreviewSystem"
      v-model:dialog-visible="showCVPreviewSystem"
      :data="userStore.myProfile"
    />
    <dialog-preview-cv-attachment
      v-if="showCVPreviewAttachment"
      v-model:dialog-visible="showCVPreviewAttachment"
      :url="urlCVPreview"
    />
  </div>
</template>

<script setup lang="ts">
import { View, Delete, StarFilled } from '@element-plus/icons-vue';
import {
  CMaritalStatus,
  CGender,
  CEducationLevel,
} from '@/utils/constant/common';
import { CJobLevel, CJobMode } from '@/utils/constant/job';

definePageMeta({
  layout: 'user-dashboard',
  middleware: ['redirect'],
});

const activeName = ref('general');

const userStore = useUserStore();

const showEditInformationGeneral = ref(false);
const showEditProfile = ref(false);
const showWorkExperience = ref(false);
const showEducation = ref(false);
const showCertificate = ref(false);
const showAdvancedSkill = ref(false);
const showLanguageSkill = ref(false);
const showProject = ref(false);
const showCVPreviewAttachment = ref(false);
const showCVPreviewSystem = ref(false);

const urlCVPreview = ref('');

await userStore.getMyProfile();

const formDataEditInformation = ref({
  firstName: userStore.myProfile.firstName,
  lastName: userStore.myProfile.lastName,
  phoneNumber: userStore.myProfile.phoneNumber,
  dob: userStore.myProfile.dob,
  gender: userStore.myProfile.gender,
  cityId: userStore.myProfile.cityId,
  districtId: userStore.myProfile.districtId,
  address: userStore.myProfile.address,
  maritalStatus: userStore.myProfile.maritalStatus,
});

const formDataInformationGeneral = ref({
  target: userStore.myProfile.candidateInformation?.target,
  desiredJobCategoryId:
    userStore.myProfile.candidateInformation?.desiredJobCategoryId,
  educationalLevel: userStore.myProfile.educationalLevel,
  desiredCityId: userStore.myProfile.candidateInformation?.desiredCityId,
  desiredJobLevel: userStore.myProfile.candidateInformation?.desiredJobLevel,
  desiredSalary: userStore.myProfile.candidateInformation?.desiredSalary,
  desiredJobMode: userStore.myProfile.candidateInformation?.desiredJobMode,
  yearExperience: userStore.myProfile.candidateInformation?.yearExperience,
});

const onSaveEditInformationGeneral = async (data: any) => {
  await userStore.updateMyProfile(data);
};

/**
 * Work Experience
 */
const intiDataWorkExperience = {
  end: '',
  start: '',
  position: '',
  companyName: '',
  description: '',
};
const formDataWorkExperience = ref(intiDataWorkExperience);
const indexEditWorkExperience = ref<number | null>(null);
const onShowDialogAddWorkExperience = () => {
  showWorkExperience.value = true;
  formDataWorkExperience.value = intiDataWorkExperience;
  indexEditWorkExperience.value = null;
};
const onShowDialogEditWorkExperience = (data: any, index: number) => {
  showWorkExperience.value = true;
  formDataWorkExperience.value = data;
  indexEditWorkExperience.value = index;
};
const onAddWorkExperience = async (data: any) => {
  if (indexEditWorkExperience.value !== null) {
    userStore.myProfile.candidateInformation.workExperience.splice(
      indexEditWorkExperience.value,
      1,
    );
  }
  const body = sortObjectByStartDate([
    ...userStore.myProfile.candidateInformation.workExperience,
    data,
  ]);
  await userStore.updateMyProfile({ workExperience: body });
};
const onDeleteWorkExperience = async (index: number) => {
  const workExperience =
    userStore.myProfile.candidateInformation.workExperience;
  workExperience.splice(index, 1);
  await userStore.updateMyProfile({ workExperience });
};

/**
 * Education
 */
const intiDataEducation = {
  name: '',
  major: '',
  organization: '',
  start: '',
  end: '',
  description: '',
};
const formDataEducation = ref(intiDataEducation);
const indexEditEducation = ref<number | null>(null);
const onShowDialogAddEducation = () => {
  showEducation.value = true;
  formDataEducation.value = intiDataEducation;
  indexEditEducation.value = null;
};
const onShowDialogEditEducation = (data: any, index: number) => {
  showEducation.value = true;
  formDataEducation.value = data;
  indexEditEducation.value = index;
};
const onUpdateEducation = async (data: any) => {
  if (indexEditEducation.value !== null) {
    userStore.myProfile.candidateInformation.education.splice(
      indexEditEducation.value,
      1,
    );
  }
  const body = sortObjectByStartDate([
    ...userStore.myProfile.candidateInformation.education,
    data,
  ]);
  await userStore.updateMyProfile({ education: body });
};
const onDeleteEducation = async (index: number) => {
  const education = userStore.myProfile.candidateInformation.education;
  education.splice(index, 1);
  await userStore.updateMyProfile({ education });
};

/**
 * Certificate
 */
const intiDataCertificate = {
  name: '',
  organization: '',
  start: '',
  end: '',
  description: '',
};
const formDataCertificate = ref(intiDataCertificate);
const indexEditCertificate = ref<number | null>(null);
const onShowDialogAddCertificate = () => {
  showCertificate.value = true;
  formDataCertificate.value = intiDataCertificate;
  indexEditCertificate.value = null;
};
const onShowDialogEditCertificate = (data: any, index: number) => {
  showCertificate.value = true;
  formDataCertificate.value = data;
  indexEditCertificate.value = index;
};
const onUpdateCertificate = async (data: any) => {
  if (indexEditCertificate.value !== null) {
    userStore.myProfile.candidateInformation.certificate.splice(
      indexEditCertificate.value,
      1,
    );
  }
  const body = sortObjectByStartDate([
    ...userStore.myProfile.candidateInformation.certificate,
    data,
  ]);
  await userStore.updateMyProfile({ certificate: body });
};
const onDeleteCertificate = async (index: number) => {
  const certificate = userStore.myProfile.candidateInformation.certificate;
  certificate.splice(index, 1);
  await userStore.updateMyProfile({ certificate });
};

/**
 * Advanced Skill
 */
const intiDataAdvancedSkill = {
  name: '',
  level: 0,
};
const formDataAdvancedSkill = ref(intiDataAdvancedSkill);
const indexEditAdvancedSkill = ref<number | null>(null);
const onShowDialogAddAdvancedSkill = () => {
  showAdvancedSkill.value = true;
  formDataAdvancedSkill.value = intiDataAdvancedSkill;
  indexEditAdvancedSkill.value = null;
};
const onShowDialogEditAdvancedSkill = (data: any, index: number) => {
  showAdvancedSkill.value = true;
  formDataAdvancedSkill.value = data;
  indexEditAdvancedSkill.value = index;
};
const onUpdateAdvancedSkill = async (data: any) => {
  let body;
  if (indexEditAdvancedSkill.value !== null) {
    userStore.myProfile.candidateInformation.advancedSkill[
      indexEditAdvancedSkill.value
    ] = data;
    body = [...userStore.myProfile.candidateInformation.advancedSkill];
  } else {
    body = [...userStore.myProfile.candidateInformation.advancedSkill, data];
  }
  await userStore.updateMyProfile({ advancedSkill: body });
};
const onDeleteAdvancedSkill = async (index: number) => {
  const advancedSkill = userStore.myProfile.candidateInformation.advancedSkill;
  advancedSkill.splice(index, 1);
  await userStore.updateMyProfile({ advancedSkill });
};

/**
 * Language Skill
 */
const intiDataLanguageSkill = {
  name: '',
  level: 0,
};
const formDataLanguageSkill = ref(intiDataLanguageSkill);
const indexEditLanguageSkill = ref<number | null>(null);
const onShowDialogAddLanguageSkill = () => {
  showLanguageSkill.value = true;
  formDataLanguageSkill.value = intiDataLanguageSkill;
  indexEditLanguageSkill.value = null;
};
const onShowDialogEditLanguageSkill = (data: any, index: number) => {
  showLanguageSkill.value = true;
  formDataLanguageSkill.value = data;
  indexEditLanguageSkill.value = index;
};
const onUpdateLanguageSkill = async (data: any) => {
  let body;
  if (indexEditLanguageSkill.value !== null) {
    userStore.myProfile.candidateInformation.languageSkill[
      indexEditLanguageSkill.value
    ] = data;
    body = [...userStore.myProfile.candidateInformation.languageSkill];
  } else {
    body = [...userStore.myProfile.candidateInformation.languageSkill, data];
  }

  await userStore.updateMyProfile({ languageSkill: body });
};
const onDeleteLanguageSkill = async (index: number) => {
  const languageSkill = userStore.myProfile.candidateInformation.languageSkill;
  languageSkill.splice(index, 1);
  await userStore.updateMyProfile({ languageSkill });
};

/**
 * Upload CV
 */
const isShowDialogConfirmDeleteCV = ref(false);
const indexDeleteCV = ref<number>(0);
const onAddCV = async (data: any) => {
  const cvUpload = { title: data.baseName, url: data.absolutePath };
  const body = [...userStore.myProfile.candidateInformation.cv, cvUpload];
  await userStore.updateMyProfile({ cv: body });
};
const onShowDeleteCV = (index: number) => {
  isShowDialogConfirmDeleteCV.value = true;
  indexDeleteCV.value = index;
};
const onDeleteCV = async () => {
  const cv = userStore.myProfile.candidateInformation.cv;
  cv.splice(indexDeleteCV.value, 1);
  await userStore.updateMyProfile({ cv });
};

/**
 * Work Project
 */
const intiDataProject = {
  name: '',
  start: '',
  end: '',
  description: '',
};
const formDataProject = ref(intiDataProject);
const indexEditProject = ref<number | null>(null);
const onShowDialogAddProject = () => {
  showProject.value = true;
  formDataProject.value = intiDataProject;
  indexEditProject.value = null;
};
const onShowDialogEditProject = (data: any, index: number) => {
  showProject.value = true;
  formDataProject.value = data;
  indexEditProject.value = index;
};
const onAddProject = async (data: any) => {
  if (indexEditProject.value !== null) {
    userStore.myProfile.candidateInformation.project.splice(
      indexEditProject.value,
      1,
    );
  }
  const body = sortObjectByStartDate([
    ...userStore.myProfile.candidateInformation.project,
    data,
  ]);
  await userStore.updateMyProfile({ project: body });
};
const onDeleteProject = async (index: number) => {
  const project = userStore.myProfile.candidateInformation.project;
  project.splice(index, 1);
  await userStore.updateMyProfile({ project });
};

/**
 * Public CV
 */
const showDialogPublicSystemCV = ref(false);
const showDialogPublicAttachmentCV = ref(false);
const showNotPublicCV = ref(false);
const attachmentCVTitle = ref('');
const attachmentCVUrl = ref('');
const openDialogPublicSystemCV = () => {
  if (
    userStore.myProfile.candidateInformation?.publicCvType ===
    EPublicCvType.SYSTEM_CV
  ) {
    showNotPublicCV.value = true;
    return;
  }
  showDialogPublicSystemCV.value = true;
};
const openDialogPublicAttachmentCV = (title: string, url: string) => {
  if (
    userStore.myProfile.candidateInformation?.publicCvType ===
      EPublicCvType.ATTACHMENT_CV &&
    userStore.myProfile.candidateInformation?.publicAttachmentCv === url
  ) {
    showNotPublicCV.value = true;
    return;
  }
  showDialogPublicAttachmentCV.value = true;
  attachmentCVTitle.value = title;
  attachmentCVUrl.value = url;
};
const handlePublicAttachmentCV = async (url: string) => {
  await userStore.updateMyProfile({
    publicCvType: EPublicCvType.ATTACHMENT_CV,
    publicAttachmentCv: url,
  });
};
const handlePublicSystemCV = async () => {
  await userStore.updateMyProfile({ publicCvType: EPublicCvType.SYSTEM_CV });
};
const handleNotPublicCV = async () => {
  await userStore.updateMyProfile({
    publicCvType: EPublicCvType.NOT_PUBLIC,
  });
};

const handleShowPreviewAttachmentCV = (url: string) => {
  urlCVPreview.value = url;
  showCVPreviewAttachment.value = true;
};
</script>

<style lang="scss">
.custom-iframe {
  pointer-events: none;
}

.custom-public-cv {
  @apply hover:bg-[#212f3f] hover:text-white;

  .el-rate__icon > :nth-child(2) {
    color: #a3a8ad;
  }

  &:hover {
    .el-rate__icon > :first-child {
      display: block !important;
      color: #f7ba2a;
    }
    .el-rate__icon > :nth-child(2) {
      display: none;
    }
  }
}

.is-public-cv {
  @apply bg-[#212f3f] text-white hover:bg-[#212f3fd7];
  .el-rate__icon > :first-child {
    display: block !important;
    color: #f7ba2a;
  }
  .el-rate__icon > :nth-child(2) {
    display: none;
  }
}
</style>
