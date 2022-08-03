import { PageHeader, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { AFCBackend } from '../../../util/utils';
import logo from '../../../assets/img/afc-logo.png';
import useViewPort from '../../../common/useViewPort';
import styles from './DashboardHeader.module.css';

const DashboardHeader = ({ userId, isAdmin }) => {
  const [user, setUser] = useState([]);
  const [firstStatistic, setFirstStatistic] = useState(0);
  const [secondStatistic, setSecondStatistic] = useState(0);

  const { width } = useViewPort();
  const breakpoint = 720;

  useEffect(async () => {
    const userData = await AFCBackend.get(`/users/${userId}`);
    setUser(userData.data);

    if (isAdmin) {
      // admin statistics
      const totalEvents = await AFCBackend.get('/events/total', {
        params: {
          status: '',
          type: 'all',
        },
      });
      const totalVolunteers = await AFCBackend.get('/volunteers/total');
      setFirstStatistic(totalEvents.data.count);
      setSecondStatistic(totalVolunteers.data.count);
    } else {
      // volunteer statistics
      const eventsVolunteered = await AFCBackend.get(`/volunteers/${userId}`);
      const totalHours = await AFCBackend.get(`/hours/user/${userId}/total`);
      setFirstStatistic(eventsVolunteered.data.eventIds[0]);
      setSecondStatistic(totalHours.data.count);
    }
  });

  const renderHeaderDesktop = () =>
    isAdmin ? (
      <Row gutter={[16, 16]}>
        <Col className={styles['statistics-col']}>
          <p>Total Events</p>
          <h3>{firstStatistic}</h3>
        </Col>
        <Col className={styles['statistics-col']}>
          <p>Total Volunteers</p>
          <h3>{secondStatistic}</h3>
        </Col>
      </Row>
    ) : (
      <Row gutter={[16, 16]}>
        <Col className={styles['statistics-col']}>
          <p>Events Volunteered</p>
          <h3>{firstStatistic}</h3>
        </Col>
        <Col className={styles['statistics-col']}>
          <p>Total Hours</p>
          <h3>{secondStatistic}</h3>
        </Col>
      </Row>
    );

  const renderHeaderMobile = () =>
    isAdmin ? (
      <div className={styles['total-events-volunteers-container']}>
        <div className={styles['total-container']}>
          <h2>Total Events</h2>
          <h3> {firstStatistic} </h3>
        </div>
        <div className={styles['total-container']}>
          <h2>Total Volunteers</h2>
          <h3> {secondStatistic} </h3>
        </div>
      </div>
    ) : (
      <div className={styles['total-events-volunteers-container']}>
        <div className={styles['total-container']}>
          <h2>Events Volunteered</h2>
          <h3> {firstStatistic} </h3>
        </div>
        <div className={styles['total-container']}>
          <h2>Total Hours</h2>
          <h3> {secondStatistic} </h3>
        </div>
      </div>
    );

  return (
    <div>
      {width > breakpoint ? (
        <>
          <PageHeader
            key={user.firstName}
            className={styles['admin-dashboard-header-desktop']}
            title={`Good morning, ${user.firstName} ${user.lastName}, welcome back!`}
            avatar={{ src: logo }}
            extra={renderHeaderDesktop()}
          />
        </>
      ) : (
        <>
          <h1>{`Good morning, ${user.firstName} ${user.lastName}`}</h1>
          {renderHeaderMobile()}
        </>
      )}
    </div>
  );
};

DashboardHeader.propTypes = {
  userId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default DashboardHeader;
