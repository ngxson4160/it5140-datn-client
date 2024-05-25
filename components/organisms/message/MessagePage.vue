<template>
  <div class="grid grid-cols-7 gap-x-4 mr-4">
    <div
      class="col-span-5 rounded-lg shadow-xl bg-white h-[750px] px-4 py-6 relative"
    >
      <div class="flex gap-x-4 items-center border-b pb-2 mb-4">
        <div class="border p-[2px] w-14 h-14 bg-white rounded-full">
          <img
            :src="listData.conversation.users[0]?.avatar"
            class="object-contain w-full h-full rounded-full"
          />
        </div>
        <p class="font-bold">
          {{
            `${listData.conversation.users[0]?.firstName} ${listData.conversation.users[0]?.lastName}`
          }}
        </p>
      </div>

      <top-infinite-scroll
        :data="listData.message"
        :height="541"
        :disabled="disabledLoadingListMessage"
        class="message-top-infinite-scroll"
        @load-data="handleLoadDataListMessage"
      >
        <template #default="props">
          <div class="mr-2">
            <div
              v-if="props.data?.yourMessage"
              class="flex gap-x-2 mb-2 items-start justify-end"
            >
              <div
                class="px-2 py-1 rounded-md bg-green text-white max-w-[400px]"
              >
                {{ props.data?.content }}
              </div>
            </div>

            <div v-else class="flex gap-x-2 mb-2 items-start">
              <img
                :src="props.data.creator?.avatar"
                class="w-11 h-11 rounded-full border"
              />
              <div class="px-2 py-1 rounded-md bg-[#dee2e6] max-w-[400px]">
                {{ props.data?.content }}
              </div>
            </div>
          </div>
        </template>
      </top-infinite-scroll>

      <div
        v-if="showScrollBottom"
        class="absolute bottom-[120px] right-10 flex justify-end gap-x-1 px-2 py-1 cursor-pointer bg-[#8de4b1] rounded-md"
        @click="handleScrollTopBottom"
      >
        <img src="@/assets/images/arrow-down-white.svg" class="w-5 h-5" />
        <div class="text-sm text-white">Có tin nhắn mới</div>
      </div>
      <div class="flex gap-x-4 mt-6">
        <el-input
          v-model:model-value="newMessage"
          size="large"
          @keydown.enter="handleCreateNewMessage"
        />
        <el-button type="primary" size="large" @click="handleCreateNewMessage">
          Gửi
        </el-button>
      </div>
    </div>

    <div
      class="col-span-2 shadow-xl bg-white pl-4 py-6 h-[750px] overflow-auto rounded-lg"
    >
      <div
        v-infinite-scroll="handleGetListDataPaging"
        infinite-scroll-distance="10"
        :infinite-scroll-immediate="false"
      >
        <div
          v-for="(el, index) in listUser"
          :key="index"
          class="hover:bg-[#f2f5f8] px-2 py-4 rounded-lg cursor-pointer"
        >
          <div class="flex gap-x-3">
            <img
              src="@/assets/images/logo.jpg"
              class="w-[56px] h-[56px] object-contain rounded-full border bg-white"
            />
            <div class="flex justify-between flex-1">
              <div class="flex flex-col justify-between">
                <p>{{ el }}</p>
                <p class="text-sm w-[250px] truncate">
                  Hulaaaaaaaaaaaaaaaaaaaaaaaaaaaaa fsd dsf sdf sdf
                </p>
              </div>
              <p class="text-xs">12:58 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGetMessageConversation } from '~/types/conversation';

const scrollBar = ref<any>(null);
const showScrollBottom = ref(false);

const userData = getUserData();
const conversationStore = useConversationStore();

const conversationId = ref(6);
const queryMessageConversation: IGetMessageConversation = {
  page: 1,
};
const disabledLoadingListMessage = ref(false);

const newMessage = ref('');

onMounted(() => {
  socket.emit('join_room', { id: conversationId.value?.toString() });

  socket.on('createMessage', async ({ message }) => {
    const currentScrollBottom =
      scrollBar.value.scrollTop + scrollBar.value.clientHeight >=
      scrollBar.value.scrollHeight;

    if (userData.id === message?.creatorId) {
      message.yourMessage = true;
    } else {
      message.yourMessage = false;
    }
    listData.value.message.push(message);

    await nextTick();

    if (currentScrollBottom) {
      scrollBar.value.scrollTop =
        scrollBar.value.scrollHeight - scrollBar.value.clientHeight;
    } else {
      showScrollBottom.value = true;
    }
  });

  scrollBar.value = document.querySelector('.message-top-infinite-scroll');
});

const listData = ref<any>({ conversation: {}, message: [] });
const listUser = ref([]);

const listMessage = await conversationStore.getMessageConversation(
  conversationId.value,
  queryMessageConversation,
);

listData.value = listMessage.data;

const handleGetListDataPaging = () => {
  const index = listUser.value[listUser.value.length - 1];
  for (let i = index; i <= index + 20; i++) {
    listUser.value.push(i);
  }
};

const handleLoadDataListMessage = async () => {
  if (queryMessageConversation.page) {
    queryMessageConversation.page++;
  }

  const listMessage = await conversationStore.getMessageConversation(
    conversationId.value,
    queryMessageConversation,
  );

  listData.value.message.unshift(...listMessage.data.message);

  if (
    listMessage.meta.pagination.page >= listMessage.meta.pagination.totalPage
  ) {
    disabledLoadingListMessage.value = true;
  }
};

const handleCreateNewMessage = () => {
  if (newMessage.value) {
    socket.emit('createMessage', {
      content: newMessage.value,
      conversationId: conversationId.value,
    });

    newMessage.value = '';
  }
};

const handleScrollTopBottom = () => {
  scrollBar.value.scrollTo({
    top: scrollBar.value.scrollHeight - scrollBar.value.clientHeight,
    behavior: 'smooth',
  });

  showScrollBottom.value = false;
};
</script>

<style scoped></style>
