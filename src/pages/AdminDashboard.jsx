import '../styles/AdminDashboard.css';
import { Row, Col } from 'antd';
import React from 'react';
import AdminNotifications from '../components/admin-dashboard-components/AdminNotifications';
import DashboardHeader from '../components/admin-dashboard-components/DashboardHeader';
import EventGrid from '../components/admin-dashboard-components/EventGrid';

const AdminDashboard = () => {
  // HARDCODED USERID FOR NOW
  return (
    <div className="dashboard-container">
      <DashboardHeader isAdmin userId={2} />
      <Row className="dashboard-row" gutter={[32, 16]}>
        <Col className="dashboard-col" span={18}>
          <EventGrid title="Upcoming Events" eventStatus="upcoming" />
          <AdminNotifications />
        </Col>
        <Col className="dashboard-col" span={6}>
          <EventGrid title="Past Events" eventStatus="past" />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
