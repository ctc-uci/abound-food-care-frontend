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
  return Math.abs(d1 - d2) / 36e5;
};

const compareTimeToTimestamp = (t, timestamp) => {
  const timeMap = {
    '09:00am': '09:00:00-08',
    '09:30am': '09:30:00-08',
    '10:00am': '10:00:00-08',
    '10:30am': '10:30:00-08',
    '11:00am': '11:00:00-08',
    '11:30am': '11:30:00-08',
    '12:00pm': '12:00:00-08',
    '12:30pm': '12:30:00-08',
    '01:00pm': '13:00:00-08',
    '01:30pm': '13:30:00-08',
    '02:00pm': '14:00:00-08',
    '02:30pm': '14:30:00-08',
    '03:00pm': '15:00:00-08',
    '03:30pm': '15:30:00-08',
    '04:00pm': '16:00:00-08',
    '04:30pm': '16:30:00-08',
    '05:00pm': '17:00:00-08',
  };
  return timeMap[t] === timestamp;
};

export default { getMonthString, getTimeInPST, getHourDiff, compareTimeToTimestamp };
