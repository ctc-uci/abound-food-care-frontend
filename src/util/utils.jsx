import axios from 'axios';

const baseURL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

const AFCBackend = axios.create({
  baseURL,
  withCredentials: true,
});

const getMonthString = timestamp => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[new Date(timestamp).getMonth()];
};

const getTimeInPST = timestamp => {
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }, 'en-US');
};

const getHourDiff = (timestamp1, timestamp2) => {
  const d1 = new Date(timestamp1);
  const d2 = new Date(timestamp2);
  const diff = Math.abs(d1 - d2) / 36e5;
  return diff % 1 === 0 ? diff : diff.toFixed(2);
};

const buildLanguagesArray = values => {
  const languages = [];
  if (values.english) {
    languages.push('english');
  }
  if (values.spanish) {
    languages.push('spanish');
  }
  if (values.french) {
    languages.push('french');
  }
  if (values.chinese) {
    languages.push('chinese');
  }
  if (values.tagalog) {
    languages.push('tagalog');
  }
  if (values.korean) {
    languages.push('korean');
  }
  if (values.arabic) {
    languages.push('arabic');
  }
  if (values.german) {
    languages.push('german');
  }
  if (values.vietnamese) {
    languages.push('vietnamese');
  }

  return languages;
};

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeOfDay = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const zipRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

export {
  AFCBackend,
  getMonthString,
  getTimeInPST,
  getHourDiff,
  buildLanguagesArray,
  dayOfWeek,
  timeOfDay,
  phoneRegExp,
  zipRegExp,
};
