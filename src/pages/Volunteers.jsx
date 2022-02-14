import React from 'react';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import 'antd/dist/antd.variable.min.css';
import EditHours from '../components/EditHours';

function Volunteers() {
  return (
    <div>
      <p>This is the volunteers page</p>
      <WeeklyInfo />
      <GeneralInfo />
      <EditHours />
    </div>
  );
}

export default Volunteers;
