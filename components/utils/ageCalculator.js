import {
  parse,
  format,
  differenceInCalendarMonths,
  differenceInMonths,
} from 'date-fns';

export const getCurrentAgeText = (birthDate, age) => {
  const newBirthDate = parse(birthDate, 'yyyy-MM-dd', new Date());
  const newDate = parse(age, 'yyyy-MM-dd', new Date());
  const newAge = differenceInMonths(newDate, newBirthDate);
  if (newAge < 15) {
    return 'Tosai';
  } else if (newAge < 27) {
    return 'Nisai';
  } else if (newAge < 39) {
    return 'Sansai';
  } else if (newAge < 51) {
    return 'Yonsai';
  } else if (newAge < 63) {
    return 'Gosai';
  } else if (63 <= newAge) {
    return 'Rokusai +';
  }
};
export const getFormattedDate = (date) => {
  const newDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(newDate, 'dd/MM/yyyy');
};
export const getHistoryFormattedDate = (date) => {
  const newDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(newDate, 'do MMMM yyyy');
};

export const getAgeDifferenceDate = (birthDate, date) => {
  const newBirthDate = parse(birthDate, 'yyyy-MM-dd', new Date());
  const newDate = parse(date, 'yyyy-MM-dd', new Date());
  const age = differenceInMonths(newDate, newBirthDate);
  return age;
};

export const getCurrentAgeInMonths = (birthDate) => {
  const newBirthDate = parse(birthDate, 'yyyy-MM-dd', new Date());
  const ageInMonths = differenceInCalendarMonths(new Date(), newBirthDate);
  return ageInMonths;
};
