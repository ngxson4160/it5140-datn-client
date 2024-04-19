export interface IFileInformation {
  originalname: string;
  relativePath: string;
  absolutePath: string;
}

export interface IUploadResponse extends IResponse {
  data: IFileInformation;
}

export const initFileInformation = {
  originalname: '',
  relativePath: '',
  absolutePath: '',
};

export const useUploadStore = defineStore(EStoreName.UPLOAD, {
  state: () => ({}),
  actions: {
    async uploadImage(formData: FormData) {
      return await useBaseFetch('/file/images', {
        method: 'POST',
        body: formData,
      });
    },

    async uploadPdf(formData: FormData) {
      return await useBaseFetch('/file/pdfs', {
        method: 'POST',
        body: formData,
      });
    },
  },
});
