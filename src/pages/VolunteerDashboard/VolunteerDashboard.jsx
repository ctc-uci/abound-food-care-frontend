import { instanceOf } from 'prop-types';
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/admin-dashboard-components/DashboardHeader/DashboardHeader';
import EventGrid from '../../components/admin-dashboard-components/EventGrid/EventGrid';
import EventList from '../../components/events/EventList/EventList';
import useViewPort from '../../common/useViewPort';
import { AFCBackend } from '../../util/utils';
import { Cookies, withCookies, cookieKeys } from '../../util/cookie_utils';
import styles from './VolunteerDashboard.module.css';

const VolunteerDashboard = ({ cookies }) => {
  const { width } = useViewPort();
  const breakpoint = 720;

  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [userId, setUserId] = useState(cookies.get(cookieKeys.USER_ID));

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

  const renderDashboard = () => {
    // render desktop version
    if (width > breakpoint) {
      return (
        <>
          <EventGrid title="Upcoming Events" eventStatus="upcoming" />
          <div className={styles.spacer} />
          <EventGrid title="Past Events" eventStatus="past" />
        </>
      );
    }
    // render mobile version
    return (
      <>
        <EventList title="Upcoming Events" events={upcomingEvents} showViewAll />
        <div className={styles.spacer} />
        <EventList title="Past Events" events={pastEvents} showViewAll />
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader userId={userId} isAdmin={false} />
      {renderDashboard()}
    </div>
  );
};

VolunteerDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerDashboard);
