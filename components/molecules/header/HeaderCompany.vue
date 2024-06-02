<template>
  <div
    class="h-[80px] pr-[150px] flex w-full justify-between items-center shadow-lg border-b"
  >
    <div
      class="w-[350px] text-center flex items-center justify-center bg-white h-full"
    >
      <div
        class="text-4xl font-bold hover:cursor-pointer"
        @click="router.push('/company/profile')"
      >
        Job
        <span class="text-green">Nest</span>
      </div>
    </div>

    <div class="flex items-center gap-x-4">
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
            <el-dropdown-menu
              class="w-[384px] h-[450px] custom-dropdown-header"
            >
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
                        :src="el.userSend?.avatar"
                        class="object-contain w-full h-full rounded-full"
                      />
                    </div>
                    <div class="col-span-4">
                      <div class="line-clamp-3" v-html="el.content"></div>
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
                <div
                  v-if="!listNotification.length"
                  class="mt-[213px] text-base text-[#606266] flex justify-center items-center"
                >
                  Chưa có thông báo nào
                </div>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-badge
          :value="totalConversationUnreal"
          :max="999"
          :hidden="totalConversationUnreal === 0"
          class="mr-16 item cursor-pointer"
          @click="router.push('/company/message')"
        >
          <img src="@/assets/images/message-gray.svg" class="w-8 mr-1" />
        </el-badge>
      </div>
      <el-dropdown>
        <div
          class="flex items-center gap-x-2 border rounded-full px-[6px] py-[3px] focus:outline-none"
        >
          <img
            :src="userStore.accountInfo?.avatar"
            class="w-[48px] h-[48px] rounded-full border hover:cursor-pointer focus:outline-none"
          />
          <p class="text-[15px] text-[#606266]">Bộ phận tuyển dụng</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="w-[200px]">
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
