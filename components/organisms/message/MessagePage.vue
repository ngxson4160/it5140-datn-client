<template>
  <div class="grid grid-cols-7 gap-x-4 mr-4">
    <div
      v-if="!listMessage.conversation?.id"
      class="col-span-5 rounded-lg shadow-xl bg-white h-[750px] px-4 py-6 relative"
    >
      <p class="text-center">Chưa có nội dung trò chuyện</p>
    </div>
    <div
      v-else
      class="col-span-5 rounded-lg shadow-xl bg-white h-[750px] px-4 py-6 relative"
    >
      <div class="flex gap-x-4 items-center border-b pb-2 mb-4">
        <div class="border p-[2px] w-14 h-14 bg-white rounded-full">
          <img
            :key="listMessage.conversation?.id"
            :src="
              listMessage.conversation?.users[0]?.company
                ? listMessage.conversation?.users[0]?.company.avatar
                : listMessage.conversation?.users[0]?.avatar
            "
            class="object-contain w-full h-full rounded-full"
          />
        </div>
        <p class="font-bold">
          {{
            listMessage.conversation?.users[0]?.company
              ? listMessage.conversation?.users[0]?.company.name
              : `${listMessage.conversation?.users[0]?.firstName} ${listMessage.conversation?.users[0]?.lastName}`
          }}
        </p>
      </div>
      <top-infinite-scroll
        :key="listMessage.conversation?.id"
        :data="listMessage.message"
        :height="messageBoxHeight"
        :disabled="disabledLoadingListMessage || isLoadingListMessage"
        class="message-top-infinite-scroll"
        :distance="50"
        @load-data="handleGetListMessage"
        @scroll-bar-bottom="handleScrollBarBottom"
      >
        <template #default="props">
          <div class="mr-2">
            <div
              v-if="props.data?.creatorId === userData.id"
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
                :key="props.data.id"
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
        @click="handleScrollToBottom(true)"
      >
        <img src="@/assets/images/arrow-down-white.svg" class="w-5 h-5" />
        <div class="text-sm text-white">Có tin nhắn mới</div>
      </div>
      <div class="flex gap-x-4 mt-6">
        <el-input
          v-model:model-value="newMessage"
          size="large"
          @keydown.enter="handleCreateNewMessage"
          @click="handleReadConversation(conversationId)"
        />
        <el-button type="primary" size="large" @click="handleCreateNewMessage">
          Gửi
        </el-button>
      </div>
    </div>

    <div
      class="col-span-2 shadow-xl bg-white px-2 py-6 h-[750px] overflow-auto rounded-lg"
    >
      <div v-if="!listConversation.length" class="text-center">
        Chưa có cuộc hội thoại nào
      </div>
      <div
        v-else
        v-infinite-scroll="handleGetListMessageConversation"
        infinite-scroll-distance="10"
        :infinite-scroll-immediate="false"
        :infinite-scroll-disabled="
          disabledLoadingListConversation || isLoadingListConversation
        "
      >
        <div
          v-for="(el, index) in listConversation"
          :key="index"
          class="px-2 py-4 rounded-lg cursor-pointer"
          :class="{
            'font-bold':
              el.conversation.status === EUserHasConversationStatus.UNREAD,
            'bg-[#e8f7ee]': conversationId === el.conversation.id,
            'hover:bg-[#f2f5f8]': conversationId !== el.conversation.id,
          }"
          @click="handleReadConversation(el.conversation.id)"
        >
          <div class="flex gap-x-3">
            <img
              :src="
                el.conversation.users?.company
                  ? el.conversation.users?.company.avatar
                  : el.conversation.users?.avatar
              "
              class="w-[56px] h-[56px] object-contain rounded-full border bg-white"
            />
            <div class="flex justify-between items-center flex-1">
              <div class="flex flex-col justify-between h-full flex-1">
                <p>
                  {{
                    el.conversation.users?.company
                      ? el.conversation.users?.company.name
                      : `${el.conversation.users?.firstName} ${el.conversation.users?.lastName}`
                  }}
                </p>
                <div class="flex items-center justify-between gap-x-2">
                  <p class="text-sm w-[200px] truncate">
                    {{
                      userData.id === el.creatorId
                        ? `Bạn: ${el.content}`
                        : el.content
                    }}
                  </p>
                  <p class="text-xs font-normal">
                    {{ formatDateTimeShort(el.createdAt) }}
                  </p>
                </div>
              </div>
              <div
                v-if="
                  el.conversation.status === EUserHasConversationStatus.UNREAD
                "
                class="w-3 h-3 bg-blue rounded-full mr-2"
              ></div>
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

const { query } = useRoute();
const scrollBar = ref<any>(null);
const showScrollBottom = ref(false);

const userData = getUserData();
const conversationStore = useConversationStore();

const conversationId = ref();
const isLoadingListMessage = ref(false);
const disabledLoadingListMessage = ref(false);
const queryMessageConversation: IGetMessageConversation = {
  page: 0,
};
const isLoadingListConversation = ref(false);
const disabledLoadingListConversation = ref(false);
const queryConversation: IListConversation = {
  page: 0,
};

const newMessage = ref('');

const listMessage = ref<any>({ conversation: {}, message: [] });
const listConversation = ref<any[]>([]);

const handleGetListMessage = async () => {
  isLoadingListMessage.value = true;

  if (queryMessageConversation.page || queryMessageConversation.page === 0) {
    queryMessageConversation.page++;
  }

  const id = conversationId.value;
  const listMessageData = await conversationStore.getMessageConversation(
    id,
    queryMessageConversation,
  );
  isLoadingListMessage.value = false;

  if (listMessageData.data.message.length) {
    queryMessageConversation.cursor = listMessageData.data.message[0]?.id;
  }

  listMessage.value.conversation = listMessageData.data.conversation;
  listMessage.value.message.unshift(...listMessageData.data.message);

  const isLastPage =
    listMessage.value.message?.length >=
    listMessageData.meta.pagination.totalItem;
  if (isLastPage) {
    disabledLoadingListMessage.value = true;
  }
};

const handleGetListMessageConversation = async () => {
  isLoadingListConversation.value = true;
  if (queryConversation.page || queryConversation.page === 0) {
    queryConversation.page++;
  }

  const listConversationData =
    await conversationStore.getListConversation(queryConversation);

  if (listConversationData.data?.length) {
    const lastItem = listConversationData.data?.length - 1;
    queryConversation.cursor = listConversationData.data[lastItem]?.id;
  }

  listConversation.value.push(...listConversationData.data);

  isLoadingListConversation.value = false;

  const isLastPage =
    listConversation.value.length >=
    listConversationData.meta.pagination.totalItem;

  if (isLastPage) {
    disabledLoadingListConversation.value = true;
  }
};

const handleScrollToBottom = (smooth?: boolean) => {
  if (smooth) {
    scrollBar.value?.scrollTo({
      top: scrollBar.value.scrollHeight - scrollBar.value.clientHeight,
      behavior: 'smooth',
    });
  } else {
    scrollBar.value?.scrollTo({
      top: scrollBar.value.scrollHeight - scrollBar.value.clientHeight,
    });
  }

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
  socket.emit('join_room', { id: id.toString() });
};

await handleGetListMessageConversation();
if (listConversation.value.length) {
  conversationId.value = listConversation.value[0].conversation.id;

  listConversation.value.forEach((el) => {
    joinRoom(el.conversation.id);
  });
}

const queryId = query?.id ? +query.id : 0;

if (queryId) {
  conversationId.value = queryId;
}

if (conversationId.value) {
  await handleGetListMessage();
}

const handleCreateNewMessage = () => {
  if (newMessage.value) {
    socket.emit('createMessage', {
      content: newMessage.value,
      conversationId: conversationId.value,
      toUserId: listMessage.value.conversation.users[0]?.id,
    });

    newMessage.value = '';
  }
};

const handleReadConversation = (id: number) => {
  conversationId.value = id;

  const messageConversation = listConversation.value.find(
    (el) => el.conversationId === id,
  );

  if (
    messageConversation?.conversation?.status ===
    EUserHasConversationStatus.UNREAD
  ) {
    socket.emit('read_conversation', {
      conversationId: id,
    });

    messageConversation.conversation.status = EUserHasConversationStatus.READ;
  }
};

const handleScrollBarBottom = () => {
  handleReadConversation(conversationId.value);
};

const messageBoxHeight = ref(541);

onMounted(() => {
  socket.on('createMessage', async ({ message }) => {
    await nextTick();
    const currentScrollBottom =
      scrollBar.value?.scrollTop + scrollBar.value?.clientHeight >=
      scrollBar.value?.scrollHeight - 20;

    const isShowMessageScroll =
      scrollBar.value?.scrollHeight > messageBoxHeight.value && scrollBar.value;

    if (conversationId.value === message.conversation.id) {
      listMessage.value.message.push(message);

      // newest updated
      // if (currentScrollBottom) {
      //   socket.emit('read_conversation', {
      //     conversationId: message.conversation.id,
      //   });
      //   message.conversation.status = EUserHasConversationStatus.READ;
      // }
    }

    if (listConversation.value.length === 0 && !conversationId.value) {
      conversationId.value = message.conversation.id;
      listMessage.value.conversation = {
        ...message.conversation,
        users: [message.conversation.users],
      };
      listMessage.value.message.push(message);
    }

    let indexConversation;
    for (let i = 0; i <= listConversation.value.length; i++) {
      if (
        listConversation.value[i]?.conversation.id === message.conversation.id
      ) {
        indexConversation = i;
        break;
      }
    }

    if (userData.id === message?.creatorId) {
      message.conversation.status = EUserHasConversationStatus.READ;
    }

    if (indexConversation || indexConversation === 0) {
      if (message.conversation.users) {
        message.conversation.users =
          listConversation.value[indexConversation].conversation.users;
      }

      listConversation.value.splice(indexConversation, 1);
    }

    if (userData.id === message?.creatorId && message?.userReceive) {
      message.conversation.users = message.userReceive;
    }

    listConversation.value.unshift(message);

    await nextTick();
    if (
      (currentScrollBottom || userData.id === message?.creatorId) &&
      isShowMessageScroll
    ) {
      handleScrollToBottom();
    } else if (
      !currentScrollBottom &&
      userData.id !== message?.creatorId &&
      isShowMessageScroll
    ) {
      showScrollBottom.value = true;
    }
  });

  scrollBar.value = document.querySelector('.message-top-infinite-scroll');

  if (scrollBar.value) {
    scrollBar.value.addEventListener('scroll', handleScroll);
  }
});

onBeforeUpdate(() => {
  scrollBar.value = document.querySelector('.message-top-infinite-scroll');
});

onBeforeUnmount(() => {
  socket.off('createMessage');
  if (scrollBar.value) {
    scrollBar.value.removeEventListener('scroll', handleScroll);
  }
});

watch(
  () => conversationId.value,
  async () => {
    showScrollBottom.value = false;

    queryMessageConversation.page = 1;
    delete queryMessageConversation.cursor;
    disabledLoadingListMessage.value = false;

    const listMessageData = await conversationStore.getMessageConversation(
      conversationId.value,
      queryMessageConversation,
    );

    if (listMessageData.data.message.length) {
      queryMessageConversation.cursor = listMessageData.data.message[0]?.id;
    }

    listMessage.value.conversation = listMessageData.data.conversation;
    listMessage.value.message = listMessageData.data.message;

    const isLastPage =
      listMessage.value.message?.length >=
      listMessageData.meta.pagination.totalItem;
    if (isLastPage) {
      disabledLoadingListMessage.value = true;
    }
  },
);
</script>
