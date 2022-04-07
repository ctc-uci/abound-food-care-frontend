import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Form, Button } from 'antd';
// import axios from 'axios';
import EventsGeneralInfo from '../components/events/createEvent/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/events/createEvent/EventsAdditionalInfo';

const CreateEvent = () => {
  const [formStep, setFormStep] = useState(0);

  const schema = yup.object({
    eventName: yup.string().required(),
    eventStartDateTime: yup.date().required(),
    eventEndDateTime: yup.date().required(),
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
    addressState: yup.string().required(),
    addressZip: yup.string().required(),
    notes: yup.string(),
    fileAttachments: yup.array().of(yup.string()),
  });

  const methods = useForm({
    defaultValues: {
      eventName: '',
      eventStartDateTime: '',
      eventEndDateTime: '',
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
      fileAttachments: [null],
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
    // delayError: 750,
  });

  const setGivenValue = field => {
    methods.setValue(field, methods.getValues(field));
  };

  const incrementFormStep = () => {
    setFormStep(cur => cur + 1);
    setGivenValue('eventName');
    setGivenValue('eventStartDateTime');
    setGivenValue('eventEndDateTime');
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

  const onSubmit = values => {
    try {
      // await axios.post('http://localhost:3001/events/create', data);
      console.log(JSON.stringify(values, null, 2));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <Form onFinish={methods.handleSubmit(onSubmit)}>
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
                {/* <Link to="/event"> */}
                <Button
                  // disabled={!methods.isValid}
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
                {/* </Link> */}
              </div>
            </section>
          )}
          {formStep >= 2 && (
            <section hidden={formStep !== 2}>
              <p>Event created!</p>
            </section>
          )}
          {/* <pre>{JSON.stringify(methods.watch(), null, 2)}</pre> */}
        </Form>
      </FormProvider>
    </div>
  );
};

export default CreateEvent;
