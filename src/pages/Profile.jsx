import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { instanceOf } from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileGeneralInfo from '../components/profile/ProfileGeneralInfo';
import ProfileDUICrimHistory from '../components/profile/ProfileDUICrimHistory';
import ProfileRolesSkills from '../components/profile/ProfileRolesSkills';
import ProfileAvailability from '../components/profile/ProfileAvailability';
import WaiversGrid from '../components/waivers/WaiversGrid';
import VolunteeringHistory from '../components/profile/VolunteeringHistory';
import '../components/profile/profile.css';
import { Cookies, cookieKeys, withCookies } from '../util/cookie_utils';
import AUTH_ROLES from '../util/auth_config';
import { AFCBackend } from '../util/auth_utils';

const { TabPane } = Tabs;
function Profile({ cookies }) {
  const [name, setName] = useState('');
  const { userId } = useParams();

  const navigate = useNavigate();

  useEffect(async () => {
    const { data: volunteerData } = await AFCBackend.get(`/users/${userId}`);
    setName(`${volunteerData.firstName} ${volunteerData.lastName}`);

    const currentUserId = cookies.get(cookieKeys.USER_ID);
    const role = cookies.get(cookieKeys.ROLE);
    if (role === AUTH_ROLES.VOLUNTEER_ROLE && userId !== currentUserId) {
      navigate(`/profile/${currentUserId}`);
    }
  }, []);
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
      <h1> {name} &apos;s Profile </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="General Information" key="1">
          <ProfileGeneralInfo userId={userId} />
        </TabPane>
        <TabPane tab="Availability" key="2">
          {/* TODO: make availability editable */}
          <ProfileAvailability userId={userId} />
        </TabPane>
        <TabPane tab="Roles & Skills" key="3">
          <ProfileRolesSkills userId={userId} />
        </TabPane>
        <TabPane tab="DUI/Criminal History" key="4">
          <ProfileDUICrimHistory userId={userId} />
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
Profile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Profile);
