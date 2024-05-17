<template>
  <header-auth />
  <job-detail
    :job="job"
    :company="company"
    @on-apply-job="showApplyJob = true"
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

console.log('run user job [id]');

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
  candidateFirstName: userStore.myProfile.firstName,
  candidateLastName: userStore.myProfile.lastName,
  candidateEmail: userStore.myProfile.email,
  candidatePhoneNumber: userStore.myProfile.phoneNumber,
});

const handleApplyJob = async (data: any) => {
  let cvType;
  if (data?.candidateCv === '') {
    cvType = EPublicCVType.SYSTEM_CV;
  } else {
    cvType = EPublicCVType.ATTACHMENT_CV;
  }
  await userStore.applyJob(+params.id, { ...data, cvType });
  console.log({ ...data, cvType });
};
</script>

<style scoped></style>
