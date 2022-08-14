import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

const ProfileAvailability = ({ volunteerAvailability }) => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState(false);

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

  const convertData = times => {
    const data = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let day = 0; day < 7; day += 1) {
      const dataAvailability = availabilityData.filter(
        availability => availability.dayOfWeek === days[day],
      );
      const dayArray = [];
      if (dataAvailability.length > 0) {
        const startTimes = dataAvailability.map(d => {
          return d.startTime.slice(0, d.startTime.lastIndexOf(':'));
        });
        times.forEach(time => {
          let available = false;
          if (startTimes.includes(time)) available = true;
          if (available) dayArray.push(2);
          else dayArray.push(1);
        });
      } else {
        for (let i = 0; i < times.length; i += 1) {
          dayArray.push(1);
        }
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
      const y = data[i][16 - index];
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
        data: generateData(7, data, i),
      };
    });
    setSeries(generatedSeries);
  };

  useEffect(() => {
    setAvailabilityData(volunteerAvailability);
    if (volunteerAvailability) {
      setDataRetrieved(true);
    }
  }, [volunteerAvailability]);

  useEffect(() => {
    setOptions(chartOptions);
    if (dataRetrieved) {
      generateSeries(9, 17);
    }
  }, [dataRetrieved]);

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
  volunteerAvailability: PropTypes.arrayOf(
    PropTypes.shape({
      endTime: PropTypes.string,
      startTime: PropTypes.string,
      dayOfWeek: PropTypes.string,
    }),
  ),
};

ProfileAvailability.defaultProps = {
  volunteerAvailability: [],
};

export default ProfileAvailability;
