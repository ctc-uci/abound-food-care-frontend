import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import EventsGeneralInfo from '../components/events/createEvent/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/events/createEvent/EventsAdditionalInfo';

const CreateEvent = () => {
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
      .test('len', 'Zipcode must contain only 5 digits', val => val.length === 5)
      .required(),
    notes: yup.string(),
    // fileAttachments: yup.array().of(yup.string()), TODO: update once waivers storing decided
    fileAttachments: yup.string(),
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
      fileAttachments: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
    delayError: 750,
  });

  const setGivenValue = field => {
    methods.setValue(field, methods.getValues(field));
  };

  const incrementFormStep = () => {
    setFormStep(cur => cur + 1);
    setGivenValue('eventName');
    setGivenValue('eventStartDate');
    setGivenValue('eventStartTime');
    setGivenValue('eventEndDate');
    setGivenValue('eventEndTime');
    setGivenValue('eventType');
    setGivenValue('volunteerCapacity');
    setGivenValue('canDrive');
    setGivenValue('isAdult');
    setGivenValue('isMinor');
    setGivenValue('firstAidTraining');
    setGivenValue('serveSafeKnowledge');
    setGivenValue('transportationExperience');
    setGivenValue('movingWarehouseExperience');
    setGivenValue('foodServiceIndustryKnowledge');
    setGivenValue('addressStreet');
    setGivenValue('addressCity');
    setGivenValue('addressState');
    setGivenValue('addressZip');
  };

  const decrementFormStep = () => {
    setFormStep(cur => cur - 1);
    setGivenValue('notes');
    setGivenValue('fileAttachments');
  };

  const buildRequirementsArray = values => {
    const requirements = [];

    if (values.canDrive) {
      requirements.push('drive');
    }
    if (values.isAdult) {
      requirements.push('adult');
    }
    if (values.isMinor) {
      requirements.push('minor');
    }
    if (values.firstAidTraining) {
      requirements.push('first aid');
    }
    if (values.serveSafeKnowledge) {
      requirements.push('serve safe');
    }
    if (values.transportationExperience) {
      requirements.push('transportation');
    }
    if (values.movingWarehouseExperience) {
      requirements.push('warehouse');
    }
    if (values.foodServiceIndustryKnowledge) {
      requirements.push('food service');
    }

    return requirements;
  };

  const onSubmit = async values => {
    try {
      const requirements = buildRequirementsArray(values);

      const startDate = moment(values.eventStartDate).format('L');
      const startTime = moment(values.eventStartTime).format('LTS');
      const endDate = moment(values.eventEndDate).format('L');
      const endTime = moment(values.eventEndTime).format('LTS');

      const startDatetime = `${startDate} ${startTime}`;
      const endDatetime = `${endDate} ${endTime}`;

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
      };
      await axios.post('http://localhost:3001/events/', payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div>
      <FormProvider {...methods}>
        <Form onFinish={methods.handleSubmit(onSubmit, onError)}>
          {formStep >= 0 && (
            <section hidden={formStep !== 0}>
              <EventsGeneralInfo />
              <div>
                <Link to="/events">
                  <Button
                    style={{
                      borderColor: '#D9D9D9',
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  // disabled={!methods.isValid}
                  onClick={incrementFormStep}
                  style={{
                    background: '#115740',
                    color: 'white',
                    borderColor: '#115740',
                    float: 'right',
                  }}
                >
                  Next
                </Button>
              </div>
            </section>
          )}
          {formStep >= 1 && (
            <section hidden={formStep !== 1}>
              <EventsAdditionalInfo />
              <div>
                <Button
                  style={{
                    borderColor: '#D9D9D9',
                  }}
                  onClick={decrementFormStep}
                >
                  Previous
                </Button>
                <Button
                  style={{
                    background: '#115740',
                    color: 'white',
                    borderColor: '#115740',
                    float: 'right',
                  }}
                  htmlType="submit"
                >
                  Publish Event
                </Button>
              </div>
            </section>
          )}
        </Form>
      </FormProvider>
    </div>
  );
};

export default CreateEvent;
