<template>
  <div
    class="h-[80px] pr-[250px] pl-[100px] flex w-full justify-between items-center shadow-lg"
  >
    <div
      class="text-4xl font-bold hover:cursor-pointer pr-[200px]"
      @click="router.push('/user')"
    >
      Job
      <span class="text-green">Nest</span>
    </div>

    <div class="flex gap-x-10">
      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/user')"
      >
        Trang chủ
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/user/job/list')"
      >
        Tìm việc
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/user/company/list')"
      >
        Công ty
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/user/blog')"
      >
        Blog
      </p>

      <p
        class="hover:cursor-pointer hover:text-green font-medium"
        @click="router.push('/user/about-us')"
      >
        Về chúng tôi
      </p>
    </div>

    <div class="flex items-center">
      <el-dropdown trigger="click">
        <el-badge
          :value="totalNotificationUnreal"
          :max="9"
          class="mr-6 item cursor-pointer focus:outline-none"
          :hidden="totalNotificationUnreal === 0"
          @click="handleUpdateReadNotification"
        >
          <img src="@/assets/images/notification-gray.svg" class="w-8 mr-1" />
        </el-badge>

        <template #dropdown>
          <el-dropdown-menu class="w-[384px] h-[450px] custom-dropdown-header">
            <div
              v-infinite-scroll="handleGetListDataPaging"
              infinite-scroll-distance="100"
              :infinite-scroll-immediate="false"
              :infinite-scroll-disabled="disableInfiniteScroll || loadingData"
            >
              <el-dropdown-item
                v-for="(el, index) in listNotification"
                :key="index"
              >
                <div class="w-full grid grid-cols-5 gap-x-2">
                  <div
                    class="col-span-1 border p-[2px] h-[64px] bg-white rounded-full"
                  >
                    <img
                      v-if="el.userSend?.avatar"
                      :key="el.userSend?.avatar"
                      :src="el.userSend?.avatar"
                      class="object-contain w-full h-full rounded-full"
                    />
                  </div>
                  <div class="col-span-4">
                    <div class="line-clamp-3 w-full" v-html="el.content"></div>
                    <p class="text-grey text-xs mt-[2px]">
                      {{ formatDateFull(el.createdAt) }}
                    </p>
                  </div>
                </div>
              </el-dropdown-item>
              <el-skeleton
                v-if="loadingData"
                animated
                class="custom-el-skeleton"
              />
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-badge
        :value="totalConversationUnreal"
        :max="999"
        :hidden="totalConversationUnreal === 0"
        class="mr-16 item cursor-pointer"
        @click="router.push('/user/message')"
      >
        <img src="@/assets/images/message-gray.svg" class="w-8 mr-1" />
      </el-badge>
      <el-dropdown>
        <img
          :src="userStore.accountInfo?.avatar"
          class="w-[54px] h-[54px] rounded-full border hover:cursor-pointer focus:outline-none"
        />
        <template #dropdown>
          <el-dropdown-menu class="w-[175px]">
            <el-dropdown-item @click="router.push('/user/profile')">
              Hồ sơ
            </el-dropdown-item>
            <el-dropdown-item @click="router.push('/user/job/application')">
              Ứng tuyển
            </el-dropdown-item>
            <el-dropdown-item @click="router.push('/user/message')">
              Tin nhắn
            </el-dropdown-item>
            <el-dropdown-item @click="handleLogout">Đăng xuất</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGetListNotification } from '~/types/notification';

const router = useRouter();
const userData = getUserData();
const notificationStore = useNotificationStore();
const userStore = useUserStore();

await userStore.getAccountInfo();

const totalNotificationUnreal = ref(0);
const totalConversationUnreal = ref(0);
const query = ref<IGetListNotification>({ page: 0, limit: 9 });
const listNotification = ref<any[]>([]);
const disableInfiniteScroll = ref(false);
const loadingData = ref(false);

const handleGetListDataPaging = async () => {
  loadingData.value = true;
  query.value.page = query.value.page + 1;
  const { data, meta } = await notificationStore.getListNotification({
    ...query.value,
  });
  loadingData.value = false;

  listNotification.value.push(...data);

  if (meta.pagination.page >= meta.pagination.totalPage) {
    disableInfiniteScroll.value = true;
  }
};

await handleGetListDataPaging();

const handleUpdateReadNotification = async () => {
  await notificationStore.updateManyNotification({
    status: ENotificationStatus.READ,
  });
  totalNotificationUnreal.value = 0;
};

onBeforeMount(() => {
  socket.on(
    'createNotification',
    ({ notificationCreated, countNotificationUnread }) => {
      ElNotification({
        title: 'Có một thông báo mới',
        message: notificationCreated.content,
        position: 'bottom-left',
        dangerouslyUseHTMLString: true,
      });
      listNotification.value.unshift(notificationCreated);
      totalNotificationUnreal.value = countNotificationUnread;
    },
  );

  socket.emit('countNotificationUnread', (total: number) => {
    totalNotificationUnreal.value = total;
  });

  socket.emit('count_conversation_unread', (total: number) => {
    totalConversationUnreal.value = total;
  });

  socket.on('count_conversation_unread', ({ count }) => {
    totalConversationUnreal.value = count;
  });

  socket.on('get_conversation_detail', ({ payload }) => {
    if (
      userData?.id === payload.fromUserId ||
      userData?.id === payload.toUserId
    ) {
      socket.emit('join_room', { id: payload.conversationId.toString() });
    }
  });
});
</script>

<style class="scss"></style>
