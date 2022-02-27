import React from 'react';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import RolesAndSkills from '../components/RolesAndSkills';
import DuiAndCrimHis from '../components/DuiAndCrimHis';
import ProfileGeneralInfo from '../components/ProfileGeneralInfo';
import ProfileDUICrimHistory from '../components/ProfileDUICrimHistory';
import ProfileRolesSkills from '../components/ProfileRolesSkills';

import 'antd/dist/antd.variable.min.css';

function Volunteers() {
  return (
    <div>
      <p>This is the volunteers page</p>
      <ProfileDUICrimHistory />
      <ProfileRolesSkills />
      <ProfileGeneralInfo />
      <WeeklyInfo />
      <GeneralInfo />
      <RolesAndSkills />
      <DuiAndCrimHis />
    </div>
  );
}

export default Volunteers;
