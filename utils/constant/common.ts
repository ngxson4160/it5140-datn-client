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
  { value: EApplicationStatus.WAITING, name: 'Chưa liên hệ' }, // yellow
  { value: EApplicationStatus.CONTACTED, name: 'Đã liên hệ' }, // blue
  { value: EApplicationStatus.INTERVIEWED, name: 'Đã phỏng vấn' }, // red
  { value: EApplicationStatus.SUCCESS, name: 'Trúng tuyển' }, // green
  { value: EApplicationStatus.FAILURE, name: 'Từ chối' }, // red
  // { value: EApplicationStatus.DELETED, name: 'Đã hủy' },
];

export const CApplicationClassify = [
  { value: EApplicationClassify.ONE, name: 'Nhóm 1' },
  { value: EApplicationClassify.TWO, name: 'Nhóm 2' },
  { value: EApplicationClassify.THREE, name: 'Nhóm 3' },
];

export const CCompanySizeType = [
  { value: ECompanySizeType.TINY, name: 'Dưới 50 viên viên' },
  { value: ECompanySizeType.SMALL, name: '50-100 nhân viên' },
  { value: ECompanySizeType.LITTLE, name: '100-500 nhân viên' },
  { value: ECompanySizeType.FAT, name: '500-1000 nhân viên' },
  { value: ECompanySizeType.LARGE, name: '1000-3000 nhân viên' },
  { value: ECompanySizeType.BIG, name: 'Trên 3000 nhân viên' },
];
