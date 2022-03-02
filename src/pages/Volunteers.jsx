import React from 'react';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import RolesAndSkills from '../components/RolesAndSkills';
import DuiAndCrimHis from '../components/DuiAndCrimHis';
import TrainingAndForms from '../components/TrainingAndForms';

import 'antd/dist/antd.variable.min.css';

function Volunteers() {
  return (
    <div>
      <p>This is the volunteers page</p>
      <WeeklyInfo />
      <GeneralInfo />
      <RolesAndSkills />
      <DuiAndCrimHis />
      <TrainingAndForms />
    </div>
  );
}

export default Volunteers;
