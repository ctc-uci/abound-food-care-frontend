import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import utils from '../../util/utils';

// import ApexCharts from 'apexcharts';

const VolunteerAvailability = () => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [userId, setUserId] = useState(3);

  useEffect(async () => {
    setUserId(3);
    const availabilityData = await axios.get(`http://localhost:3001/availability/${userId}`);
    setAvailability(availabilityData.data.availabilities);
  }, []);

  const convertData = times => {
    const data = [];
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    for (let day = 0; day < 7; day += 1) {
      const filteredAvailability = availability.filter(
        item => item.dayOfWeek.toLowerCase() === days[day],
      );
      const dayArray = [];
      for (let i = 0; i < times.length; i += 1) {
        let available = false;
        for (let j = 0; j < filteredAvailability.length; j += 1) {
          if (utils.compareTimeToTimestamp(times[i], filteredAvailability[j].startTime)) {
            available = true;
            if (utils.compareTimeToTimestamp(times[i], filteredAvailability[j].endTime)) {
              available = false;
            }
          }
        }

        if (available) {
          dayArray.push(2);
          console.log('pushing', filteredAvailability[0].startTime);
        } else dayArray.push(1);
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
      const y = data[i][data[i].length - index - 1];
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
      const formattedHour =
        hour === 12 ? '12' : (hour % 12 < 10 ? `0${hour % 12}` : hour % 12).toString();
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

  useEffect(async () => {
    const values = {
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
    setOptions(values);
    generateSeries(9, 17);
  }, [availability]);

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

export default VolunteerAvailability;
