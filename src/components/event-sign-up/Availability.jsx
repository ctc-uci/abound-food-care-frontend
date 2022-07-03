import React from 'react';
import Chart from 'react-apexcharts';

const Availability = () => {
  const [series, setSeries] = React.useState([]);

  const generateSeries = () => {
    const times = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];
    const generatedSeries = times.reverse().map(time => {
      return {
        name: time,
        data: [1], // all available right now, add actual data later
      };
    });
    setSeries(generatedSeries);
    console.log(generatedSeries);
    return generatedSeries;
  };

  React.useEffect(() => {
    generateSeries();
  });

  const options = {
    chart: {
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#115740'],
    title: {
      text: new Date().toDateString(),
    },
    toolbar: {
      show: false,
    },
  };

  const renderChart = () => {
    if (options) {
      return <Chart options={options} series={series} type="heatmap" width="800" height="500" />;
    }
    return null;
  };

  return (
    <div>
      <div> {renderChart()} </div>
    </div>
  );
};

export default Availability;
