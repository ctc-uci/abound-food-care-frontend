import { PageHeader, Row, Col } from 'antd';
import './DashboardHeader.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../assets/img/afc-logo.png';

const DashboardHeader = () => {
  const [userId, setUserId] = useState(-1);
  const [user, setUser] = useState([]);
  const [firstStatistic, setFirstStatistic] = useState(0);
  const [secondStatistic, setSecondStatistic] = useState(0);
  const isAdmin = false;

  useEffect(async () => {
    setUserId(2);
    const userData = await axios.get(`http://localhost:3001/users/${userId}`);
    const firstStatisticData = await axios.get(
      isAdmin
        ? 'http://localhost:3001/events/total'
        : `http://localhost:3001/volunteers/${userId}/total-events`,
    );
    const secondStatisticData = await axios.get(
      isAdmin
        ? 'http://localhost:3001/volunteers/total'
        : `http://localhost:3001/hours/user/${userId}/total`,
    );
    console.log(secondStatisticData);
    await setFirstStatistic(firstStatisticData.data.count);
    await setUser(userData.data);
    await setSecondStatistic(secondStatisticData.data.count);
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
            <h3>{firstStatistic}</h3>
          </Col>
          <Col className="statistics-col">
            <p>Total Volunteers</p>
            <h3>{secondStatistic}</h3>
          </Col>
        </Row>
      }
    />
  );
};

export default DashboardHeader;
