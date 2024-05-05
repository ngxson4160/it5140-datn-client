import { EJobSalary, EJobExperience, EJobMode, EJobLevel } from '~/types/job';

export const CJobMode = [
  {
    value: EJobMode.PART_TIME,
    name: 'Toàn thời gian',
  },
  {
    value: EJobMode.FULL_TIME,
    name: 'Bán thời gian',
  },
];

export const CJobLevel = [
  {
    value: EJobLevel.INTERN,
    name: 'Thực tập sinh',
  },
  {
    value: EJobLevel.STAFF,
    name: 'Nhân viên',
  },
  {
    value: EJobLevel.LEADER,
    name: 'Trưởng nhóm',
  },
  {
    value: EJobLevel.HEAD_OR_DEPUTY_DEPARTMENT,
    name: 'Trưởng/phó phòng',
  },
  {
    value: EJobLevel.MANAGER,
    name: 'Quản lý',
  },
  {
    value: EJobLevel.HEAD_BRANCH,
    name: 'Trưởng chi nhánh',
  },
  {
    value: EJobLevel.VICE_DIRECTOR,
    name: 'Phó giám đốc',
  },
  {
    value: EJobLevel.DIRECTOR,
    name: 'Giám đốc',
  },
];

export const CJobExperience = [
  {
    value: EJobExperience.NOT_AVAILABLE,
    name: 'Chưa có kinh nghiệm',
  },
  {
    value: EJobExperience.UNDER_ONE,
    name: 'Dưới 1 năm kinh nghiệm',
  },
  {
    value: EJobExperience.ONE,
    name: '1 năm',
  },
  {
    value: EJobExperience.TWO,
    name: '2 năm',
  },
  {
    value: EJobExperience.THREE,
    name: '3 năm',
  },
  {
    value: EJobExperience.FOUR,
    name: '4 năm',
  },
  {
    value: EJobExperience.FIVE,
    name: '5 năm',
  },
  {
    value: EJobExperience.HIGHER_FIVE,
    name: 'Hơn 5 năm',
  },
];

export const CJobExperienceValue = [
  {
    value: {
      yearExperienceMin: 0,
      yearExperienceMax: 0,
    },
    name: 'Chưa có kinh nghiệm',
  },
  {
    value: {
      yearExperienceMin: 0,
      yearExperienceMax: 1,
    },
    name: 'Dưới 1 năm',
  },
  {
    value: {
      yearExperienceMin: 1,
      yearExperienceMax: 1,
    },
    name: '1 năm',
  },
  {
    value: {
      yearExperienceMin: 2,
      yearExperienceMax: 2,
    },
    name: '2 năm',
  },
  {
    value: {
      yearExperienceMin: 3,
      yearExperienceMax: 3,
    },
    name: '3 năm',
  },
  {
    value: {
      yearExperienceMin: 4,
      yearExperienceMax: 4,
    },
    name: '4 năm',
  },
  {
    value: {
      yearExperienceMin: 5,
      yearExperienceMax: 5,
    },
    name: '5 năm',
  },
  {
    value: {
      yearExperienceMin: 5,
      yearExperienceMax: 999,
    },
    name: 'Hơn 5 năm',
  },
];

export const CJobSalary = [
  {
    value: EJobSalary.UNDER_TEN,
    name: 'Dưới 10 triệu',
  },
  {
    value: EJobSalary.TEN_TO_FIFTEEN,
    name: '10 - 15 triệu',
  },
  {
    value: EJobSalary.FIFTEEN_TO_TWENTY,
    name: '15 - 20 triệu',
  },
  {
    value: EJobSalary.TWENTY_TO_TWENTY_FIVE,
    name: '20 - 25 triệu',
  },
  {
    value: EJobSalary.TWENTY_FIVE_TO_THIRTY,
    name: '25 -30 triệu',
  },
  {
    value: EJobSalary.THIRTY_TO_FIFTY,
    name: '30 -50 triệu',
  },
  {
    value: EJobSalary.HIGHER_FIFTY,
    name: 'Trên 50 triệu',
  },
  {
    value: EJobSalary.AGREEMENT,
    name: 'Thỏa thuận',
  },
];

export const CJobSalaryValue = [
  {
    value: {
      salaryMin: null,
      salaryMax: 10000000,
    },
    name: 'Dưới 10 triệu',
  },
  {
    value: {
      salaryMin: 10000000,
      salaryMax: 15000000,
    },
    name: '10 - 15 triệu',
  },
  {
    value: {
      salaryMin: 15000000,
      salaryMax: 20000000,
    },
    name: '15 - 20 triệu',
  },
  {
    value: {
      salaryMin: 20000000,
      salaryMax: 25000000,
    },
    name: '20 - 25 triệu',
  },
  {
    value: {
      salaryMin: 25000000,
      salaryMax: 30000000,
    },
    name: '25 -30 triệu',
  },
  {
    value: {
      salaryMin: 30000000,
      salaryMax: 50000000,
    },
    name: '30 -50 triệu',
  },
  {
    value: {
      salaryMin: 50000000,
      salaryMax: null,
    },
    name: 'Trên 50 triệu',
  },
  {
    value: {
      salaryMin: 0,
      salaryMax: 0,
    },
    name: 'Thỏa thuận',
  },
];

export const CJobType = [
  // {
  //   value: EJobType.NOT_YET,
  //   name: 'Chưa bắt đầu',
  // },
  {
    value: EJobType.IN_PROGRESS,
    name: 'Đang tuyển',
  },
  {
    value: EJobType.EXPIRED,
    name: 'Kết thúc',
  },
];
