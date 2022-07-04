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
  return Math.abs(d1 - d2) / 36e5;
};

export { AFCBackend, getMonthString, getTimeInPST, getHourDiff };
