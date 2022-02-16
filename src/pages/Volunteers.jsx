import React from 'react';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import VolunteerHistory from '../components/VolunteeringHistory';
import 'antd/dist/antd.variable.min.css';

function Volunteers() {
  return (
    <div>
      <p>This is the volunteers page</p>
      <WeeklyInfo />
      <GeneralInfo />
      <VolunteerHistory />
    </div>
  );
}

export default Volunteers;
