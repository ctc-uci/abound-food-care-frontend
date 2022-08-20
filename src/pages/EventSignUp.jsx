import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Tabs } from 'antd';
import { instanceOf } from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import uploadWaiver from '../components/events/utils';
import { Cookies, cookieKeys, withCookies } from '../util/cookie_utils';
import { AFCBackend, phoneRegExp, zipRegExp } from '../util/utils';
import VolunteerGeneralInfo from '../components/event-sign-up/VolunteerGeneralInfo';
import RolesAndSkills from '../components/event-sign-up/RolesAndSkills';
import UploadForms from '../components/event-sign-up/UploadForms';
import Availability from '../components/event-sign-up/Availability';

/**
 * TODOS
 * - add modal in event view page post event to insert # hours worked
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
  const [defaultValues, setDefaultValues] = useState(undefined);
  const [availability, setAvailability] = useState(undefined);
  const [dayOfWeekIdx, setDayOfWeekIdx] = useState(undefined);

  const schema = yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    password: yup.string(),
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
    waivers: yup.array().required(),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    delayError: 750,
  });

  useEffect(async () => {
    const userId = cookies.get(cookieKeys.USER_ID);

    const { data: eventData } = await AFCBackend.get(`/events/${eventId}`);
    setDayOfWeekIdx(new Date(eventData[0].startDatetime).getDay());

    const { data: availabilityData } = await AFCBackend.get(`/availability/${userId}`);
    const formatAvailability = availabilityData.availabilities.map(a => {
      return {
        endTime: a.endTime.substring(0, a.endTime.length - 3),
        startTime: a.startTime.substring(0, a.startTime.length - 3),
        dayOfWeek: a.dayOfWeek,
      };
    });

    setAvailability(formatAvailability);

    const { data } = await AFCBackend.get(`/volunteers/${userId}`);
    const eventIdNum = parseInt(eventId, 10);
    const eventIds = data[0]?.eventIds;

    if (eventIds?.includes(eventIdNum)) {
      navigate(`/event/view/${eventId}`);
    }

    const { data: res } = await AFCBackend.get(`/users/${userId}`);

    // convert Date to MM/DD/YYYY
    const date = new Date(res.birthdate);
    const dateString = `${date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/${
      date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    }/${date.getFullYear()}`;
    res.birthdate = dateString;

    res.roles = [
      res.foodRunsInterest && 'foodRunsInterest',
      res.distributionInterest && 'distributionInterest',
    ].filter(e => !!e);
    res.skills = [
      res.firstAidTraining && 'firstAidTraining',
      res.serveSafeKnowledge && 'serveSafeKnowledge',
      res.transportationExperience && 'transportationExperience',
      res.movingWarehouseExperience && 'movingWarehouseExperience',
      res.foodServiceIndustryKnowledge && 'foodServiceIndustryKnowledge',
    ].filter(e => !!e);

    res.waivers = [];

    form.reset(res);

    setDefaultValues(res);
  }, []);

  const onSubmit = async () => {
    const userId = cookies.get(cookieKeys.USER_ID);

    const result = await form.trigger();
    if (!result) {
      return;
    }

    const values = form.getValues();

    const { roles, skills } = values;
    delete values.roles;
    delete values.skills;

    const foodRunsInterest = roles.includes('foodRunsInterest');
    const distributionInterest = roles.includes('distributionInterest');

    const firstAidTraining = skills.includes('firstAidTraining');
    const serveSafeKnowledge = skills.includes('serveSafeKnowledge');
    const transportationExperience = skills.includes('transportationExperience');
    const movingWarehouseExperience = skills.includes('movingWarehouseExperience');
    const foodServiceIndustryKnowledge = skills.includes('foodServiceIndustryKnowledge');

    let waivers = await Promise.all(
      values.waivers.map(async file => uploadWaiver(file.originFileObj)),
    );
    waivers = values.waivers.map((file, index) => ({
      name: file.name,
      link: waivers[index],
      eventId,
    }));

    await Promise.all(
      waivers.map(async waiverPayload => AFCBackend.post('/waivers/volunteer', waiverPayload)),
    );
    delete values.waivers;

    const payload = {
      ...values,
      userId,
      role: cookies.get(cookieKeys.ROLE),
      availabilities: availability,
      foodRunsInterest,
      distributionInterest,
      firstAidTraining,
      serveSafeKnowledge,
      transportationExperience,
      movingWarehouseExperience,
      foodServiceIndustryKnowledge,
    };

    // update user info
    await AFCBackend.put(`/users/${userId}`, payload);

    // sign up user for event
    await AFCBackend.post(`/volunteers/${userId}/${eventId}`);

    // redirect back to event view page
    navigate(`/event/view/${eventId}`);
  };

  return (
    <Container>
      <SignUpHeader>
        <HeaderText>Sign Up</HeaderText>
        <ButtonRow>
          <Button style={{ marginRight: '3vw' }} onClick={() => navigate(`/event/view/${eventId}`)}>
            Cancel
          </Button>
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
                {defaultValues && (
                  <VolunteerGeneralInfo
                    userId={cookies.get(cookieKeys.USER_ID)}
                    {...defaultValues}
                  />
                )}
              </Card>
            </TabPane>
            <TabPane tab="Availability" key="2">
              <Card>
                {availability && (
                  <Availability
                    availability={availability}
                    setAvailability={setAvailability}
                    dayOfWeekIdx={dayOfWeekIdx}
                  />
                )}
              </Card>
            </TabPane>
            <TabPane tab="Roles & Skills" key="3">
              <Card>
                {defaultValues && (
                  <RolesAndSkills userId={cookies.get(cookieKeys.USER_ID)} {...defaultValues} />
                )}
              </Card>
            </TabPane>
            <TabPane tab="Upload Forms" key="4">
              <Card>
                {defaultValues && (
                  <UploadForms userId={cookies.get(cookieKeys.USER_ID)} {...defaultValues} />
                )}
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
