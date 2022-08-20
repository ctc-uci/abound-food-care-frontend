import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import { dayOfWeek } from '../../util/utils';
import styles from './AvailabilityChart.module.css';

const AvailabilityChart = ({ availability, setAvailability, title, days, currDayOfWeek }) => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);

  const convertData = times => {
    const data = [];
    for (let day = 0; day < 7; day += 1) {
      const dayArray = [];
      for (let i = 0; i < times.length; i += 1) {
        const dayAvailabilities = availability.filter(a => a.dayOfWeek === dayOfWeek[day]);
        const available = dayAvailabilities.filter(
          d => d.startTime.substring(0, d.startTime.lastIndexOf(':')) === times[i],
        );
        if (available.length > 0) {
          dayArray.push(2);
        } else {
          dayArray.push(1);
        }
      }
      data.push(dayArray);
    }
    console.log(data);
    return data;
  };
  const generateData = (count, data, index) => {
    let i = 0;
    const generatedSeries = [];
    while (i < count) {
      const correctedDayOfWeek = days === 1 ? currDayOfWeek : i;
      const x = dayOfWeek[correctedDayOfWeek];
      const y = data[correctedDayOfWeek][16 - index];
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
      const formattedHour = hour < 10 ? `0${hour.toString()}` : hour.toString();
      times.push(formattedHour.concat(':00'));
      if (hour !== endHour) {
        times.push(formattedHour.concat(':30'));
      }
    }
    const data = convertData(times);
    const generatedSeries = times.reverse().map((time, i) => {
      return {
        name: time,
        data: generateData(days, data, i),
      };
    });
    setSeries(generatedSeries);
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
    return `${startHour}:${endMinutes}:00`;
  };

  const updateAvailability = (currSeries, rowIndex, colIndex, value) => {
    const startTime = `${currSeries[rowIndex].name}:00`;
    const endTime = getEndTime(startTime);
    const eventDayOfWeek = currSeries[rowIndex].data[colIndex].x;

    const selectedAvailability = {
      dayOfWeek: eventDayOfWeek,
      startTime,
      endTime,
    };

    if (value === 2) {
      setAvailability(prevAvailability => [...prevAvailability, selectedAvailability]);
    } else {
      setAvailability(prevAvailability =>
        prevAvailability.filter(
          avail =>
            selectedAvailability.dayOfWeek !== avail.dayOfWeek ||
            selectedAvailability.startTime !== avail.startTime ||
            selectedAvailability.endTime !== avail.endTime,
        ),
      );
    }
  };

  const onSquareClick = (event, chartContext, config) => {
    console.log(config);
    // Get square coordinates
    const rowIndex = config.seriesIndex;
    const colIndex = config.dataPointIndex;
    const currSeries = config.w.config.series;
    const curValue = currSeries[rowIndex].data[colIndex].y;
    console.log(rowIndex, colIndex, curValue);
    // check if it's selected already or not
    // toggle that value
    const newValue = curValue === 2 ? 1 : 2;
    currSeries[rowIndex].data[colIndex].y = newValue;
    updateAvailability(currSeries, rowIndex, colIndex, newValue);
    ApexCharts.exec('availability', 'updateSeries', currSeries);
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

  return (
    <div>
      <center>
        {title && <h1 className={styles.heading}>{title}</h1>}
        <div>
          {options && series && (
            <Chart options={options} series={series} type="heatmap" width="800" height="500" />
          )}
        </div>
      </center>
    </div>
  );
};

AvailabilityChart.propTypes = {
  availability: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setAvailability: PropTypes.func.isRequired,
  title: PropTypes.string,
  days: PropTypes.number.isRequired,
  currDayOfWeek: PropTypes.number,
};
AvailabilityChart.defaultProps = {
  title: undefined,
  currDayOfWeek: undefined,
};

export default AvailabilityChart;
