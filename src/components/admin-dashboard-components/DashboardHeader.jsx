import { PageHeader, Row, Col } from 'antd';
import './DashboardHeader.css';
import React from 'react';
import logo from '../../assets/img/afc-logo.png';

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
      avatar={{ src: logo }}
      extra={
        <Row gutter={[16, 16]}>
          <Col className="statistics-col">
            <p>Total Events</p>
            <h3>{dummyData.totalEvents}</h3>
          </Col>
          <Col className="statistics-col">
            <p>Total Volunteers</p>
            <h3>{dummyData.totalVolunteers}</h3>
          </Col>
        </Row>
      }
    />
  );
};

export default DashboardHeader;
