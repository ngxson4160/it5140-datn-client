import type { CreateBlog, IGetListBlog } from '~/types/blog';

export const useBlogStore = defineStore(EStoreName.BLOG, {
  state: () => ({}),
  actions: {
    async getDetailBlog(id: number) {
      const data = await useBaseFetch(`blogs/${id}`, {
        loading: true,
      });

      return data;
    },

    async createBlog(body: CreateBlog) {
      const data = await useBaseFetch('blogs', {
        method: 'POST',
        body,
        notification: true,
        loading: true,
      });

      return data;
    },

    async updateBlog(id: number, body: CreateBlog) {
      const data = await useBaseFetch(`blogs/${id}`, {
        method: 'PUT',
        body,
        notification: true,
        loading: true,
      });

      return data;
    },

    async getListBlog(query?: IGetListBlog) {
      const data = await useBaseFetch(`blogs`, {
        loading: true,
        query,
      });

      return data;
    },

    async deleteBlog(id: number) {
      await useBaseFetch(`blogs/${id}`, {
        method: 'DELETE',
        notification: true,
        loading: true,
      });
    },

    async favoriteBlog(jobId: number, body: { isFavorite: boolean }) {
      return await useBaseFetch(`/blogs/${jobId}/favorites`, {
        method: 'POST',
        body,
        loading: true,
        notification: true,
      });
    },
  },
});
