import '../styles/AdminDashboard.css';
import { Row, Col } from 'antd';
import React from 'react';
import UpcomingEvents from './admin-dashboard-components/UpcomingEvents';
import AdminNotifications from './admin-dashboard-components/AdminNotifications';
import DashboardHeader from './admin-dashboard-components/DashboardHeader';
import PastEvents from './admin-dashboard-components/PastEvents';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <Row className="dashboard-row" gutter={[32, 16]}>
        <Col className="dashboard-col" span={18}>
          <UpcomingEvents />
          <AdminNotifications />
        </Col>
        <Col className="dashboard-col" span={6}>
          <PastEvents />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
