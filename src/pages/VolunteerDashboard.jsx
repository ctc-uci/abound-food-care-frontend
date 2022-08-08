import { instanceOf } from 'prop-types';
import { Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/admin-dashboard-components/DashboardHeader/DashboardHeader';
import EventGrid from '../components/admin-dashboard-components/EventGrid/EventGrid';
import EventList from '../components/events/EventList/EventList';
import useViewPort from '../common/useViewPort';
import { AFCBackend } from '../util/utils';
import { Cookies, withCookies, cookieKeys } from '../util/cookie_utils';

const VolunteerDashboard = ({ cookies }) => {
  const { width } = useViewPort();
  const breakpoint = 720;

  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(async () => {
    const uEvents = await AFCBackend.get('/events/upcoming');
    setUpcomingEvents(uEvents.data);
    const pEvents = await AFCBackend.get('/events/past');
    setPastEvents(pEvents.data);
  }, []);

  const renderDashboard = () => {
    // render desktop version
    if (width > breakpoint) {
      return (
        <>
          <Row className="dashboard-row" gutter={[32, 16]}>
            <Col className="dashboard-col" span={18}>
              <EventGrid title="Upcoming Events" eventStatus="upcoming" />
              {/* <AdminNotifications /> */}
            </Col>
            <Col className="dashboard-col" span={6}>
              <EventGrid title="Past Events" eventStatus="past" />
            </Col>
          </Row>
        </>
      );
    }
    // render mobile version
    return (
      <div>
        <EventList title="Upcoming Events" events={upcomingEvents} showViewAll />
        <EventList title="Past Events" events={pastEvents} showViewAll />
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader userId={cookies.get(cookieKeys.USER_ID)} isAdmin={false} />
      {renderDashboard()}
    </div>
  );
};

VolunteerDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerDashboard);
