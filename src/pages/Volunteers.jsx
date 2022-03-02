import React from 'react';
import VolunteeringHistory from '../components/VolunteeringHistory';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import RolesAndSkills from '../components/RolesAndSkills';
import DuiAndCrimHis from '../components/DuiAndCrimHis';

import 'antd/dist/antd.variable.min.css';

function Volunteers() {
  return (
    <div>
      <p>This is the volunteers page</p>
      <VolunteeringHistory />
      <WeeklyInfo />
      <GeneralInfo />
      <RolesAndSkills />
      <DuiAndCrimHis />
    </div>
  );
}

export default Volunteers;
