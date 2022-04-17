import { PageHeader, Row, Col } from 'antd';
import './DashboardHeader.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../assets/img/afc-logo.png';
import useViewPort from '../../common/useViewPort';

const DashboardHeader = () => {
  const [userId, setUserId] = useState(-1);
  const [user, setUser] = useState([]);
  const [numEvents, setNumEvents] = useState(0);
  const [numVolunteers, setNumVolunteers] = useState(0);

  const { width } = useViewPort();
  const breakpoint = 720;

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
    <div>
      {width > breakpoint ? (
        <>
          <PageHeader
            key={user.firstName}
            className="admin-dashboard-header-desktop"
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
        </>
      ) : (
        <>
          {/* TODO: Boxes are not same width right now fix later  */}
          <h1>{`Good morning, ${user.firstName} ${user.lastName}`}</h1>
          <div className="total-events-volunteers-container">
            <div className="total-container">
              <h2> Total Events </h2>
              <h3> {numEvents} </h3>
            </div>
            <div className="total-container">
              <h2>Total Volunteers</h2>
              <h3> {numVolunteers} </h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHeader;
