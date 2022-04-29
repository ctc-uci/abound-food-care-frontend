/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

const ProfileAvailability = ({ userId }) => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);

  const chartOptions = {
    xaxis: {
      position: 'top',
    },
    legend: {
      show: false,
    },
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
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    noData: {
      text: 'Loading...',
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
              color: '#115740',
              name: 'available',
            },
          ],
        },
      },
    },
  };

  const getUserAvailability = async () => {
    try {
      const { data: res } = await axios.get(`http://localhost:3001/availability/${userId}`);
      const { availabilities } = res;
      setAvailabilityData(availabilities);
    } catch (e) {
      console.log(e.message);
    }
  };

  const convertData = times => {
    const data = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let day = 0; day < 7; day += 1) {
      // TODO: fix issue with filtering
      const dataAvailability = availabilityData.filter(
        availability => availability.dayOfWeek === days[day],
      )[0];
      const dayArray = [];
      let available = false;
      for (let i = 0; i < times.length; i += 1) {
        if (times[i] === dataAvailability.startTime) available = true;
        if (times[i] === dataAvailability.endTime) available = false;

        if (available) dayArray.push(2);
        else dayArray.push(1);
      }
      data.push(dayArray);
    }
    return data;
  };
  const generateData = (count, data, index) => {
    const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let i = 0;
    const generatedSeries = [];
    while (i < count) {
      const x = dayOfWeek[i];
      const y = data[i][index]; // need to reverse this
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
      const period = hour >= 12 ? 'pm' : 'am';
      times.push(formattedHour.concat(':00').concat(period));
      if (hour !== endHour) {
        times.push(formattedHour.concat(':30').concat(period));
      }
    }
    const data = convertData(times);
    const generatedSeries = times.reverse().map((time, i) => {
      return {
        name: time,
        data: generateData(7, data, i),
      };
    });
    setSeries(generatedSeries);
  };

  useEffect(() => {
    getUserAvailability();
    setOptions(chartOptions);
    if (availabilityData.length > 0) {
      // console.log(availabilityData);
      // const data = [];
      // for (let i = 0; i < availabilityData.length; i += 1) {
      //   data.push(availabilityData[i]);
      // }
      generateSeries(9, 17);
    }
  }, [availabilityData]);

  const renderChart = () => {
    if (options) {
      return <Chart options={options} series={series} type="heatmap" width="800" height="500" />;
    }
    return null;
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart"> {renderChart()} </div>
      </div>
    </div>
  );
};

ProfileAvailability.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileAvailability;
