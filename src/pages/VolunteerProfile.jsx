import React from 'react';
import { Tabs } from 'antd';
import ProfileGeneralInfo from '../components/volunteer-profile/ProfileGeneralInfo';
import ProfileDUICrimHistory from '../components/volunteer-profile/ProfileDUICrimHistory';
import ProfileRolesSkills from '../components/volunteer-profile/ProfileRolesSkills';
import 'antd/dist/antd.variable.min.css';

const { TabPane } = Tabs;

function VolunteerProfile() {
  // function callback(key) {
  //   console.log(key);
  // }

  return (
    <div>
      <p>This is the volunteer profile page - USER ID OF VOLUNTEER HARDCODED TEMPORARILY</p>
      <h1>[VOLUNTEER NAME HERE]s Profile</h1>
      {/* <Tabs defaultActiveKey="1" onChange={callback}> */}
      <Tabs defaultActiveKey="1">
        <TabPane tab="General Information" key="1">
          <ProfileGeneralInfo userId={121} />
        </TabPane>
        <TabPane tab="Availability" key="2">
          Availability
        </TabPane>
        <TabPane tab="Roles & Skills" key="3">
          <ProfileRolesSkills userId={121} />
        </TabPane>
        <TabPane tab="DUI/Criminal History" key="4">
          <ProfileDUICrimHistory userId={121} />
        </TabPane>
        <TabPane tab="Training & Forms" key="5">
          <p>Training and Forms go here</p>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default VolunteerProfile;
