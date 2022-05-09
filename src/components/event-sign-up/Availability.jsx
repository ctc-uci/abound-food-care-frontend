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

const Availability = ({ availabilities, eventStartDate }) => {
  const eventDate = new Date(eventStartDate);
  const dayOfWeek = numToDayOfWeek[eventDate.getDay()];
  let parsedAvails = availabilities[dayOfWeek];

  parsedAvails = times.reduce(
    (increments, time) => [
      { name: time, data: parsedAvails.includes(time) ? [1] : [0] },
      ...increments,
    ],
    [],
  );

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      events: {},
    },
    plotOptions: {
      heatmap: {
        radius: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#115740'],
    title: {
      text: `${dayOfWeek} -
            ${months[eventDate.getMonth()]}
            ${eventDate.getDay()},
            ${eventDate.getFullYear()}`,
      align: 'center',
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    yaxis: {
      labels: {
        formatter(value) {
          return value[value.length - 2] === '3' ? '' : value;
        },
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    selection: {
      enabled: false,
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
  };

  return <Chart options={options} series={parsedAvails} type="heatmap" height="500" />;
};

Availability.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  availabilities: PropTypes.object.isRequired,
  eventStartDate: PropTypes.string.isRequired,
};

export default Availability;
