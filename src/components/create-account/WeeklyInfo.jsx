import React from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';

const WeeklyInfo = props => {
  const { nextPage, prevPage } = props;

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
    ApexCharts.exec('availability', 'updateSeries', updatedSeries);
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
      <h1>Weekly Availability</h1>
      <div className="row">
        <div className="mixed-chart"> {renderChart()} </div>
      </div>
      <Form.Item wrapperCol={{ offset: 19 }}>
        <Button type="primary" htmlType="button" onClick={prevPage}>
          Previous
        </Button>
        <Button type="primary" onClick={nextPage}>
          Next
        </Button>
      </Form.Item>
    </div>
  );
};

WeeklyInfo.propTypes = {
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

export default WeeklyInfo;
