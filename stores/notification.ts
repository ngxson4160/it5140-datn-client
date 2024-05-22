import type {
  IGetListNotification,
  IUpdateManyNotification,
} from '~/types/notification';

export interface ICity {
  id: number;
  name: string;
  districts?: Array<{ id: number; name: string }>;
}

export interface IListCities extends IResponse {
  data: ICity[];
}

export const useNotificationStore = defineStore(EStoreName.Notification, {
  state: () => ({}),
  actions: {
    async getListNotification(query?: IGetListNotification) {
      const data = await useBaseFetch('/notifications', { query });
      return data;
    },

    async updateManyNotification(body?: IUpdateManyNotification) {
      const data = await useBaseFetch('/notifications', {
        method: 'PUT',
        body,
      });
      return data;
    },
  },
});
