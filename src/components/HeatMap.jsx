import React from 'react';
import Chart from 'react-apexcharts';
// import ApexCharts from 'apexcharts';
import axios from 'axios';

const HeatMap = () => {
  const [options, setOptions] = React.useState(null);
  const [series, setSeries] = React.useState([]);

  const generateData = (count, startHour, endHour, data) => {
    const dayOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    let i = 0;
    const generatedSeries = [];
    while (i < count) {
      const x = dayOfWeek[i];
      const timestring = `${x} ${startHour.substring(0, 5)} to ${endHour.substring(0, 5)}`;
      const y = data[timestring] ? data[timestring] + 1 : 1; // value of each cell, remove + 1, set default as 0 during prod
      generatedSeries.push({
        x,
        y,
      });
      i += 1;
    }
    return generatedSeries;
  };

  const generateSeries = async (startHour, endHour) => {
    const times = [];
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
      '12:30PM': '1:00PM',
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
    let data = {};
    await axios.get('http://localhost:3001/volunteers/available').then(res => {
      data = res.data;
    });
    for (let hour = startHour; hour <= endHour; hour += 1) {
      const formattedHour = hour < 10 ? `0${String(hour)}` : String(hour);
      const period = hour >= 12 ? 'PM' : 'AM';
      times.push(String(formattedHour).concat(':00').concat(period));
      if (hour !== endHour) {
        times.push(String(formattedHour).concat(':30').concat(period));
      }
    }

    const generatedSeries = times.reverse().map(time => {
      return {
        name: time,
        data: generateData(7, time, afterTimes[time], data),
      };
    });
    await setSeries(generatedSeries);
  };

  React.useEffect(() => {
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

  const renderChart = () => {
    if (options) {
      return <Chart options={options} series={series} type="heatmap" width="800" height="500" />;
    }
    return null;
  };

  return (
    <div>
      <div className="mixed-chart"> {renderChart()} </div>
    </div>
  );
};

export default HeatMap;
