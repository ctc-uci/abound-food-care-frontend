import '../styles/AdminDashboard.css';
import { Row, Col } from 'antd';
import React from 'react';
import UpcomingEvents from '../components/admin-dashboard-components/UpcomingEvents';
import AdminNotifications from '../components/admin-dashboard-components/AdminNotifications';
import DashboardHeader from '../components/admin-dashboard-components/DashboardHeader';
import PastEvents from '../components/admin-dashboard-components/PastEvents';
import useViewPort from '../common/useViewPort';

const AdminDashboard = () => {
  const { width } = useViewPort();
  const breakpoint = 720;

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      {width > breakpoint ? (
        <>
          <Row className="dashboard-row" gutter={[32, 16]}>
            <Col className="dashboard-col" span={18}>
              <UpcomingEvents />
              <AdminNotifications />
            </Col>
            <Col className="dashboard-col" span={6}>
              <PastEvents />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="dashboard-row">
            <UpcomingEvents />
          </Row>
          {/* <Row className="dashboard-row" gutter={[32, 16]}> */}
          <PastEvents />
          {/* </Row> */}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
