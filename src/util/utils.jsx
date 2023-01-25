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

const nullOrErrorMessage = (fieldName, msg) =>
  msg.includes('but the final value was: `null`') || msg.includes('but the final value was: `NaN`')
    ? `${fieldName} is a required field`
    : msg;

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

const eventRequirements = [
  'canDrive',
  'isAdult',
  'isMinor',
  'firstAidTraining',
  'serveSafeKnowledge',
  'transportationExperience',
  'movingWarehouseExperience',
  'foodServiceIndustryKnowledge',
];

const eventRequirementsMap = {
  canDrive: 'Can Drive',
  isAdult: 'Adult (Age 18+)',
  isMinor: 'Minor (Age <18)',
  firstAidTraining: 'First Aid Training',
  serveSafeKnowledge: 'Serve Safe Knowledge',
  transportationExperience: 'Transportation Experience',
  movingWarehouseExperience: 'Moving/Warehouse Experience',
  foodServiceIndustryKnowledge: 'Food Service Industry Knowledge',
};

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeOfDay = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];

// Converts { startTime, endTime, dayOfWeek } to JS Date
const convertSlotsToDates = slots =>
  slots.map(s => {
    const [hours, mins] = s.startTime.split('+')[0].split(':').slice(0, 2);
    const date = new Date();
    return new Date(
      new Date(
        date.setDate(date.getDate() - date.getDay() + dayOfWeek.indexOf(s.dayOfWeek)),
      ).setHours(hours, mins - date.getTimezoneOffset(), 0),
    );
  });

// Converts JS Date to { startTime, endTime, dayOfWeek }
const convertDatesToSlots = dates =>
  dates.map(d => {
    const date = new Date(d.setMinutes(d.getMinutes() + d.getTimezoneOffset()));
    return {
      endTime: `${date.getMinutes() === 30 ? (date.getHours() + 1) % 24 : date.getHours()}:${
        date.getMinutes() === 30 ? '00' : '30'
      }:00${date.getTimezoneOffset() < 0 ? '+' : '-'}${Math.abs(
        Math.floor(date.getTimezoneOffset() / 60),
      )}`,
      startTime: `${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}:00${
        date.getTimezoneOffset() < 0 ? '+' : '-'
      }${Math.abs(Math.floor(date.getTimezoneOffset() / 60))}`,
      dayOfWeek: dayOfWeek[date.getDay()],
    };
  });

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

const userProfileTriggers = {
  general: [
    'firstName',
    'lastName',
    'organization',
    'birthdate',
    'email',
    'phone',
    'preferredContactMethod',
    'addressStreet',
    'addressCity',
    'addressState',
    'addressZip',
  ],
  password: ['password'],
  rolesAndSkills: ['weightLiftingAbility', 'canDrive', 'willingToDrive'],
  additionalInfo: ['duiHistory', 'criminalHistory', 'completedChowmatchTraining'],
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const zipRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

export {
  AFCBackend,
  getMonthString,
  getTimeInPST,
  getHourDiff,
  localeSort,
  nullOrErrorMessage,
  languageOptions,
  buildLanguagesArray,
  eventRequirements,
  eventRequirementsMap,
  dayOfWeek,
  timeOfDay,
  convertSlotsToDates,
  convertDatesToSlots,
  stateAbbrs,
  userProfileTriggers,
  phoneRegExp,
  zipRegExp,
};
