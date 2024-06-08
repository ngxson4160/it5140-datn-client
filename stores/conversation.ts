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
        { query, loading: true },
      );

      return data;
    },

    async getListConversation(query?: IListConversation) {
      const data = await useBaseFetch(`conversations`, {
        query,
        loading: true,
      });

      return data;
    },

    async getDetailConversation(id: number) {
      const data = await useBaseFetch(`conversations/${id}`, { loading: true });

      return data.data;
    },

    async createConversation(body?: ICreateConversation) {
      const data = await useBaseFetch(`conversations`, {
        method: 'POST',
        body,
        loading: true,
      });

      return data.data;
    },
  },
});
