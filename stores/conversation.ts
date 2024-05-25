import type { IGetMessageConversation } from '~/types/conversation';

export const useConversationStore = defineStore(EStoreName.CONVERSATION, {
  state: () => ({}),
  actions: {
    async getMessageConversation(
      conversationId: number,
      query: IGetMessageConversation,
    ) {
      const data = await useBaseFetch(
        `conversations/${conversationId}/messages`,
        { query },
      );

      return data;
    },
  },
});
