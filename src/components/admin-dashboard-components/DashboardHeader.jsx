import { PageHeader, Row, Col } from 'antd';
import './DashboardHeader.css';
import React from 'react';

const dummyData = {
  name: 'Serati Ma',
  totalEvents: 24,
  totalVolunteers: 230,
};

const DashboardHeader = () => {
  return (
    <PageHeader
      key={dummyData.name}
      className="admin-dashboard-header"
      title={`Good morning, ${dummyData.name}, welcome back!`}
      extra={
        <Row gutter={[16, 16]}>
          <Col className="statistics-col">
            <h3>Total Events</h3>
            <p>{dummyData.totalEvents}</p>
          </Col>
          <Col className="statistics-col">
            <h3>Total Volunteers</h3>
            <p>{dummyData.totalVolunteers}</p>
          </Col>
        </Row>
      }
    />
  );
};

export default DashboardHeader;
