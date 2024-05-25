import moment from 'moment';

export const formatDateFull = (data: string) => {
  return moment(data).format('HH:mm [ngày] DD/MM/YYYY');
};

export const formatDateTimeShort = (data: string) => {
  return moment(data).format('HH:mm DD/MM/YY');
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

export const isEmptyObject = (obj: object) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};

export const calcAge = (dob: string) => {
  // Lấy ngày hiện tại
  const now = new Date();

  // Lấy năm, tháng, ngày hiện tại
  const yearNow = now.getFullYear();
  const monthNow = now.getMonth();
  const dayNow = now.getDate();

  // Lấy năm, tháng, ngày sinh
  const dobConvert = new Date(dob);
  const yearOfBirth = dobConvert.getFullYear();
  const monthOfBirth = dobConvert.getMonth();
  const dayOfBirth = dobConvert.getDate();

  // Tính tuổi
  let age = yearNow - yearOfBirth;

  // Điều chỉnh nếu chưa đến ngày sinh nhật trong năm hiện tại
  if (
    monthNow < monthOfBirth ||
    (monthNow === monthOfBirth && dayNow < dayOfBirth)
  ) {
    age--;
  }

  return age;
};

export const getUserData = () => {
  const cookieSystemData = useCookie('auth.user-data').value;

  if (cookieSystemData) {
    const systemData = handleJWTDecrypt(cookieSystemData);
    return systemData;
  }
};
