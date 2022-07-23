import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import PropTypes from 'prop-types';

import styles from './WeeklyInfo.module.css';

const WeeklyInfo = ({ availability, setAvailability }) => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);
  const [deselected, setDeselected] = useState([]);

  const generateData = count => {
    const dayOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let i = 0;
    const generatedSeries = [];
    while (i < count) {
      const x = dayOfWeek[i];
      const y = 1;
      generatedSeries.push({
        x,
        y,
      });
      i += 1;
    }
    return generatedSeries;
  };

  const generateSeries = (startHour, endHour) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour += 1) {
      const formattedHour = hour % 12 === 0 ? '12' : (hour % 12).toString();
      const period = hour > 12 ? 'PM' : 'AM';
      times.push(formattedHour.concat(':00').concat(period));
      if (hour !== endHour) {
        times.push(formattedHour.concat(':30').concat(period));
      }
    }

    const generatedSeries = times.reverse().map(time => {
      return {
        name: time,
        data: generateData(7),
      };
    });
    setSeries(generatedSeries);
  };

  const toMilitary = time => {
    const justTime = time.slice(0, -2);
    let militaryTime = '';
    switch (justTime) {
      case '1:00':
        militaryTime = '13:00';
        break;
      case '1:30':
        militaryTime = '13:30';
        break;
      case '2:00':
        militaryTime = '14:00';
        break;
      case '2:30':
        militaryTime = '14:30';
        break;
      case '3:00':
        militaryTime = '15:00';
        break;
      case '3:30':
        militaryTime = '15:30';
        break;
      case '4:00':
        militaryTime = '16:00';
        break;
      case '4:30':
        militaryTime = '16:30';
        break;
      case '5:00':
        militaryTime = '17:00';
        break;
      default:
        militaryTime = '12:00';
    }
    return militaryTime;
  };

  const getEndTime = startTime => {
    const startMinutes = startTime.slice(startTime.indexOf(':') + 1, startTime.lastIndexOf(':'));
    let startHour = startTime.split(':')[0];
    let endMinutes = '';
    switch (startMinutes) {
      case '00':
        endMinutes = '30';
        break;
      case '30':
        endMinutes = '00';
        break;
      default:
        endMinutes = '00';
    }
    if (endMinutes === '00') {
      startHour = (parseInt(startHour, 10) + 1).toString();
    }
    return `1970-01-01 ${startHour}:${endMinutes}:00 America/Los_Angeles`;
  };

  const updateAvailability = (heatmapSeries, rowIndex, colIndex, value) => {
    let startTime = heatmapSeries[rowIndex].name;
    if (startTime.slice(-2) === 'PM') {
      startTime = toMilitary(startTime);
      startTime = `${startTime}:00`;
    } else {
      startTime = `${startTime.slice(0, -2)}:00`;
    }
    const endTime = getEndTime(startTime);
    startTime = `1970-01-01 ${startTime} America/Los_Angeles`;
    const dayOfWeek = heatmapSeries[rowIndex].data[colIndex].x;
    const availabilityObject = {
      dayOfWeek,
      startTime,
      endTime,
    };
    if (value === 2) {
      setAvailability(avail => [...avail, availabilityObject]);
    } else {
      setDeselected(deselectedAvail => [...deselectedAvail, availabilityObject]);
    }
  };

  const onSquareClick = (event, chartContext, config) => {
    // Get square coordinates
    const rowIndex = config.seriesIndex;
    const colIndex = config.dataPointIndex;
    const updatedSeries = config.w.config.series;
    const curValue = updatedSeries[rowIndex].data[colIndex].y;
    // check if it's selected already or not
    // toggle that value
    const newValue = curValue === 2 ? 1 : 2;
    updatedSeries[rowIndex].data[colIndex].y = newValue;
    updateAvailability(updatedSeries, rowIndex, colIndex, newValue);
    ApexCharts.exec('availability', 'updateSeries', updatedSeries);
  };

  useEffect(() => {
    const updatedAvailability = availability.filter(availabilityObject => {
      return !deselected.find(
        rm =>
          rm.dayOfWeek === availabilityObject.dayOfWeek &&
          rm.startTime === availabilityObject.startTime &&
          rm.endTime === availabilityObject.endTime,
      );
    });
    setAvailability(updatedAvailability);
  }, [deselected]);

  useEffect(() => {
    const values = {
      chart: {
        id: 'availability',
        height: 350,
        type: 'heatmap',
        toolbar: {
          show: false,
        },
        events: {
          dataPointSelection: onSquareClick,
        },
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 5,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [
              {
                from: 1,
                to: 1,
                color: '#D3D3D3',
                name: 'unavailable',
              },
              {
                from: 2,
                to: 2,
                color: '#00008B',
                name: 'available',
              },
            ],
          },
        },
      },
    };
    setOptions(values);
    generateSeries(9, 17);
  }, []);

  const renderChart = () => {
    if (options) {
      return <Chart options={options} series={series} type="heatmap" width="800" height="500" />;
    }
    return null;
  };

  return (
    <div className="app">
      <center>
        <h1 className={styles.heading}>Weekly Availability</h1>
        <div className="row">
          <div className="mixed-chart"> {renderChart()} </div>
        </div>
      </center>
    </div>
  );
};

WeeklyInfo.propTypes = {
  availability: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setAvailability: PropTypes.func.isRequired,
};

// WeeklyInfo.defaultProps = {
//   createAccountVersion: true,
// };

export default WeeklyInfo;
