import React from 'react';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import EditHours from '../components/EditHours';
import 'antd/dist/antd.css';

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
