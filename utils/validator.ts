export type RuleResult = boolean | string;

export const validateEmail = (rule: any, value: string): RuleResult => {
  if (!value) return true;

  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(value);
};

export const validatePhoneNumber = (rule: any, value: string): RuleResult => {
  if (!value) return true;

  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
};

export const validateNumber = (rule: any, value: string): RuleResult => {
  if (!value) return true;

  return /^\d+$/g.test(value) && parseInt(value, 10) > 0;
};

export const validateYearExperience = (
  rule: any,
  value: string,
): RuleResult => {
  if (!value) return true;

  return /^\d{1,2}$/g.test(value);
};

export const validateSalary = (rule: any, value: string): RuleResult => {
  if (!value) return true;

  return /^(1000000|[1-9]\d{6,8}|[1-4]\d{8}|1000000000)$/g.test(value);
};

export const validateContent = (rule: any, value: string): RuleResult => {
  if (!value) return true;

  return value !== '<p></p>';
};
