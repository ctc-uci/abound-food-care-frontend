import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button, Progress } from 'antd';
import moment from 'moment';

import uploadWaiver from '../../components/events/utils';
import EventsGeneralInfo from '../../components/events/CreateEvent/EventsGeneralInfo';
import EventsAdditionalInfo from '../../components/events/CreateEvent/EventsAdditionalInfo';
import { AFCBackend, zipRegExp, eventRequirements } from '../../util/utils';

import styles from './CreateEvent.module.css';

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);

  const schema = yup.object({
    eventName: yup.string().required(),
    eventStartDate: yup.date().required(),
    eventStartTime: yup.date().required(),
    eventEndDate: yup.date().required(),
    eventEndTime: yup.date().required(),
    eventType: yup.string().required(),
    volunteerCapacity: yup.number().integer().required(),
    canDrive: yup.bool(),
    isAdult: yup.bool(),
    isMinor: yup.bool(),
    firstAidTraining: yup.bool(),
    serveSafeKnowledge: yup.bool(),
    transportationExperience: yup.bool(),
    movingWarehouseExperience: yup.bool(),
    foodServiceIndustryKnowledge: yup.bool(),
    addressStreet: yup.string().required(),
    addressCity: yup.string().required(),
    addressState: yup
      .string()
      .test('len', 'Must be a 2-letter state code', val => val.length === 2)
      .required(),
    addressZip: yup
      .string()
      .matches(zipRegExp, 'Zipcode is not valid')
      .required('Zipcode is required')
      .test('len', 'Zipcode must contain only 5 digits', val => val.length === 5),
    notes: yup.string(),
    waivers: yup.array(),
  });

  const methods = useForm({
    defaultValues: {
      eventName: '',
      eventStartDate: '',
      eventStartTime: '',
      eventEndDate: '',
      eventEndTime: '',
      eventType: '',
      volunteerCapacity: null,
      canDrive: false,
      isAdult: false,
      isMinor: false,
      firstAidTraining: false,
      serveSafeKnowledge: false,
      transportationExperience: false,
      movingWarehouseExperience: false,
      foodServiceIndustryKnowledge: false,
      addressStreet: '',
      addressCity: '',
      addressState: '',
      addressZip: '',
      notes: '',
      waivers: [],
    },
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const incrementFormStep = () => setFormStep(cur => cur + 1);
  const decrementFormStep = () => setFormStep(cur => cur - 1);
  const setRequirements = value => methods.setValue(value, true);
  const buildRequirementsArray = values => eventRequirements.filter(req => values[req]);

  const getEventData = async () => {
    try {
      const eventResponse = await AFCBackend.get(`/events/${id}`);
      const eventData = eventResponse.data[0];
      const endDateTime = new Date(eventData.endDatetime);
      const startDateTime = new Date(eventData.startDatetime);
      methods.setValue('eventName', eventData.name);
      methods.setValue('eventType', eventData.eventType);
      methods.setValue('volunteerCapacity', eventData.volunteerCapacity);
      methods.setValue('addressStreet', eventData.addressStreet);
      methods.setValue('addressCity', eventData.addressCity);
      methods.setValue('addressState', eventData.addressState);
      methods.setValue('addressZip', eventData.addressZip);
      methods.setValue('notes', eventData.notes);
      methods.setValue('addressStreet', eventData.addressStreet);
      methods.setValue('eventEndTime', moment(endDateTime));
      methods.setValue('eventStartDate', moment(startDateTime));
      methods.setValue('eventEndDate', moment(endDateTime));
      methods.setValue('eventStartTime', moment(startDateTime));
      methods.setValue('waivers', eventData.waivers ? eventData.waivers : []);
      if (eventData.requirements) {
        eventData.requirements.forEach(r => setRequirements(r));
      }
    } catch (e) {
      toast.error(`Error fetching event data: ${e.message}`);
    }
  };

  const onSubmit = async values => {
    try {
      const requirements = buildRequirementsArray(values);
      const startDate = moment(values.eventStartDate).format('L');
      const startTime = moment(values.eventStartTime).format('LTS');
      const endDate = moment(values.eventEndDate).format('L');
      const endTime = moment(values.eventEndTime).format('LTS');
      const timeZone = moment(values.eventStartDate).format('Z');

      const startDatetime = `${startDate} ${startTime} ${timeZone}`;
      const endDatetime = `${endDate} ${endTime} ${timeZone}`;

      let waivers = await Promise.all(
        values.waivers.map(async file => uploadWaiver(file.originFileObj)),
      );
      waivers = values.waivers.map((file, index) => ({
        name: file.name,
        link: waivers[index],
      }));

      const payload = {
        name: values.eventName,
        eventType: values.eventType,
        addressStreet: values.addressStreet,
        addressZip: values.addressZip,
        addressCity: values.addressCity,
        addressState: values.addressState,
        startDatetime,
        endDatetime,
        volunteerCapacity: values.volunteerCapacity,
        requirements,
        notes: values.notes,
        waivers,
      };
      // Check if this is editing or creating a new event
      if (id) {
        await AFCBackend.put(`/events/${id}`, payload);
        navigate(`/event/view/${id}`);
      } else {
        const { data } = await AFCBackend.post('/events/', payload);
        navigate(`/event/view/${data.eventId}`);
      }
    } catch (e) {
      toast.error(`Error submitting event info: ${e.message}`);
    }
  };

  const onError = (errors, e) => toast.error(errors, e);

  useEffect(() => {
    // Load data if editing an event
    if (!id) {
      return;
    }
    getEventData();
  }, [id]);

  return (
    <>
      <div className={styles.progressContainer}>
        <Progress percent={formStep * 50 + 50} showInfo={false} status="active" />
        <div>
          <div className={styles.progressLeft}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <p className={styles.progressLink} onClick={() => setFormStep(0)}>
              General Information
            </p>
          </div>
          <div className={styles.progressRight}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
            <p className={styles.progressLink} onClick={() => setFormStep(1)}>
              Additional Information
            </p>
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <FormProvider {...methods}>
          <Form onFinish={methods.handleSubmit(onSubmit, onError)}>
            {formStep === 0 && (
              <section hidden={formStep !== 0}>
                <EventsGeneralInfo />
                <div>
                  <Link to="/events">
                    <Button>Cancel</Button>
                  </Link>
                  <Button
                    onClick={incrementFormStep}
                    type="primary"
                    style={{
                      float: 'right',
                    }}
                  >
                    Next
                  </Button>
                </div>
              </section>
            )}
            {formStep === 1 && (
              <section hidden={formStep !== 1}>
                <EventsAdditionalInfo isEdit={id && true} />
                <div>
                  <Button onClick={decrementFormStep}>Previous</Button>
                  <Button
                    type="primary"
                    style={{
                      float: 'right',
                    }}
                    htmlType="submit"
                  >
                    {id ? 'Update Event' : 'Publish Event'}
                  </Button>
                </div>
              </section>
            )}
          </Form>
        </FormProvider>
      </div>
    </>
  );
};

export default CreateEvent;
