import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import ProfileGeneralInfo from '../components/profile/ProfileGeneralInfo';
import ProfileDUICrimHistory from '../components/profile/ProfileDUICrimHistory';
import ProfileRolesSkills from '../components/profile/ProfileRolesSkills';
import ProfileAvailability from '../components/profile/ProfileAvailability';
import WaiversGrid from '../components/waivers/WaiversGrid';
import VolunteeringHistory from '../components/profile/VolunteeringHistory';
import '../components/profile/profile.css';

const { TabPane } = Tabs;
function Profile() {
  const waivers = [
    {
      name: 'Waiver Name',
      link: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      uploadDate: 'Uploaded 1/9/2022',
      waiverId: 1,
    },
    {
      name: 'Waiver Name',
      link: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      uploadDate: 'Uploaded 1/9/2022',
      waiverId: 2,
    },
    {
      name: 'Waiver Name',
      link: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      uploadDate: 'Uploaded 1/9/2022',
      waiverId: 3,
    },
  ];

  return (
    <div>
      <p>This is the volunteer profile page - USER ID OF VOLUNTEER HARDCODED TEMPORARILY</p>
      <h1>[VOLUNTEER NAME HERE]s Profile</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="General Information" key="1">
          <ProfileGeneralInfo userId={2} />
        </TabPane>
        <TabPane tab="Availability" key="2">
          <ProfileAvailability userId={13} />
        </TabPane>
        <TabPane tab="Roles & Skills" key="3">
          <ProfileRolesSkills userId={6} />
        </TabPane>
        <TabPane tab="DUI/Criminal History" key="4">
          <ProfileDUICrimHistory userId={2} />
        </TabPane>
        <TabPane tab="Training & Forms" key="5">
          <WaiversGrid waivers={waivers} />
        </TabPane>
        <TabPane tab="Volunteering History" key="6">
          <VolunteeringHistory />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
