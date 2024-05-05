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
  candidateCv: userStore.myProfile.candidateInformation.cv,
  candidateFirstName: userStore.myProfile.firstName,
  candidateLastName: userStore.myProfile.lastName,
  candidateEmail: userStore.myProfile.email,
  candidatePhoneNumber: userStore.myProfile.phoneNumber,
});

const handleApplyJob = async (data: any) => {
  await userStore.applyJob(+params.id, data);
  console.log('handleApplyJob', data);
};
</script>

<style scoped></style>
