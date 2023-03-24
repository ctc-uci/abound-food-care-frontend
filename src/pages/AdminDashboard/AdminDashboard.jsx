import React, { useEffect, useState } from 'react';
import { instanceOf } from 'prop-types';
import DashboardHeader from '../../components/admin-dashboard-components/DashboardHeader/DashboardHeader';
import EventGrid from '../../components/admin-dashboard-components/EventGrid/EventGrid';
import EventList from '../../components/events/EventList/EventList';
import useViewPort from '../../common/useViewPort';
import { AFCBackend } from '../../util/utils';
import { cookieKeys, Cookies, withCookies } from '../../util/cookie_utils';
import styles from './AdminDashboard.module.css';

const AdminDashboard = ({ cookies }) => {
  const { width } = useViewPort();
  const breakpoint = 720;

  const [userId, setUserId] = useState(cookies.get(cookieKeys.USER_ID));
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(async () => {
    const uEvents = await AFCBackend.get('/events/upcoming');
    setUpcomingEvents(uEvents.data);
    const pEvents = await AFCBackend.get('/events/past');
    setPastEvents(pEvents.data);
  }, []);

  useEffect(() => {
    if (userId) {
      return;
    }
    setUserId(cookies.get(cookieKeys.USER_ID));
  }, [userId]);

  return (
    <div style={{ padding: '16px' }}>
      <DashboardHeader isAdmin userId={userId} />
      {width > breakpoint ? (
        <>
          <EventGrid title="Upcoming Events" eventStatus="upcoming" />
          <div className={styles.spacer} />
          <EventGrid title="Past Events" eventStatus="past" />
        </>
      ) : (
        <div>
          <EventList title="Upcoming Events" events={upcomingEvents} showViewAll />
          <div className={styles.spacer} />
          <EventList title="Past Events" events={pastEvents} showViewAll />
        </div>
      )}
    </div>
  );
};

AdminDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(AdminDashboard);
