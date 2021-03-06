import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import AdminNotifications from '../components/admin-dashboard-components/AdminNotifications/AdminNotifications';
import DashboardHeader from '../components/admin-dashboard-components/DashboardHeader/DashboardHeader';
import EventGrid from '../components/admin-dashboard-components/EventGrid/EventGrid';
import EventList from '../components/events/EventList/EventList';
import useViewPort from '../common/useViewPort';
import { AFCBackend } from '../util/utils';

const AdminDashboard = () => {
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

  return (
    <div style={{ padding: '16px' }}>
      <DashboardHeader isAdmin userId={2} />
      {width > breakpoint ? (
        <>
          <Row className="dashboard-row" gutter={[32, 16]}>
            <Col className="dashboard-col" span={18}>
              <EventGrid title="Upcoming Events" eventStatus="upcoming" />
              <AdminNotifications />
            </Col>
            <Col className="dashboard-col" span={6}>
              <EventGrid title="Past Events" eventStatus="past" />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div>
            <EventList title="Upcoming Events" events={upcomingEvents} showViewAll />
            <EventList title="Past Events" events={pastEvents} showViewAll />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
