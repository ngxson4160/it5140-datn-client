<template>
  <div
    class="bg-white flex items-center border h-[150px] rounded-lg py-2 px-4 hover:bg-[#1caf5705] hover:border-[#1caf573f] cursor-pointer"
  >
    <NuxtLink
      class="w-full flex items-center justify-between"
      target="_blank"
      :to="`/job/${data.id}`"
    >
      <div class="flex">
        <img
          :src="data.company?.avatar"
          class="w-24 h-24 object-contain border p-[2px] rounded-sm"
        />
        <div class="ml-4">
          <p class="font-bold text-lg w-[600px] line-clamp-2">
            {{ data.title }}
          </p>
          <p class="w-[600px] truncate">
            {{ data.company?.name }}
          </p>
          <p
            v-if="data.salaryMin && data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ ${data.salaryMin}-${data.salaryMax}` }}
          </p>
          <p
            v-if="!data.salaryMin && data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Lên tới ${data.salaryMax}` }}
          </p>
          <p
            v-if="data.salaryMin && !data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Ít nhất ${data.salaryMin}` }}
          </p>
          <p
            v-if="!data.salaryMin && !data.salaryMax"
            class="text-sm text-danger text-one-line"
          >
            {{ `$ Thương lượng` }}
          </p>
          <div class="flex gap-x-1 w-[600px] truncate">
            <div
              v-for="(city, index) in data.cities"
              :key="index"
              class="text-sm"
            >
              {{ city.name }}
              <span v-if="index !== data.cities.length - 1">,</span>
            </div>
          </div>
          <el-tag
            v-for="(tag, index) in data.tags"
            :key="index"
            class="mr-1"
            type="primary"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
      <div class="flex flex-col justify-between items-end">
        <img
          v-if="userFollowJob"
          src="@/assets/images/heart-primary.svg"
          class="w-10"
          @click.prevent="handleUnFavoriteJob"
        />
        <img
          v-else
          src="@/assets/images/heart-gray.svg"
          class="w-10"
          @click.prevent="handleFavoriteJob"
        />
        <p class="text-gray mt-10 text-sm">
          Kết thúc: {{ formatDateFull(data.hiringEndDate) }}
        </p>
      </div>
    </NuxtLink>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: () => InitJob,
  },
  label: {
    type: Object,
    default: () => {},
  },
});

const jobStore = useJobStore();

const userFollowJob = ref(props.data.userFollowJob);

const handleFavoriteJob = async () => {
  try {
    await jobStore.favoriteJob(props.data.id, { isFavorite: true });
    userFollowJob.value = true;
  } catch (error: any) {
    console.log(error);
  }
};
const handleUnFavoriteJob = async () => {
  try {
    await jobStore.favoriteJob(props.data.id, { isFavorite: false });
    userFollowJob.value = false;
  } catch (error: any) {
    console.log(error);
  }
};
</script>

<style scoped></style>
