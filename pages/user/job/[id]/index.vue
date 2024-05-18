<template>
  <header-auth />
  <job-detail
    :job="job"
    :company="company"
    @on-apply-job="showApplyJob = true"
    @on-follow-job="handleFollowJob"
  />

  <dialog-apply-job
    v-model:dialog-visible="showApplyJob"
    :data="dataApplyJob"
    @on-confirm="handleApplyJob"
  />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-to-guest-router'],
});

const job = ref();
const company = ref();

const { params } = useRoute();
const router = useRouter();

const jobStore = useJobStore();
const { data, error } = await jobStore.getJob(+params.id);
if (error && error.meta.statusCode === 400) {
  router.push('/404');
}
job.value = data.job;
company.value = data.company;

const showApplyJob = ref(false);
const userStore = useUserStore();
await userStore.getMyProfile();

const dataApplyJob = ref({
  candidateCv: userStore.myProfile.candidateInformation?.cv,
  candidateName:
    userStore.myProfile.firstName + ' ' + userStore.myProfile.lastName,
  candidateEmail: userStore.myProfile.email,
  candidatePhoneNumber: userStore.myProfile.phoneNumber,
});

const handleApplyJob = async (data: any) => {
  try {
    let cvType;
    if (data?.candidateCv === '') {
      cvType = EPublicCvType.SYSTEM_CV;
    } else {
      cvType = EPublicCvType.ATTACHMENT_CV;
    }
    await userStore.applyJob(+params.id, { ...data, cvType });
    job.value.application.status = true;
  } catch (error: any) {
    console.log(error);
  }
};

const handleFollowJob = async (isFavorite: boolean) => {
  try {
    await jobStore.favoriteJob(+params.id, { isFavorite });
    job.value.userFollowJob = isFavorite;
  } catch (error: any) {
    console.log(error);
  }
};
</script>

<style scoped></style>
