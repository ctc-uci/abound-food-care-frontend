import React, { useEffect, useState } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import { instanceOf } from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import ProfileGeneralInfo from '../../components/profile/ProfileGeneralInfo';
import ProfileDUICrimHistory from '../../components/profile/ProfileDUICrimHistory';
import ProfileRolesSkills from '../../components/profile/ProfileRolesSkills';
import ProfileAvailability from '../../components/profile/ProfileAvailability';
import WaiversGrid from '../../components/waivers/WaiversGrid';

import { Cookies, cookieKeys, withCookies } from '../../util/cookie_utils';
import AUTH_ROLES from '../../util/auth_config';
import { AFCBackend } from '../../util/auth_utils';

import styles from './Profile.module.css';

const { TabPane } = Tabs;
const Profile = ({ cookies }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  // TODO Replace waivers with actual set of waivers
  const [waivers, setWaivers] = useState([
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
  ]);

  useEffect(async () => {
    const currentUserId = cookies.get(cookieKeys.USER_ID);
    const role = cookies.get(cookieKeys.ROLE);
    if (!userId || (role === AUTH_ROLES.VOLUNTEER_ROLE && userId !== currentUserId)) {
      navigate(`/profile/${currentUserId}`);
    }
    const { data: volunteerData } = await AFCBackend.get(`/users/${userId}`);
    setUser(volunteerData);
  }, []);

  ConfigProvider.config({
    theme: {
      primaryColor: '#115740',
    },
  });

  return (
    <ConfigProvider>
      <div className={styles.profileContainer}>
        <h1 className={styles.profileHeader}>
          {' '}
          {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}&apos;s Profile{' '}
        </h1>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="General Information" key="1">
            <ProfileGeneralInfo userId={userId} volunteerData={user} />
          </TabPane>
          <TabPane tab="Availability" key="2">
            {/* TODO: make availability editable */}
            <ProfileAvailability availability={user?.availabilities} />
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
        </Tabs>
      </div>
    </ConfigProvider>
  );
};

Profile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Profile);
