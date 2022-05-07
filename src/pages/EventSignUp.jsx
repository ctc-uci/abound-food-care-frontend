import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Tabs } from 'antd';
import axios from 'axios';
import uploadBoxPhoto from '../components/events/utils';
import VolunteerGeneralInfo from '../components/event-sign-up/VolunteerGeneralInfo';
import RolesAndSkills from '../components/event-sign-up/RolesAndSkills';
import UploadForms from '../components/event-sign-up/UploadForms';
import Availability from '../components/event-sign-up/Availability';
import eventConfirmationPopUp from '../components/event-sign-up/modals';

const { TabPane } = Tabs;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 5%;
`;

const SignUpHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  width: 100%;
`;

const HeaderText = styled.p`
  font-size: 2em;
  font-weight: 900;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  margin-right: 2%;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  margin: 1%;
  height: 70vh;
`;

const EventSignUp = () => {
  const userId = 17;
  const eventId = 109;
  const [userData, setUserData] = useState({});
  const [eventData, setEventData] = useState({});
  const [waiverList, setWaiverList] = useState([]);

  const getData = async () => {
    try {
      const userDataResponse = await axios.get(`http://localhost:3001/users/${userId}`);
      setUserData({
        ...userDataResponse.data,
        birthdate: new Date(userDataResponse.data.birthdate),
      });
      const eventDataResponse = await axios.get(`http://localhost:3001/events/${eventId}`);
      setEventData({ ...eventDataResponse.data });
    } catch (e) {
      console.log(e.message);
    }
  };

  const signUp = async (resolve, reject) => {
    try {
      if (waiverList.length !== eventData.waivers.length) {
        reject('WaiverError');
      }
      let waivers = await Promise.all(
        waiverList.map(async file => uploadBoxPhoto(file.originFileObj)),
      );
      waivers = waiverList.map((file, index) => ({
        name: file.name,
        link: waivers[index],
      }));
      await axios.post(`http://localhost:3001/volunteers/${userId}/${eventId}`, { waivers });
      resolve();
    } catch (err) {
      console.log(err.message);
      reject();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (Object.keys(userData).length === 0 || Object.keys(eventData).length === 0) {
    return <h1>Loading</h1>;
  }

  return (
    <Container>
      <SignUpHeader>
        <HeaderText>Sign Up</HeaderText>
        <ButtonRow>
          <Button style={{ marginRight: '3vw' }}>Cancel</Button>
          <Button type="primary" onClick={() => eventConfirmationPopUp(signUp, eventData)}>
            Submit
          </Button>
        </ButtonRow>
      </SignUpHeader>
      <Tabs>
        <TabPane tab="General Information" key="1">
          <Card>
            <VolunteerGeneralInfo userData={userData} />
          </Card>
        </TabPane>
        <TabPane tab="Availability" key="2">
          <Card>
            <Availability
              availabilities={userData.availabilities}
              eventStartDate={eventData.startDatetime}
            />
          </Card>
        </TabPane>
        <TabPane tab="Roles & Skills" key="3">
          <Card>
            <RolesAndSkills userData={userData} />
          </Card>
        </TabPane>
        <TabPane tab="Upload Forms" key="4">
          <Card>
            <UploadForms userData={userData} eventData={eventData} setWaiverList={setWaiverList} />
          </Card>
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default EventSignUp;
