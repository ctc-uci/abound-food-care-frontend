import React from 'react';
import Chart from 'react-apexcharts';
// import ApexCharts from 'apexcharts';

const HeatMap = () => {
  const [options, setOptions] = React.useState(null);
  const [series, setSeries] = React.useState(null);
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
      const y = Math.floor(Math.random() * 10); // value of each cell
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
