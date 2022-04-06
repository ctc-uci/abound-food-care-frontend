import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import ProfileGeneralInfo from '../components/profile/ProfileGeneralInfo';
import ProfileDUICrimHistory from '../components/profile/ProfileDUICrimHistory';
import ProfileRolesSkills from '../components/profile/ProfileRolesSkills';
import VolunteerAvailability from '../components/profile/VolunteerAvailability';
import '../components/profile/profile.css';

const { TabPane } = Tabs;
function Profile() {
  return (
    <div>
      <p>This is the volunteer profile page - USER ID OF VOLUNTEER HARDCODED TEMPORARILY</p>
      <h1>[VOLUNTEER NAME HERE]s Profile</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="General Information" key="1">
          <ProfileGeneralInfo userId={2} />
        </TabPane>
        <TabPane tab="Availability" key="2">
          <VolunteerAvailability />
        </TabPane>
        <TabPane tab="Roles & Skills" key="3">
          <ProfileRolesSkills userId={6} />
        </TabPane>
        <TabPane tab="DUI/Criminal History" key="4">
          <ProfileDUICrimHistory userId={2} />
        </TabPane>
        <TabPane tab="Training & Forms" key="5">
          <p>Training and Forms go here</p>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
