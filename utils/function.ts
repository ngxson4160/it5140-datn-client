import moment from 'moment';

export const formatDate = (data: string) => {
  return moment(data).format('HH:ss [ngày] DD/MM/YYYY');
};
