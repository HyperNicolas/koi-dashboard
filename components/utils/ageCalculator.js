import parse from 'date-fns/parse';
import sub from 'date-fns/sub';
import format from 'date-fns/format';
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';
import differenceInMonths from 'date-fns/differenceInMonths';

export const getCurrentAgeText = (birthDate, age) => {
  const newBirthDate = parse(birthDate, 'yyyy-MM-dd', new Date());
  const ageInMonths = age
    ? age
    : differenceInCalendarMonths(new Date(), newBirthDate);
  if (ageInMonths < 15) {
    return 'Tosai';
  } else if (ageInMonths < 27) {
    return 'Nisai';
  } else if (ageInMonths < 39) {
    return 'Sansai';
  } else if (ageInMonths < 51) {
    return 'Yonsai';
  } else if (ageInMonths < 63) {
    return 'Gosai';
  } else if (63 <= ageInMonths) {
    return 'Rokusai +';
  }
};
export const getFormattedDate = (date) => {
  const newDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(newDate, 'dd/MM/yyyy');
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
