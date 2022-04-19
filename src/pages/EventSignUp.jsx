import React from 'react';
import styled from 'styled-components';
import { Button, Tabs } from 'antd';
import VolunteerGeneralInfo from '../components/event-sign-up/VolunteerGeneralInfo';

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
  height: 65vh;
`;

const EventSignUp = () => {
  return (
    <Container>
      <SignUpHeader>
        <HeaderText>Sign Up</HeaderText>
        <ButtonRow>
          <Button style={{ marginRight: '3vw' }}>Cancel</Button>
          <Button type="primary">Submit</Button>
        </ButtonRow>
      </SignUpHeader>
      <Tabs>
        <TabPane tab="General Information" key="1">
          <Card>
            <VolunteerGeneralInfo />
          </Card>
        </TabPane>
        <TabPane tab="Availability" key="2">
          <Card />
        </TabPane>
        <TabPane tab="Roles & Skills" key="3">
          <Card />
        </TabPane>
        <TabPane tab="Upload Forms" key="4">
          <Card />
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default EventSignUp;
