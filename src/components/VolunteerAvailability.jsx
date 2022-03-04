import React from 'react';
import Chart from 'react-apexcharts';
// import ApexCharts from 'apexcharts';

const VolunteerAvailability = () => {
  const [options, setOptions] = React.useState(null);
  const [series, setSeries] = React.useState(null);

  const DUMMY_DATA = [
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  const generateData = (count, data, index) => {
    const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let i = 0;
    const generatedSeries = [];
    while (i < count) {
      const x = dayOfWeek[i];
      const y = data[i][index];
      generatedSeries.push({
        x,
        y,
      });
      i += 1;
    }
    console.log(generatedSeries);
    return generatedSeries;
  };

  const generateSeries = (startHour, endHour) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour += 1) {
      const formattedHour = hour % 12 === 0 ? '12' : (hour % 12).toString();
      const period = hour > 12 ? 'pm' : 'am';
      times.push(formattedHour.concat(':00').concat(period));
      if (hour !== endHour) {
        times.push(formattedHour.concat(':30').concat(period));
      }
    }

    const generatedSeries = times.reverse().map((time, i) => {
      console.log(time, i);
      return {
        name: time,
        data: generateData(7, DUMMY_DATA, i),
      };
    });
    setSeries(generatedSeries);
  };

  React.useEffect(() => {
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
