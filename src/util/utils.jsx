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

const localeSort = (a, b) => a.localeCompare(b);

const languageOptions = [
  'english',
  'spanish',
  'french',
  'chinese',
  'tagalog',
  'korean',
  'arabic',
  'german',
  'vietnamese',
];

const buildLanguagesArray = values => languageOptions.filter(lang => values[lang]);

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeOfDay = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];

const stateAbbrs = [
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY',
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const zipRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

export {
  AFCBackend,
  getMonthString,
  getTimeInPST,
  getHourDiff,
  localeSort,
  languageOptions,
  buildLanguagesArray,
  dayOfWeek,
  timeOfDay,
  stateAbbrs,
  phoneRegExp,
  zipRegExp,
};
