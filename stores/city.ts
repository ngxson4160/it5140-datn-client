export interface ICity {
  id: number;
  name: string;
}

export interface IListCities extends IResponse {
  data: ICity[];
}

export const useCityStore = defineStore(EStoreName.City, {
  state: () => ({
    listCities: [] as ICity[],
  }),
  actions: {
    async getListCities() {
      try {
        if (!this.listCities.length) {
          const { data } = await useBaseFetch('/cities');
          this.listCities = data as ICity[];
        }
      } catch (error: any) {
        console.log(error);
      }
    },
  },
});
