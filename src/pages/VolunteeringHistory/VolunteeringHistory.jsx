import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { ClockCircleOutlined, ScheduleOutlined } from '@ant-design/icons';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { cookieKeys } from '../../util/cookie_utils';
import { AFCBackend } from '../../util/utils';
import { getCurrentUser, auth, useNavigate, AUTH_ROLES } from '../../util/auth_utils';

import VolunteerLog from '../../components/VolunteerLog/VolunteerLog';
import styles from './VolunteeringHistory.module.css';

const VolunteeringHistory = ({ cookies }) => {
  const [numHours, setNumHours] = useState(0);
  const [numEvents, setNumEvents] = useState(0);
  const [refreshHours, setRefreshHours] = useState(false);
  const navigate = useNavigate();

  const getHoursAndEvents = async uid => {
    const { data } = await AFCBackend.get(`/volunteers/logs/${uid}`);
    setNumEvents(data.filter(e => e.submitted && e.approved).length);
    if (data.length > 0) {
      setNumHours(
        data.filter(e => e.submitted && e.approved).reduce((prev, cur) => prev + cur.numHours, 0),
      );
    }
  };

  useEffect(async () => {
    const { uid } = await getCurrentUser(auth);
    if (uid) {
      await getHoursAndEvents(uid);
    }
    if (cookies.get(cookieKeys.ROLE) === AUTH_ROLES.ADMIN_ROLE) {
      navigate('/hours');
    } else if (cookies.get(cookieKeys.ROLE) !== AUTH_ROLES.VOLUNTEER_ROLE) {
      navigate('/');
    }
  }, [refreshHours]);

  return (
    <div className={styles.vhContainer}>
      <Card className={styles.vhCard}>
        <h1 className={styles.vhHeading}> My Volunteer Hours </h1>
        <Row>
          <Col className={styles.vhStatCol}>
            <Row>
              <div className={styles.center}>
                <ClockCircleOutlined className={styles.vhStatIcon} />
              </div>
            </Row>
            <Row>
              <div className={styles.center}>
                <p className={styles.vhStatLine}>
                  {numHours.toLocaleString('en-US')} Volunteer Hour{numHours !== 1 && 's'}{' '}
                </p>
              </div>
            </Row>
          </Col>
          <Col className={styles.vhStatCol}>
            <Row>
              <ScheduleOutlined className={styles.vhStatIcon} />
            </Row>
            <Row>
              <div className={styles.center}>
                <p className={styles.vhStatLine}>
                  {numEvents.toLocaleString('en-US')} Event{numEvents !== 1 && 's'}
                </p>
              </div>
            </Row>
          </Col>
        </Row>
        <h1 className={styles.vhHeading}> Unsubmitted Hours </h1>
        <VolunteerLog
          submitted={false}
          refreshHours={refreshHours}
          setRefreshHours={setRefreshHours}
        />
        <h1 className={styles.vhHeading}> Submitted Hours </h1>
        <VolunteerLog submitted refreshHours={refreshHours} setRefreshHours={setRefreshHours} />
      </Card>
    </div>
  );
};

VolunteeringHistory.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteeringHistory);
