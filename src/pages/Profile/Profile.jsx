import React, { useEffect, useState } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import { instanceOf } from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import ProfileGeneralInfo from '../../components/profile/ProfileGeneralInfo';
import ProfileAdditionalInfo from '../../components/profile/ProfileAdditionalInfo';
import ProfileRolesSkills from '../../components/profile/ProfileRolesSkills';
import ProfileAvailability from '../../components/profile/ProfileAvailability';
import WaiversGrid from '../../components/waivers/WaiversGrid';

import { Cookies, cookieKeys, withCookies } from '../../util/cookie_utils';
import AUTH_ROLES from '../../util/auth_config';
import { AFCBackend } from '../../util/auth_utils';

import styles from './Profile.module.css';
import AFCPlaceholder from '../../assets/img/afc-logo.png';

const { TabPane } = Tabs;
const Profile = ({ cookies }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [currentUserId, setCurrentUserId] = useState(cookies.get(cookieKeys.USER_ID));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(cookies.get(cookieKeys.ROLE));
  const [waivers, setWaivers] = useState([]);

  useEffect(async () => {
    setCurrentUserId(cookies.get(cookieKeys.USER_ID));
    if (
      !userId ||
      userId === 'undefined' ||
      (role === AUTH_ROLES.VOLUNTEER_ROLE && userId !== currentUserId)
    ) {
      navigate(`/profile/${currentUserId}`);
    }
    const { data: volunteerData } = await AFCBackend.get(`/users/${userId}`);
    setUser(volunteerData);
    const { data: waiversData } = await AFCBackend.get(`/waivers/user/${userId}`);
    setWaivers(
      waiversData.length
        ? waiversData.map(waiver => {
            const uploadDate = new Date(waiver.uploadDate);
            return {
              eventName: waiver.eventInfo[0].name,
              waiverName: waiver.name,
              imgSrc: AFCPlaceholder,
              link: waiver.link,
              description: `Uploaded ${
                uploadDate.getMonth() + 1
              }/${uploadDate.getDate()}/${uploadDate.getFullYear()}`,
              waiverId: waiver.waiverId,
            };
          })
        : [],
    );
  }, [userId]);

  useEffect(() => {
    if (role) {
      return;
    }
    setRole(cookies.get(cookieKeys.ROLE));
  }, [role]);

  useEffect(() => {
    if (currentUserId) {
      return;
    }
    if (cookies.get(cookieKeys.USER_ID)) {
      setCurrentUserId(cookies.get(cookieKeys.USER_ID));
    } else {
      navigate('/profile');
    }
  }, [currentUserId]);

  return (
    <ConfigProvider>
      <div className={styles.profileContainer}>
        <h1 className={styles.profileHeader}>
          {' '}
          {user ? `${user?.firstName} ${user?.lastName}` : 'Unknown User'}&apos;s Profile{' '}
        </h1>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="General Information" key="1">
            {user && (
              <ProfileGeneralInfo userId={userId} volunteerData={user} setVolunteerData={setUser} />
            )}
          </TabPane>
          <TabPane tab="Availability" key="2">
            {user && <ProfileAvailability {...{ userId }} />}
          </TabPane>
          <TabPane tab="Roles & Skills" key="3">
            {user && (
              <ProfileRolesSkills userId={userId} volunteerData={user} setVolunteerData={setUser} />
            )}
          </TabPane>
          <TabPane tab="Additional Info" key="4">
            {user && (
              <ProfileAdditionalInfo
                userId={userId}
                volunteerData={user}
                setVolunteerData={setUser}
              />
            )}
          </TabPane>
          <TabPane tab="Training & Forms" key="5">
            {waivers.length ? (
              <WaiversGrid waivers={waivers} />
            ) : (
              <p className={styles.noWaivers}>
                There are no waivers available for {`${user?.firstName} ${user?.lastName}`}.
              </p>
            )}
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
