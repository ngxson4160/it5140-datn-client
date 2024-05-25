<template>
  <div class="grid grid-cols-7 gap-x-4 mr-4">
    <div
      class="col-span-5 rounded-lg shadow-xl bg-white h-[750px] px-4 py-6 relative"
    >
      <div class="flex gap-x-4 items-center border-b pb-2 mb-4">
        <div class="border p-[2px] w-14 h-14 bg-white rounded-full">
          <img
            :src="
              listMessage.conversation.users[0]?.company
                ? listMessage.conversation.users[0]?.company.avatar
                : listMessage.conversation.users[0]?.avatar
            "
            class="object-contain w-full h-full rounded-full"
          />
        </div>
        <p class="font-bold">
          {{
            listMessage.conversation.users[0]?.company
              ? listMessage.conversation.users[0]?.company.name
              : `${listMessage.conversation.users[0]?.firstName} ${listMessage.conversation.users[0]?.lastName}`
          }}
        </p>
      </div>

      <top-infinite-scroll
        :data="listMessage.message"
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
                :src="
                  props.data.creator?.company
                    ? props.data.creator?.company?.avatar
                    : props.data.creator?.avatar
                "
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
        @click="handleScrollToBottom"
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
        v-infinite-scroll="handleGetListMessage"
        infinite-scroll-distance="10"
        :infinite-scroll-immediate="false"
        :infinite-scroll-disabled="disabledLoadingListConversation"
      >
        <div
          v-for="(el, index) in listConversation"
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
import type {
  IGetMessageConversation,
  IListConversation,
} from '~/types/conversation';

const scrollBar = ref<any>(null);
const showScrollBottom = ref(false);

const userData = getUserData();
const conversationStore = useConversationStore();

const conversationId = ref(6);
const queryMessageConversation: IGetMessageConversation = {
  page: 0,
};
const disabledLoadingListMessage = ref(false);
const disabledLoadingListConversation = ref(false);
const queryConversation: IListConversation = {
  page: 0,
};

const newMessage = ref('');

const listMessage = ref<any>({ conversation: {}, message: [] });
const listConversation = ref<any[]>([]);

const handleLoadDataListMessage = async () => {
  if (queryMessageConversation.page || queryMessageConversation.page === 0) {
    queryMessageConversation.page++;
  }

  const listMessageData = await conversationStore.getMessageConversation(
    conversationId.value,
    queryMessageConversation,
  );
  queryMessageConversation.cursor = listMessageData.data.message[0]?.id;

  listMessage.value.conversation = listMessageData.data.conversation;
  listMessage.value.message.unshift(...listMessageData.data.message);

  if (
    listMessageData.meta.pagination.page >=
    listMessageData.meta.pagination.totalPage
  ) {
    disabledLoadingListMessage.value = true;
  }
};

const handleGetListMessage = async () => {
  if (queryConversation.page || queryConversation.page === 0) {
    queryConversation.page++;
  }

  const listConversationData =
    await conversationStore.getListConversation(queryConversation);
  queryConversation.cursor = listConversationData.data[0]?.id;
  listConversation.value.push(...listConversationData.data);

  if (
    listConversationData.meta.pagination.page >=
    listConversationData.meta.pagination.totalPage
  ) {
    disabledLoadingListConversation.value = true;
  }
};

await handleLoadDataListMessage();
await handleGetListMessage();

const handleCreateNewMessage = () => {
  if (newMessage.value) {
    socket.emit('createMessage', {
      content: newMessage.value,
      conversationId: conversationId.value,
    });

    newMessage.value = '';
  }
};

const handleScrollToBottom = () => {
  scrollBar.value.scrollTo({
    top: scrollBar.value.scrollHeight - scrollBar.value.clientHeight,
    behavior: 'smooth',
  });

  showScrollBottom.value = false;
};

const handleScroll = () => {
  const scrollPosition =
    scrollBar.value.scrollTop + scrollBar.value.clientHeight;
  const nearBottomThreshold = 50;

  if (showScrollBottom.value) {
    showScrollBottom.value =
      scrollPosition < scrollBar.value.scrollHeight - nearBottomThreshold;
  }
};

const joinRoom = (id: number) => {
  socket.emit('join_room', { id: conversationId.value?.toString() });
};

onMounted(() => {
  socket.emit('join_room', { id: conversationId.value?.toString() });

  socket.on('createMessage', async ({ message }) => {
    const currentScrollBottom =
      scrollBar.value.scrollTop + scrollBar.value.clientHeight >=
      scrollBar.value.scrollHeight - 20;

    if (userData.id === message?.creatorId) {
      message.yourMessage = true;
    } else {
      message.yourMessage = false;
    }
    listMessage.value.message.push(message);

    await nextTick();

    if (currentScrollBottom || userData.id === message?.creatorId) {
      handleScrollToBottom();
    } else if (!currentScrollBottom && userData.id !== message?.creatorId) {
      showScrollBottom.value = true;
    }
  });

  scrollBar.value = document.querySelector('.message-top-infinite-scroll');

  scrollBar.value.addEventListener('scroll', handleScroll);
});
</script>

<style scoped></style>
