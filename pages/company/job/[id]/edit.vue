<template>
  <edit-job
    is-edit
    :value="job"
    @on-back="router.push(`/company/job/${params.id}`)"
    @on-save="onEditJob"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'company-dashboard',
  // middleware: ['redirect'],
  roles: [ERole.COMPANY],
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

const cityIds = data.job.cities.map((el: ICity) => el.id);
job.value = { ...data.job, cityIds };

const onEditJob = async (data: any) => {
  await jobStore.update(+params.id, data);
  router.push(`/company/job/${params.id}`);
};
</script>
