<template>
  <div class="w-[1140px] mx-auto pt-4 pb-[104px]">
    <company-detail
      :company="company"
      :list-job="listJob"
      :meta-job="metaOfJob"
      :page-job="currentPageJob"
      :list-blog="listBlog"
      :meta-blog="metaOfBlog"
      :page-blog="currentPageBlog"
      @on-set-page-job="setCurrentPageJob"
      @on-set-page-blog="setCurrentPageBlog"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'user-header',

  middleware: ['redirect-to-guest-router'],
});

const company = ref();
const listJob = ref();
const listBlog = ref();

const { params } = useRoute();
const router = useRouter();

const companyStore = useCompanyStore();
const jobStore = useJobStore();
const blogStore = useBlogStore();

const { data, error } = await companyStore.getDetail(+params.id);
if (error && error.meta.statusCode === 400) {
  router.push('/404');
}

const { data: dataJob, meta: metaJob } = await jobStore.getListJob({
  all: true,
  companyId: +params.id,
});

const metaOfJob = ref();
company.value = data;
listJob.value = dataJob;
metaOfJob.value = metaJob;

const currentPageJob = ref<number>(1);

const setCurrentPageJob = async (page: number) => {
  currentPageJob.value = page;
  const data = await jobStore.getListJob({
    all: true,
    companyId: +params.id,
    page,
  });
  listJob.value = data.data;
  metaOfJob.value = data.meta;
};

const { data: dataBlog, meta: metaBlog } = await blogStore.getListBlog({
  companyId: +params.id,
});

const metaOfBlog = ref();
listBlog.value = dataBlog;
metaOfBlog.value = metaBlog;

const currentPageBlog = ref<number>(1);

const setCurrentPageBlog = async (page: number) => {
  currentPageBlog.value = page;
  const data = await blogStore.getListBlog({
    companyId: +params.id,
    page,
  });
  listBlog.value = data.data;
  metaOfBlog.value = data.meta;
};
</script>
