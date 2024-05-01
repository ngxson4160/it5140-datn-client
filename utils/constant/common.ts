export const CGender = [
  {
    value: EGender.MALE,
    name: 'Nam',
  },
  {
    value: EGender.FEMALE,
    name: 'Nữ',
  },
  {
    value: EGender.OTHER,
    name: 'Khác',
  },
];

export const CMaritalStatus = [
  {
    value: EMaritalStatus.SINGLE,
    name: 'Độc thân',
  },
  {
    value: EMaritalStatus.MARRIED,
    name: 'Đã kết hôn',
  },
];

export const CEducationLevel = [
  { value: EEducationLevel.ELEMENTARY, name: 'Tiểu học' },
  { value: EEducationLevel.JUNIOR_HIGHT_SCHOOL, name: 'Trung học cơ sở' },
  { value: EEducationLevel.HIGHT_SCHOOL, name: 'Trung học phổ thông' },
  { value: EEducationLevel.COLLEGE, name: 'Cao đẳng/Trung cấp/Sơ cấp' },
  { value: EEducationLevel.BACHELOR, name: 'Cử nhân' },
  { value: EEducationLevel.ENGINEER, name: 'Kỹ sư' },
  { value: EEducationLevel.MASTER, name: 'Thạc sỹ' },
  { value: EEducationLevel.DOCTOR, name: 'Tiến sỹ' },
];

export const CApplicationStatus = [
  { value: EApplicationStatus.WAITING_CV, name: 'Đang duyệt CV' }, // yellow
  { value: EApplicationStatus.APPROVE_CV, name: 'Chấp nhận CV' }, // blue
  { value: EApplicationStatus.REJECT_CV, name: 'Từ chối CV' }, // red
  { value: EApplicationStatus.INTERVIEW, name: 'Phỏng vấn' }, // yellow
  { value: EApplicationStatus.PROCESSING, name: 'Chờ kết quả' }, // yellow
  { value: EApplicationStatus.SUCCESS, name: 'Trúng tuyển' }, // green
  { value: EApplicationStatus.FAILURE, name: 'Từ chối' }, // red
  { value: EApplicationStatus.DELETED, name: 'Đã hủy' }, // gray
];
