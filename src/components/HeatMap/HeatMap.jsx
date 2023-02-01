import React, { useState, useEffect } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import { startOfWeek } from 'date-fns';
import { PropTypes } from 'prop-types';
import { AFCBackend, dayOfWeek } from '../../util/utils';

import styles from './HeatMap.module.css';

// const afterTimes = {
//   '08:00AM': '08:30AM',
//   '08:30AM': '09:00AM',
//   '09:00AM': '09:30AM',
//   '09:30AM': '10:00AM',
//   '10:00AM': '10:30AM',
//   '10:30AM': '11:00AM',
//   '11:00AM': '11:30AM',
//   '11:30AM': '12:00PM',
//   '12:00PM': '12:30PM',
//   '12:30PM': '13:00PM',
//   '13:00PM': '13:30PM',
//   '13:30PM': '14:00PM',
//   '14:00PM': '14:30PM',
//   '14:30PM': '15:00PM',
//   '15:00PM': '15:30PM',
//   '15:30PM': '16:00PM',
//   '16:00PM': '16:30PM',
//   '16:30PM': '17:00PM',
//   '17:00PM': '17:30PM',
// };

// const timePairs = Object.entries(afterTimes).map(([start, end]) => [
//   start.substring(0, 5),
//   end.substring(0, 5),
// ]);

const HeatMap = ({ eventInterest, driverOption, searchQuery, setSelectedTimeslot }) => {
  const [avData, setAvData] = useState({});
  // const [options, setOptions] = useState(null);
  // const [series, setSeries] = useState([]);

  // const generateData = (startHour, endHour, data) => {
  //   return dayOfWeek.map(x => {
  //     const timestring = `${x} ${startHour.substring(0, 5)} to ${endHour.substring(0, 5)}`;
  //     const y = data[timestring] ? data[timestring] : 0; // value of each cell, remove + 1, set default as 0 during prod
  //     return { x, y };
  //   });
  // };

  // const generateSeries = async (startHour, endHour) => {
  //   const times = [];
  //   const { data } = await AFCBackend.get('/volunteers/available');
  //   for (let hour = startHour; hour <= endHour; hour += 1) {
  //     const formattedHour = hour < 10 ? `0${String(hour)}` : String(hour);
  //     const period = hour >= 12 ? 'PM' : 'AM';
  //     times.push(String(formattedHour).concat(':00').concat(period));
  //     if (hour !== endHour) {
  //       times.push(String(formattedHour).concat(':30').concat(period));
  //     }
  //   }

  //   const generatedSeries = times.reverse().map(time => ({
  //     name: time,
  //     data: generateData(time, afterTimes[time], data),
  //   }));
  //   await setSeries(generatedSeries);
  // };

  const selectTime = async t => {
    // Convert to readable date and time
    const time = new Date(Date.parse(String(t).split('GMT')[0]));
    const after = new Date(time.getTime() + 30 * 60 * 1000);

    console.log({
      day: dayOfWeek[time.getDay()],
      time: `${time.getHours()}:${
        time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
      } to ${after.getHours()}:${
        after.getMinutes() < 10 ? `0${after.getMinutes()}` : after.getMinutes()
      }`,
    });

    // Update selected time
    setSelectedTimeslot({
      day: dayOfWeek[time.getDay()],
      time: `${time.getHours()}:${
        time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
      } to ${after.getHours()}:${
        after.getMinutes() < 10 ? `0${after.getMinutes()}` : after.getMinutes()
      }`,
    });
  };

  const generateShade = time => {
    if (!avData) {
      return '#F6FCFC';
    }
    const currFreq = Number(avData[JSON.stringify(time)]);
    const frac = (Number.isNaN(currFreq) ? 0 : currFreq) / Number(Math.max(Object.values(avData)));
    const r = 121 - frac * 121;
    const g = 156 - frac * 94;
    const b = 168 - frac * 85;
    const color = frac === 0 ? '#F6FCFC' : `rgb(${r},${g},${b})`;
    // eslint-disable-next-line max-len
    // const nameList = nameMap.get(JSON.stringify(time)) === undefined ? 0 : nameMap.get(JSON.stringify(time)).length;
    // const nameCount = freqMap.get(JSON.stringify(time)) || 0;
    // const maxCount = maxFreq;
    // console.log(`${JSON.stringify(time)}: ${nameCount} / ${maxCount}, color: ${color}`);
    return color;
  };

  // const onClick = async () => {};

  useEffect(async () => {
    const { data } = await AFCBackend.get('/volunteers/available');
    console.log(data);
    setAvData(data);
  }, [eventInterest, driverOption, searchQuery]);

  return (
    <ScheduleSelector
      selectionScheme="square"
      startDate={startOfWeek(new Date())}
      numDays={7}
      minTime={0}
      maxTime={24}
      hourlyChunks={2}
      timeFormat="h:mm A"
      dateFormat="ddd"
      columnGap="4px"
      rowGap="2px"
      renderDateCell={(time, selected, refSetter) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={`${styles.avGridCell} ${''}`}
          style={{ backgroundColor: generateShade(time) }}
          ref={refSetter}
          onClick={() => selectTime(time)}
          role="button"
          tabIndex="0"
        >
          {' '}
        </div>
      )}
    />
  );
};

HeatMap.propTypes = {
  eventInterest: PropTypes.string.isRequired,
  driverOption: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSelectedTimeslot: PropTypes.func.isRequired,
};

export default HeatMap;
