import moment from 'moment';

export const formatDateFull = (data: string) => {
  return moment(data).format('HH:ss [ngày] DD/MM/YYYY');
};

export const formatDateShort = (data: string) => {
  return moment(data).format('DD/MM/YYYY');
};

export const sortObjectByStartDate = (
  data: Array<object & { start: string }>,
) => {
  data.sort((a, b) => {
    const dateA = new Date(a.start);
    const dateB = new Date(b.start);

    return dateB - dateA;
  });

  return data;
};
