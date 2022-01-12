import React from 'react';
import Chart from 'react-apexcharts';

const WeeklyInfo = () => {
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
      const y = 1;
      generatedSeries.push({
        x,
        y,
      });
      i += 1;
    }
    // console.log(generatedSeries);
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
    console.log(series);
  }, [series]);

  const onSquareClick = (event, chartContext, config) => {
    console.log(series);
    // what square was clicked?
    // seriesIndex = row (bottom = 0)
    // dataPointIndex = column (left = 0)

    // what value does it have?
    // check if it's selected already or not

    // toggle that value
    // console.log(event);
    // console.log(chartContext);
    // console.log(config);
    const rowIndex = config.seriesIndex;
    const colIndex = config.dataPointIndex;
    console.log(rowIndex, colIndex);
    console.log(config);
    console.log(config.w.config.series);
    const updatedSeries = config.w.config.series;
    console.log(updatedSeries);

    console.log(updatedSeries[0].data[colIndex]);
    // set y value to opposite
    updatedSeries[0].data[colIndex].y = 100;
    console.log(updatedSeries);
    setSeries(updatedSeries);
    // updatedSeries
  };

  React.useEffect(() => {
    const values = {
      chart: {
        height: 350,
        type: 'heatmap',
        events: {
          dataPointSelection: onSquareClick,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
    };
    setOptions(values);
    generateSeries(9, 17);
  }, []);

  const renderChart = () => {
    if (options) {
      return <Chart options={options} series={series} type="heatmap" width="500" height="500" />;
    }
    return null;
  };

  return (
    <div className="app">
      <h1>Weekly Availability</h1>
      <div className="row">
        <div className="mixed-chart"> {renderChart()} </div>
      </div>
    </div>
  );
};

export default WeeklyInfo;
