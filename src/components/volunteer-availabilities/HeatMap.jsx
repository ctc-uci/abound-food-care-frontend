import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
// import ApexCharts from 'apexcharts';
import { PropTypes } from 'prop-types';
import { AFCBackend, dayOfWeek } from '../../util/utils';

const afterTimes = {
  '08:00AM': '08:30AM',
  '08:30AM': '09:00AM',
  '09:00AM': '09:30AM',
  '09:30AM': '10:00AM',
  '10:00AM': '10:30AM',
  '10:30AM': '11:00AM',
  '11:00AM': '11:30AM',
  '11:30AM': '12:00PM',
  '12:00PM': '12:30PM',
  '12:30PM': '13:00PM',
  '13:00PM': '13:30PM',
  '13:30PM': '14:00PM',
  '14:00PM': '14:30PM',
  '14:30PM': '15:00PM',
  '15:00PM': '15:30PM',
  '15:30PM': '16:00PM',
  '16:00PM': '16:30PM',
  '16:30PM': '17:00PM',
  '17:00PM': '17:30PM',
};

const timePairs = Object.entries(afterTimes).map(([start, end]) => [
  start.substring(0, 5),
  end.substring(0, 5),
]);

const HeatMap = ({ onSelectedTimeslot }) => {
  const [options, setOptions] = React.useState(null);
  const [series, setSeries] = React.useState([]);

  const generateData = (startHour, endHour, data) => {
    return dayOfWeek.map(x => {
      const timestring = `${x} ${startHour.substring(0, 5)} to ${endHour.substring(0, 5)}`;
      const y = data[timestring] ? data[timestring] : 0; // value of each cell, remove + 1, set default as 0 during prod
      return { x, y };
    });
  };

  const generateSeries = async (startHour, endHour) => {
    const times = [];
    const { data } = await AFCBackend.get('/volunteers/available');
    for (let hour = startHour; hour <= endHour; hour += 1) {
      const formattedHour = hour < 10 ? `0${String(hour)}` : String(hour);
      const period = hour >= 12 ? 'PM' : 'AM';
      times.push(String(formattedHour).concat(':00').concat(period));
      if (hour !== endHour) {
        times.push(String(formattedHour).concat(':30').concat(period));
      }
    }

    const generatedSeries = times.reverse().map(time => ({
      name: time,
      data: generateData(time, afterTimes[time], data),
    }));
    // console.log(generatedSeries);
    await setSeries(generatedSeries);
  };

  const onSquareClick = (event, chartContext, config) => {
    // Get square coordinates
    const rowIndex = config.seriesIndex;
    const colIndex = config.dataPointIndex;

    // Convert to readable date and time
    const day = dayOfWeek[colIndex];
    const time = timePairs[18 - rowIndex];

    // Update selected time
    onSelectedTimeslot(day, time);
  };

  useEffect(() => {
    const values = {
      chart: {
        id: 'availability',
        height: 350,
        type: 'heatmap',
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 5,
          },
        },
        events: {
          dataPointSelection: onSquareClick,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
      },
      colors: ['#44966d'],
    };
    setOptions(values);
    generateSeries(9, 17);
  }, []);

  return (
    options && <Chart options={options} series={series} type="heatmap" width="800" height="500" />
  );
};

HeatMap.propTypes = {
  onSelectedTimeslot: PropTypes.func.isRequired,
};

export default HeatMap;
