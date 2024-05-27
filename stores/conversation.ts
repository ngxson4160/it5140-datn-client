import type {
  ICreateConversation,
  IGetMessageConversation,
  IListConversation,
} from '~/types/conversation';

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

    async getListConversation(query?: IListConversation) {
      const data = await useBaseFetch(`conversations`, { query });

      return data;
    },

    async createConversation(body?: ICreateConversation) {
      const data = await useBaseFetch(`conversations`, {
        method: 'POST',
        body,
      });

      return data.data;
    },
  },
});
