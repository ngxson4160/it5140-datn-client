import moment from 'moment';

export const formatDateFull = (data: string) => {
  return moment(data).format('HH:ss [ngày] DD/MM/YYYY');
};

export const formatDateShort = (data: string) => {
  return moment(data).format('DD/MM/YYYY');
};
