<template>
  <div class="bg-white h-[570px] p-4 text-sm w-[300px] shadow-md rounded-b-md">
    <NuxtLink
      v-for="(item, index) in menuData"
      :key="index"
      class="flex h-16 items-center gap-2 px-4 mb-2 cursor-pointer border rounded-md bg-white hover:border-[#1caf57] hover:bg-[#e8f7ee]"
      :class="{ 'router-active': item.link.includes(path) }"
      @click="router.push(item.link[0])"
    >
      <img :src="item.img" alt="" class="w-8" />
      <p class="text-base">{{ item.label }}</p>
    </NuxtLink>
    <p
      class="text-base hover:underline font-bold text-center cursor-pointer mt-4 text-green"
      @click="handleLogout"
    >
      Đăng xuất
    </p>
  </div>
</template>

<script setup lang="ts">
import ProfileIcon from 'assets/images/profile-gray.svg';
import MessageIcon from 'assets/images/message-gray.svg';
import SettingIcon from 'assets/images/setting-gray.svg';
import ApplicationIcon from 'assets/images/bag-gray.svg';
import BlogIcon from 'assets/images/blog-gray.svg';
import CandidateIcon from 'assets/images/people-group-gray.svg';
import SearchCandidateIcon from 'assets/images/search-gray.svg';

const route = useRoute();
const router = useRouter();
const path = ref<string>('');
const id = ref<number>(0);
const idApplicant = ref<number>(0);

const logoutDialogVisible = ref(false);
const menuData = ref<{ label: string; link: string[]; img: any }[]>([]);

watchEffect(() => {
  path.value = route.path.toString() ?? '';
  id.value = Number(route.params.id) ?? 0;
  idApplicant.value = Number(route.params.idApplicant) ?? 0;
  menuData.value = [
    {
      label: 'Thông tin chung',
      link: ['/company/profile'],
      img: ProfileIcon,
    },
    {
      label: 'Quản lý tuyển dụng',
      link: [
        '/company/job/list',
        '/company/job/create',
        `/company/job/${id.value}`,
        `/company/job/${id.value}/edit`,
      ],
      img: ApplicationIcon,
    },
    {
      label: 'Quản lý ứng viên',
      link: ['/company/candidate/list'],
      img: CandidateIcon,
    },
    {
      label: 'Tìm kiếm ứng viên',
      link: ['/company/candidate/search'],
      img: SearchCandidateIcon,
    },
    {
      label: 'Tin nhắn',
      link: ['/company/message'],
      img: MessageIcon,
    },
    {
      label: 'Quản lý Blog',
      link: ['/company/blog/list'],
      img: BlogIcon,
    },
    {
      label: 'Quản lý tài khoản',
      link: ['/company/setting'],
      img: SettingIcon,
    },
  ];
});

const logout = () => {
  handleLogout();
  // routerPush('/admin/login');
};
</script>

<style lang="scss" scoped>
.router-active {
  @apply border-[#1caf57] bg-[#e8f7ee];
}
.router-active::before {
  content: '';
  @apply w-0 h-0 border-solid absolute right-0 top-[12px];
  border-width: 8px 10px 8px 0;
  border-color: transparent #f5f5f5 transparent transparent;
}
</style>
