import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
// import axios from 'axios';
import EventsGeneralInfo from '../components/events/createEvent/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/events/createEvent/EventsAdditionalInfo';

const CreateEvent = () => {
  const [formState, setFormState] = useState('general-info');
  // yup schema
  const schema = yup
    .object({
      eventName: yup.string().required(),
      eventStartDateTime: yup
        .date()
        .required('Invalid date, please enter a valid date')
        .typeError('Invalid date, please enter a valid date'),
      eventEndDateTime: yup
        .date()
        .required('Invalid date, please enter a valid date')
        .typeError('Invalid date, please enter a valid date'),
      eventType: yup.string().required().lowercase(),
      volunteerCapacity: yup.number('Invalid number, please add enter a valid number').required(),
      canDrive: yup.boolean(),
      isMinor: yup.boolean(),
      isAdult: yup.boolean(),
      firstAidTraining: yup.boolean(),
      serveSafeKnowledge: yup.boolean(),
      transportationExperience: yup.boolean(),
      warehouseExperience: yup.boolean(),
      foodServiceKnowledge: yup.boolean(),
      eventAddressStreet: yup
        .string()
        .required('Event address required, please enter a valid street address'),
      eventAddressCity: yup.string().required('Event address required, please enter a valid city'),
      eventAddressState: yup
        .string()
        .required('Invalid state code, please enter a valid, 2-letter state code'),
      eventAddressZip: yup.string().required('Invalid zipcode, please enter a valid zipcode'),
      additionalInfo: yup.string(),
      fileAttachments: yup.string(),
    })
    .required();

  const methods = useForm({
    defaultValues: {
      eventName: '',
      eventStartDateTime: '',
      eventEndDateTime: '',
      eventType: '',
      volunteerCapacity: null,
      canDrive: false,
      isMinor: false,
      isAdult: false,
      firstAidTraining: false,
      serveSafeKnowledge: false,
      transportationExperience: false,
      warehouseExperience: false,
      foodServiceKnowledge: false,
      eventAddressStreet: '',
      eventAddressCity: '',
      eventAddressState: '',
      eventAddressZip: '',
      additionalInfo: '',
      fileAttachments: '',
    },
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const onSubmit = data => {
    try {
      // await axios.post('http://localhost:3001/events/create', data);
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {formState === 'general-info' ? (
        <>
          <FormProvider {...methods}>
            <EventsGeneralInfo />
          </FormProvider>
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
              onClick={() => setFormState('additional-info')}
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
        </>
      ) : (
        <>
          <FormProvider {...methods}>
            <EventsAdditionalInfo />
          </FormProvider>
          <div>
            <Button
              style={{
                borderColor: '#D9D9D9',
              }}
              onClick={() => setFormState('general-info')}
            >
              Previous
            </Button>
            {/* <Link to="/event"> */}
            <Button
              style={{
                background: '#115740',
                color: 'white',
                borderColor: '#115740',
                float: 'right',
              }}
              type="submit"
              onClick={methods.handleSubmit(onSubmit)}
            >
              Publish Event
            </Button>
            {/* </Link> */}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateEvent;
