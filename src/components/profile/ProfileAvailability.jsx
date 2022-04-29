import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

/* TODO: implement editing
- disable editing when not in edit mode
- once availability is selected and 'Save' is clicked, send updated availability to backend
*/

const ProfileAvailability = ({ userId }) => {
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [dataRetrieved, setDataRetrieved] = useState(false);

  const chartOptions = {
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
    noData: {
      text: 'Loading...',
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

  const getUserAvailability = async () => {
    try {
      const { data: res } = await axios.get(`http://localhost:3001/availability/${userId}`);
      const { availabilities } = res;
      setAvailabilityData(availabilities);
    } catch (e) {
      console.log(e.message);
    }
  };

  const convertData = times => {
    const data = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let day = 0; day < 7; day += 1) {
      const dataAvailability = availabilityData.filter(
        availability => availability.dayOfWeek === days[day],
      );
      const dayArray = [];
      if (dataAvailability.length > 0) {
        const d = dataAvailability[0];
        const startTime = d.startTime.slice(0, d.startTime.lastIndexOf(':'));
        const endTime = d.endTime.slice(0, d.endTime.lastIndexOf(':'));
        let available = false;
        for (let i = 0; i < times.length; i += 1) {
          if (times[i] === startTime) available = true;
          if (times[i] === endTime) available = false;

          if (available) dayArray.push(2);
          else dayArray.push(1);
        }
      } else {
        for (let i = 0; i < times.length; i += 1) {
          dayArray.push(1);
        }
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
      const y = data[i][16 - index];
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
      const formattedHour = hour < 10 ? `0${hour.toString()}` : hour.toString();
      times.push(formattedHour.concat(':00'));
      if (hour !== endHour) {
        times.push(formattedHour.concat(':30'));
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
    getUserAvailability();
    if (availabilityData.length > 0) {
      setDataRetrieved(true);
    }
  }, [availabilityData]);

  useEffect(() => {
    setOptions(chartOptions);
    if (dataRetrieved) {
      generateSeries(9, 17);
    }
  }, [dataRetrieved]);

  const renderChart = () => {
    if (options) {
      return <Chart options={options} series={series} type="heatmap" width="800" height="500" />;
    }
    return null;
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  return (
    <div className="app">
      <div style={{ float: 'right' }}>
        {isEditable && (
          <Button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        <Button className="edit-save-btn" htmlType="submit" onClick={handleEdit}>
          {isEditable ? 'Save' : 'Edit'}
        </Button>
      </div>
      {/* TODO: make thhis cart NOT editable */}
      <div className="row">
        <div className="mixed-chart"> {renderChart()} </div>
      </div>
      {isEditable && (
        <div className="row">
          <div className="mixed-chart"> {renderChart()} </div>
        </div>
      )}
    </div>
  );
};

ProfileAvailability.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileAvailability;
