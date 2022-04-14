import { PageHeader, Row, Col } from 'antd';
import './DashboardHeader.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../assets/img/afc-logo.png';

const DashboardHeader = () => {
  const [userId, setUserId] = useState(-1);
  const [user, setUser] = useState([]);
  const [numEvents, setNumEvents] = useState(0);
  const [numVolunteers, setNumVolunteers] = useState(0);

  useEffect(async () => {
    setUserId(10);
    const userData = await axios.get(`http://localhost:3001/users/${userId}`);
    const numEventsData = await axios.get('http://localhost:3001/events/total');
    const numVolunteersData = await axios.get('http://localhost:3001/events/total');
    await setNumEvents(numEventsData.data.count);
    await setUser(userData.data);
    await setNumVolunteers(numVolunteersData.data.count);
  });

  return (
    <PageHeader
      key={user.firstName}
      className="admin-dashboard-header"
      title={`Good morning, ${user.firstName} ${user.lastName}, welcome back!`}
      avatar={{ src: logo }}
      extra={
        <Row gutter={[16, 16]}>
          <Col className="statistics-col">
            <p>Total Events</p>
            <h3>{numEvents}</h3>
          </Col>
          <Col className="statistics-col">
            <p>Total Volunteers</p>
            <h3>{numVolunteers}</h3>
          </Col>
        </Row>
      }
    />
  );
};

export default DashboardHeader;
