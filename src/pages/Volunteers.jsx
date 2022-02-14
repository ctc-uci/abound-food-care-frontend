import React from 'react';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import 'antd/dist/antd.variable.min.css';
import VolunteeringHistory from '../components/VolunteeringHistory';

function Volunteers() {
  return (
    <div>
      <p>This is the volunteers page</p>
      <WeeklyInfo />
      <GeneralInfo />
      <VolunteeringHistory />
    </div>
  );
}

export default Volunteers;
