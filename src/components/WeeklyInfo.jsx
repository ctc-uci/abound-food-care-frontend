import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class WeeklyInfo extends Component {
  constructor(props) {
    super(props);

    function generateData(count, yrange) {
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
      const series = [];
      while (i < count) {
        const x = dayOfWeek[i];
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push({
          x,
          y,
        });
        i += 1;
      }
      return series;
    }

    // function onSquareClick(event, chartContext, config) {
    //   console.log(event);
    //   console.log(chartContext);
    //   console.log(config);
    // }

    function generateSeries(startHour, endHour) {
      const times = [];
      for (let hour = startHour; hour <= endHour; hour += 1) {
        const formattedHour = hour % 12 === 0 ? '12' : (hour % 12).toString();
        const period = hour > 12 ? 'PM' : 'AM';
        times.push(formattedHour.concat(':00').concat(period));
        if (hour !== endHour) {
          times.push(formattedHour.concat(':30').concat(period));
        }
      }
      return times.reverse().map(time => {
        return {
          name: time,
          data: generateData(7, {
            min: 1,
            max: 2,
          }),
        };
      });
    }

    this.state = {
      options: {
        chart: {
          height: 350,
          type: 'heatmap',
          // events: {
          //   dataPointSelection: onSquareClick,
          // },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#008FFB'],
      },
      series: generateSeries(9, 17),
    };
  }

  render() {
    const { options, series } = this.state;
    return (
      <div className="app">
        <h1>Weekly Availability</h1>
        <div className="row">
          <div className="mixed-chart">
            <Chart options={options} series={series} type="heatmap" width="500" height="500" />
          </div>
        </div>
      </div>
    );
  }
}

export default WeeklyInfo;
