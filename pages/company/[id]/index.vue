<template>
  <div class="w-[1140px] mx-auto pt-4 pb-[104px]">
    <company-detail
      :company="company"
      :list-job="listJob"
      :meta-job="meta"
      :page-job="currentPage"
      @on-set-page-job="setCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'guest',
  middleware: ['redirect'],
});

const company = ref();
const listJob = ref();

const { params } = useRoute();
const router = useRouter();

const companyStore = useCompanyStore();
const jobStore = useJobStore();
const { data, error } = await companyStore.getDetail(+params.id);
if (error && error.meta.statusCode === 400) {
  router.push('/404');
}

const { data: dataJob, meta: metaJob } = await jobStore.getListJob({
  all: true,
  companyId: +params.id,
});

const meta = ref();
company.value = data;
listJob.value = dataJob;
meta.value = metaJob;

const currentPage = ref<number>(1);

const setCurrentPage = async (page: number) => {
  currentPage.value = page;
  const data = await jobStore.getListJob({
    all: true,
    companyId: +params.id,
    page,
  });
  listJob.value = data.data;
  meta.value = data.meta;
};
</script>
