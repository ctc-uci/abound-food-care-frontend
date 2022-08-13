import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Tabs } from 'antd';
import { instanceOf } from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Cookies, cookieKeys, withCookies } from '../util/cookie_utils';
import { AFCBackend, phoneRegExp, zipRegExp } from '../util/utils';
import VolunteerGeneralInfo from '../components/event-sign-up/VolunteerGeneralInfo';
import RolesAndSkills from '../components/event-sign-up/RolesAndSkills';
import UploadForms from '../components/event-sign-up/UploadForms';
import Availability from '../components/event-sign-up/Availability';

/**
 * TODOS
 * - handle any updates to user info and update them in users table (signup form validation)
 * - fix waiver uploading (CORS error)
 * - fix availability
 */

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

const EventSignUp = ({ cookies }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(async () => {
    const { data } = await AFCBackend.get(`/volunteers/${cookies.get(cookieKeys.USER_ID)}`);
    if (data[0] && data[0].eventIds.includes(parseInt(eventId, 10))) {
      navigate(`/event/view/${eventId}`);
    }
  }, []);

  const [genInfo, setGenInfo] = useState({});
  const [availability, setAvailability] = useState({});
  const [rolesAndSkills, setRolesAndSkills] = useState({});
  const [forms, setForms] = useState({});

  const schema = yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    password: yup.string(),
    role: yup.string().required(),
    organization: yup.string().required(),
    birthdate: yup.date(),
    email: yup.string(),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is a required field'),
    preferredContactMethod: yup.string().required(),
    addressStreet: yup.string().required('Street address is a required field'),
    addressZip: yup
      .string()
      .matches(zipRegExp, 'Zipcode is not valid')
      .required('Zipcode is required')
      .test('len', 'Zipcode must contain only 5 digits', val => val.length === 5),
    addressCity: yup.string().required('City is a required field'),
    addressState: yup
      .string()
      .test('len', 'Must be a 2-letter state code', val => val.length === 2)
      .required('State is a required field'),
    weightLiftingAbility: yup.number().integer().required(),
    criminalHistory: yup.bool().required(),
    criminalHistoryDetails: yup.string().nullable(true),
    duiHistory: yup.bool().required(),
    duiHistoryDetails: yup.string().nullable(true),
    completedChowmatchTraining: yup.bool().required(),
    foodRunsInterest: yup.bool().required(),
    distributionInterest: yup.bool().required(),
    canDrive: yup.bool().required(),
    willingToDrive: yup.bool().required(),
    vehicleType: yup.string(),
    distance: yup.number().integer().nullable(true),
    firstAidTraining: yup.bool().required(),
    serveSafeKnowledge: yup.bool().required(),
    transportationExperience: yup.bool().required(),
    movingWarehouseExperience: yup.bool().required(),
    foodServiceIndustryKnowledge: yup.bool().required(),
    languages: yup.array().of(yup.string()),
    additionalInformation: yup.string().nullable(true),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    delayError: 750,
  });

  const onSubmit = async () => {
    console.log(genInfo, availability, rolesAndSkills, forms);

    // update user in users table
    // const result = await form.trigger();
    // console.log(result);

    // const values = form.getValues();
    // const payload = { ...values };
    // console.log(payload);
    // const res = await AFCBackend.put(`/users/${cookies.get(cookieKeys.USER_ID)}`, payload);
    // console.log(res);

    // sign up user for event
    await AFCBackend.post(`/volunteers/${cookies.get(cookieKeys.USER_ID)}/${eventId}`);

    // redirect back to event view page
    navigate(`/event/view/${eventId}`);
  };

  return (
    <Container>
      <SignUpHeader>
        <HeaderText>Sign Up</HeaderText>
        <ButtonRow>
          <Button style={{ marginRight: '3vw' }}>Cancel</Button>
          <Button type="primary" onClick={onSubmit}>
            Submit
          </Button>
        </ButtonRow>
      </SignUpHeader>
      <FormProvider {...form}>
        <Form>
          <Tabs>
            <TabPane tab="General Information" key="1">
              <Card>
                <VolunteerGeneralInfo
                  userId={cookies.get(cookieKeys.USER_ID)}
                  onSubmit={setGenInfo}
                />
              </Card>
            </TabPane>
            <TabPane tab="Availability" key="2">
              <Card>
                <Availability userId={cookies.get(cookieKeys.USER_ID)} onSubmit={setAvailability} />
              </Card>
            </TabPane>
            <TabPane tab="Roles & Skills" key="3">
              <Card>
                <RolesAndSkills
                  userId={cookies.get(cookieKeys.USER_ID)}
                  onSubmit={setRolesAndSkills}
                />
              </Card>
            </TabPane>
            <TabPane tab="Upload Forms" key="4">
              <Card>
                <UploadForms userId={cookies.get(cookieKeys.USER_ID)} onSubmit={setForms} />
              </Card>
            </TabPane>
          </Tabs>
        </Form>
      </FormProvider>
    </Container>
  );
};

EventSignUp.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(EventSignUp);
