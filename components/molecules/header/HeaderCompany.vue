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
            :value="totalMessageUnreal"
            :max="9"
            class="mr-6 item cursor-pointer focus:outline-none"
            :hidden="totalMessageUnreal === 0"
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
                :infinite-scroll-disabled="disableInfiniteScroll"
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
                      <div class="line-clamp-3">
                        {{ el.content }}
                      </div>
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

        <el-badge :value="200" :max="99" class="mr-16 item cursor-pointer">
          <img src="@/assets/images/message-gray.svg" class="w-8 mr-1" />
        </el-badge>
      </div>
      <div
        class="flex items-center gap-x-2 border rounded-full px-[6px] py-[3px]"
      >
        <img
          src="https://job-nest.s3.ap-southeast-1.amazonaws.com/images/0016cf9101bd8164b99c675804f14b0ff6ea6a552fbcc7d113ae90a7f2032a9f4b4893f4377a704a44d28bd91beee557913fe95abedf75a54f74b8890886a47b.png"
          class="w-[48px] h-[48px] rounded-full border hover:cursor-pointer focus:outline-none"
        />
        <p class="text-[15px] text-[#606266]">Bộ phận tuyển dụng</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGetListNotification } from '~/types/notification';

const router = useRouter();

const notificationStore = useNotificationStore();

const totalMessageUnreal = ref(0);
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
  totalMessageUnreal.value = 0;
};

onBeforeMount(() => {
  socket.on(
    'createNotification',
    ({ notificationCreated, countNotificationUnread }) => {
      ElNotification({
        title: 'Có một tin nhắn mới',
        message: notificationCreated.content,
        position: 'bottom-left',
      });
      listNotification.value.unshift(notificationCreated);
      totalMessageUnreal.value = countNotificationUnread;
    },
  );

  socket.emit('countNotificationUnread', (total: number) => {
    totalMessageUnreal.value = total;
  });
});
</script>
