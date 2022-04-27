import '../styles/AdminDashboard.css';
import { Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpcomingEvents from '../components/admin-dashboard-components/UpcomingEvents';
import DashboardHeader from '../components/admin-dashboard-components/DashboardHeader';
import PastEvents from '../components/admin-dashboard-components/PastEvents';
import EventList from '../components/events/EventList';
import useViewPort from '../common/useViewPort';

const VolunteerDashboard = () => {
  const { width } = useViewPort();
  const breakpoint = 720;

  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(async () => {
    const uEvents = await axios.get('http://localhost:3001/events/upcoming');
    await setUpcomingEvents(uEvents.data);
    const pEvents = await axios.get('http://localhost:3001/events/past');
    await setPastEvents(pEvents.data);
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
