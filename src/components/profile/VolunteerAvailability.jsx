import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
// import ApexCharts from 'apexcharts';

const VolunteerAvailability = () => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);

  const ACTUAL_DUMMY_DATA = [
    {
      user_id: 1,
      day_of_week: 'sunday',
      start_time: '10:00am',
      end_time: '4:30pm',
    },
    {
      user_id: 1,
      day_of_week: 'monday',
      start_time: '9:00am',
      end_time: '4:30pm',
    },
    {
      user_id: 1,
      day_of_week: 'tuesday',
      start_time: '10:00am',
      end_time: '3:00pm',
    },
    {
      user_id: 1,
      day_of_week: 'wednesday',
      start_time: '11:30am',
      end_time: '4:30pm',
    },
    {
      user_id: 1,
      day_of_week: 'thursday',
      start_time: '11:00am',
      end_time: '4:30pm',
    },
    {
      user_id: 1,
      day_of_week: 'friday',
      start_time: '9:00am',
      end_time: '12:00pm',
    },
    {
      user_id: 1,
      day_of_week: 'saturday',
      start_time: '9:00am',
      end_time: '12:00pm',
    },
  ];

  const convertData = times => {
    const data = [];
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    for (let day = 0; day < 7; day += 1) {
      const dataAvailability = ACTUAL_DUMMY_DATA.filter(
        availability => availability.day_of_week === days[day],
      )[0];
      const dayArray = [];
      let available = false;
      for (let i = 0; i < times.length; i += 1) {
        if (times[i] === dataAvailability.start_time) available = true;
        if (times[i] === dataAvailability.end_time) available = false;

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
  }, []);

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
