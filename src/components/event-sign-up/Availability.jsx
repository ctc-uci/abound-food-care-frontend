import { React, useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Availability = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // TODO: fix availability generation
    const times = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'];
    const generatedSeries = times.reverse().map(time => {
      return {
        name: time,
        data: [1], // all available right now, add actual data later
      };
    });
    setSeries(generatedSeries);
    console.log(generatedSeries);
  }, []);

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

  return (
    <>
      {options && (
        <Chart options={options} series={series} type="heatmap" width="800" height="500" />
      )}
    </>
  );
};

export default Availability;
