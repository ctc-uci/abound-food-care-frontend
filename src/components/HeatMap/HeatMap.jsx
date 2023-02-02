import React, { useState, useEffect } from 'react';
import ScheduleSelector from 'react-schedule-selector';
import { startOfWeek } from 'date-fns';
import { PropTypes } from 'prop-types';
import { isEqual } from 'lodash';
import { AFCBackend, dayOfWeek } from '../../util/utils';

import styles from './HeatMap.module.css';

const HeatMap = ({
  eventInterest,
  driverOption,
  searchQuery,
  selectedTimeslot,
  setSelectedTimeslot,
}) => {
  const [avData, setAvData] = useState({});

  const selectTime = async t => {
    // Convert to readable date and time
    const time = new Date(Date.parse(String(t).split('GMT')[0]));
    const after = new Date(time.getTime() + 30 * 60 * 1000);

    // Update selected time
    const ts = {
      day: dayOfWeek[time.getDay()],
      time: [
        `${time.getHours()}:${
          time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
        }`,
        `${after.getHours()}:${
          after.getMinutes() < 10 ? `0${after.getMinutes()}` : after.getMinutes()
        }`,
      ],
    };

    setSelectedTimeslot(isEqual(ts, selectedTimeslot) ? {} : ts);
  };

  const generateShade = t => {
    if (!avData) {
      return '#F6FCFC';
    }

    const time = new Date(Date.parse(String(t).split('GMT')[0]));
    const after = new Date(time.getTime() + 30 * 60 * 1000);

    const ts = {
      day: dayOfWeek[time.getDay()],
      time: [
        `${time.getHours()}:${
          time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
        }`,
        `${after.getHours()}:${
          after.getMinutes() < 10 ? `0${after.getMinutes()}` : after.getMinutes()
        }`,
      ],
    };
    const sel = isEqual(ts, selectedTimeslot);

    const currFreq = Number(
      avData[
        `${dayOfWeek[time.getDay()]} ${time.getHours()}:${
          time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
        } to ${after.getHours()}:${
          after.getMinutes() < 10 ? `0${after.getMinutes()}` : after.getMinutes()
        }`
      ],
    );
    const frac = (Number.isNaN(currFreq) ? 0 : currFreq) / Math.max(...Object.values(avData));
    const [r, g, b] = [
      sel ? 255 : 242 - frac * 225,
      sel ? 250 - frac * 120 : 243 - frac * 156,
      sel ? 255 - frac * 255 : 252 - frac * 188,
    ];
    return !sel && frac === 0 ? '#F6FCFC' : `rgb(${r},${g},${b})`;
  };

  useEffect(async () => {
    const { data } = await AFCBackend.get('/volunteers/available', {
      params: {
        driverOption,
        ageOption: 'All',
        eventInterest,
        searchQuery,
      },
    });
    setAvData(data);
  }, [eventInterest, driverOption, searchQuery]);

  return (
    <div className={styles.avHeatmapContainer}>
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
    </div>
  );
};

HeatMap.propTypes = {
  eventInterest: PropTypes.string.isRequired,
  driverOption: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  selectedTimeslot: PropTypes.oneOf([Object]).isRequired,
  setSelectedTimeslot: PropTypes.func.isRequired,
};

export default HeatMap;
