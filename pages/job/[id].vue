<template>
  <div>
    <header-guest />
    <job-detail :job="job" :company="company" />
  </div>
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
</script>

<style scoped></style>
