import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const [isEdit] = useState(id);

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
    delayError: 750,
  });

  function setRequirements(value) {
    if (value === 'drive') {
      methods.setValue('canDrive', true);
    } else if (value === 'adult') {
      methods.setValue('isAdult', true);
    } else if (value === 'minor') {
      methods.setValue('isMinor', true);
    } else if (value === 'first aid') {
      methods.setValue('firstAidTraining', true);
    } else if (value === 'serve safe') {
      methods.setValue('serveSafeKnowledge', true);
    } else if (value === 'transportation') {
      methods.setValue('transportationExperience', true);
    } else if (value === 'warehouse') {
      methods.setValue('movingWarehouseExperience', true);
    } else if (value === 'food service') {
      methods.setValue('foodServiceIndustryKnowledge', true);
    }
  }

  const getEventData = async () => {
    try {
      const eventResponse = await axios.get(`http://localhost:3001/events/${id}`);
      const eventData = eventResponse.data[0];
      console.log(eventData);
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
      let { requirements } = eventData;
      if (requirements) {
        requirements = requirements.replaceAll('"', ''); // requirements that are two words are returned in quotes - must remove
        requirements = requirements.slice(1, requirements.length - 1).split(',');
        requirements.forEach(r => setRequirements(r));
      }
      // 'fileAttachments': 'eventData.fileAttachments)'; TBD once waivers set up in db
    } catch (e) {
      console.log('Error while getting event data!');
    }
  };

  useEffect(() => {
    // Load data if editing an event
    if (isEdit) {
      getEventData();
    }
  }, [isEdit]);

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
      // console.log(values);
      const startDate = moment(values.eventStartDate).format('L');
      const startTime = moment(values.eventStartTime).format('LTS');
      const endDate = moment(values.eventEndDate).format('L');
      const endTime = moment(values.eventEndTime).format('LTS');
      const timeZone = moment(values.eventStartDate).format('Z');

      const startDatetime = `${startDate} ${startTime} ${timeZone}`;
      const endDatetime = `${endDate} ${endTime} ${timeZone}`;

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
      };

      // Check if this is editing or creating a new event
      if (isEdit) {
        await axios.put(`http://localhost:3001/events/${id}`, payload);
        // TODO: Redirect to event page?
      } else {
        await axios.post('http://localhost:3001/events/', payload);
        // TODO: Redirect to event page?
      }
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
                  {isEdit ? 'Update Event' : 'Publish Event'}
                </Button>
              </div>
            </section>
          )}
          {/* <pre>{JSON.stringify(methods.watch(), null, 2)}</pre> */}
        </Form>
      </FormProvider>
    </div>
  );
};

export default CreateEvent;
