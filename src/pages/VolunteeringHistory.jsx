import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { AFCBackend } from '../util/utils';
import { getCurrentUser, auth } from '../util/auth_utils';

import VolunteerLog from '../components/volunteer-log/VolunteerLog';

const numPeople = 2;

const VolunteeringHistory = () => {
  const [numHours, setNumHours] = useState(0);
  const [numEvents, setNumEvents] = useState(0);
  const [refreshHours, setRefreshHours] = useState(false);

  const getNumHours = async uid => {
    const { data: res } = await AFCBackend.get(`/volunteers/${uid}/total-hours`);
    return res;
  };
  const getNumEvents = async uid => {
    const { data: res } = await AFCBackend.get(`/volunteers/${uid}/total-events`);
    return res;
  };

  useEffect(async () => {
    const { uid } = await getCurrentUser(auth);
    if (uid) {
      const { sum: hours } = await getNumHours(uid);
      const { count: events } = await getNumEvents(uid);
      console.log(hours, events);
      if (hours) setNumHours(hours);
      if (events) setNumEvents(events);
    }
  }, []);

  return (
    <>
      <h1> My Volunteer Hours </h1>
      <Row>
        <Col>
          {/* <img src={volunteerImgOne} alt="Volunteer Hours" /> */}
          <p> {numHours} Volunteer Hours </p>
        </Col>
        <Col>
          {/* <img src={volunteerImgTwo} alt="Volunteer Events" /> */}
          <p> {numEvents} Events </p>
        </Col>
        <Col>
          {/* <img src={volunteerImgThree} alt="People Impacted" /> */}
          <p> {numPeople} People Impacted </p>
        </Col>
      </Row>
      <h1> Unsubmitted Hours </h1>
      <VolunteerLog
        submitted={false}
        refreshHours={refreshHours}
        setRefreshHours={setRefreshHours}
      />
      <h1> Submitted Hours </h1>
      <VolunteerLog submitted refreshHours={refreshHours} setRefreshHours={setRefreshHours} />
    </>
  );
};

export default VolunteeringHistory;
