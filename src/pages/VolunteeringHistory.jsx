import { React } from 'react'; // cant commit without forcing past eslint or not importing usestate since its unfinished
// import React, { useState } from 'react';
import { Row, Col } from 'antd';
// import { AFCBackend } from '../util/utils';

import VolunteerLog from '../components/volunteer-log/VolunteerLog';
import volunteerImgOne from '../assets/img/volunteer-log-img-1.png';
import volunteerImgTwo from '../assets/img/volunteer-log-img-2.png';
import volunteerImgThree from '../assets/img/volunteer-log-img-3.png';

import './Volunteers.css';

const numPeople = 2;

const VolunteeringHistory = () => {
  // const [userId, setUserId] = useState(2);
  // const getNumHours = async () => {
  //   const { data: res } = await AFCBackend.get(`/volunteers/${userId}/total-hours`);
  //   // console.log(data)
  //   console.log(res);
  //   return data;
  // };
  // const getNumEvents = async () => {
  //   const { data: res } = await AFCBackend.get(`/volunteers/${userId}/total-events`);
  //   // console.log(data)
  //   console.log(res);
  //   return data;
  // };

  return (
    <>
      <h1> My Volunteer Hours </h1>
      <Row>
        <Col>
          <img src={volunteerImgOne} alt="Volunteer Hours" />
          <p> {2} Volunteer Hours </p>
        </Col>
        <Col>
          <img src={volunteerImgTwo} alt="Volunteer Events" />
          <p> {2} Events </p>
        </Col>
        <Col>
          <img src={volunteerImgThree} alt="People Impacted" />
          <p> {numPeople} People Impacted </p>
        </Col>
      </Row>
      <h1> Unsubmitted Hours </h1>
      <VolunteerLog submitted="submitted" />
      <h1> Submitted Hours </h1>
      <VolunteerLog submitted="unsubmitted" />
    </>
  );
};

export default VolunteeringHistory;
