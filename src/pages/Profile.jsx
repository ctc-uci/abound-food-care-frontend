import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { AFCBackend } from '../util/utils';
import ProfileGeneralInfo from '../components/profile/ProfileGeneralInfo';
import ProfileDUICrimHistory from '../components/profile/ProfileDUICrimHistory';
import ProfileRolesSkills from '../components/profile/ProfileRolesSkills';
import ProfileAvailability from '../components/profile/ProfileAvailability';
import WaiversGrid from '../components/waivers/WaiversGrid';
// import VolunteeringHistory from '../components/profile/VolunteeringHistory';
import '../components/profile/profile.css';

const { TabPane } = Tabs;
function Profile() {
  // TODO: automatically use the userID of current logged in user when not admin/param not specified
  const { userId } = useParams();
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

  const [user, setUser] = useState({});

  useEffect(async () => {
    const res = await AFCBackend.get(`/users/${userId}`);
    if (res.status === 200) {
      setUser(res.data);
    }
  }, [userId]);

  return (
    <div>
      <h1 className="profile-heading">
        {' '}
        {user.firstName} {user.lastName}&apos;s Profile
      </h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab="General Information" key="1">
          <ProfileGeneralInfo userId={userId} volunteerData={user} />
        </TabPane>
        <TabPane tab="Availability" key="2">
          <ProfileAvailability volunteerAvailability={user.availabilities} />
        </TabPane>
        <TabPane tab="Roles & Skills" key="3">
          <ProfileRolesSkills userId={userId} volunteerData={user} />
        </TabPane>
        <TabPane tab="DUI/Criminal History" key="4">
          <ProfileDUICrimHistory userId={userId} volunteerData={user} />
        </TabPane>
        <TabPane tab="Training & Forms" key="5">
          <WaiversGrid waivers={waivers} />
        </TabPane>
        {/* <TabPane tab="Volunteering History" key="6">
          <VolunteeringHistory userId={userId} />
        </TabPane> */}
      </Tabs>
    </div>
  );
}

export default Profile;
