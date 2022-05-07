import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const numToDayOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const times = [
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '1:00',
  '1:30',
  '2:00',
  '2:30',
  '3:00',
  '3:30',
  '4:00',
  '4:30',
  '5:00',
];

const getIncrements = (startTime, endTime) => {
  let parsedStart = new Date(2000, 1, 0, startTime.slice(0, 2), startTime.slice(3, 5));
  const parsedEnd = new Date(2000, 1, 0, endTime.slice(0, 2), endTime.slice(3, 5));
  const increments = [];
  while (parsedStart.getTime() <= parsedEnd.getTime()) {
    const minutes = parsedStart.getMinutes().toString();
    const hours = parsedStart.getHours();
    increments.push(
      `${hours > 12 ? (hours - 12).toString() : hours.toString()}:${
        minutes.length === 1 ? '00' : minutes
      }`,
    );
    parsedStart = new Date(parsedStart.getTime() + 30 * 60000);
  }
  return increments;
};

const Availability = ({ availabilities, eventStartDate }) => {
  let dayOfWeek = new Date(eventStartDate);
  dayOfWeek = numToDayOfWeek[dayOfWeek.getDay()];
  let parsedAvails = availabilities.filter(avail => avail.dayOfWeek === dayOfWeek);
  parsedAvails = parsedAvails.reduce(
    // (increments, a) => [...increments, ...getIncrements('09:00', '17:00')],
    (increments, a) => [...increments, ...getIncrements(a.startTime, a.endTime)],
    [],
  );

  parsedAvails = times.reduce(
    (increments, time) => [
      { name: time, data: parsedAvails.includes(time) ? [1] : [0] },
      ...increments,
    ],
    [],
  );

  const options = {
    chart: {
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#115740'],
    title: {
      text: new Date().toDateString(),
    },
    toolbar: {
      show: false,
    },
  };

  const renderChart = () => {
    if (options) {
      return <Chart options={options} series={parsedAvails} type="heatmap" height="500" />;
    }
    return null;
  };

  return (
    <div>
      <div> {renderChart()} </div>
    </div>
  );
};

Availability.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  availabilities: PropTypes.array.isRequired,
  eventStartDate: PropTypes.string.isRequired,
};

export default Availability;
