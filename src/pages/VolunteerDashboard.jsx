import { Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import UpcomingEvents from '../components/admin-dashboard-components/UpcomingEvents/UpcomingEvents';
import DashboardHeader from '../components/admin-dashboard-components/DashboardHeader/DashboardHeader';
import PastEvents from '../components/admin-dashboard-components/PastEvents/PastEvents';
import EventList from '../components/events/EventList/EventList';
import useViewPort from '../common/useViewPort';
import { AFCBackend } from '../util/utils';

const VolunteerDashboard = () => {
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
        <Row className="dashboard-row" gutter={[32, 16]}>
          <Col className="dashboard-col" span={18}>
            <UpcomingEvents />
          </Col>
          <Col className="dashboard-col" span={6}>
            <PastEvents />
          </Col>
        </Row>
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
    // HARDCODED USERID FOR NOW
    <div className="dashboard-container">
      <DashboardHeader userId={10} isAdmin={false} />
      {renderDashboard()}
    </div>
  );
};

export default VolunteerDashboard;
