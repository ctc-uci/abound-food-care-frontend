import React from 'react';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import Database from '../components/Database';

import 'antd/dist/antd.variable.min.css';

function Volunteers() {
  return (
    <div>
      <p>This is the volunteers page</p>
      <WeeklyInfo />
      <GeneralInfo />
      <Database />
    </div>
  );
}

export default Volunteers;
