import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import useLocalStorage from '../util/useLocalStorage';
// import axios from 'axios';
import EventsGeneralInfo from '../components/events/createEvent/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/events/createEvent/EventsAdditionalInfo';

const CreateEvent = () => {
  const [formState, setFormState] = useLocalStorage('formState', 'general-info');

  const [eventName, setEventName] = useLocalStorage('eventName', '');
  const [eventStartDate, setEventStartDate] = useLocalStorage('eventStartDate', '');
  const [eventStartTime, setEventStartTime] = useLocalStorage('eventStartTime', '');
  const [eventEndDate, setEventEndDate] = useLocalStorage('eventEndDate', '');
  const [eventEndTime, setEventEndTime] = useLocalStorage('eventEndTime', '');
  const [eventStartDateTime, setEventStartDateTime] = useLocalStorage('eventStartDateTime', '');
  const [eventEndDateTime, setEventEndDateTime] = useLocalStorage('eventEndDateTime', '');
  const [eventType, setEventType] = useLocalStorage('eventType', '');
  const [volunteerCapacity, setVolunteerCapacity] = useLocalStorage('volunteerCapacity', null);
  const [canDrive, setCanDrive] = useLocalStorage('canDrive', false);
  const [isAdult, setIsAdult] = useLocalStorage('isAdult', false);
  const [isMinor, setIsMinor] = useLocalStorage('isMinor', false);
  const [firstAidTraining, setFirstAidTraining] = useLocalStorage('firstAidTraining', false);
  const [serveSafeKnowledge, setServeSafeKnowledge] = useLocalStorage('serveSafeKnowledge', false);
  const [transportationExperience, setTransportationExperience] = useLocalStorage(
    'transportationExperience',
    false,
  );
  const [warehouseExperience, setWarehouseExperience] = useLocalStorage(
    'warehouseExperience',
    false,
  );
  const [foodServiceKnowledge, setFoodServiceKnowledge] = useLocalStorage(
    'foodServiceKnowledge',
    false,
  );
  const [eventAddressStreet, setEventAddressStreet] = useLocalStorage('eventAddressStreet', '');
  const [eventAddressCity, setEventAddressCity] = useLocalStorage('eventAddressCity', '');
  const [eventAddressState, setEventAddressState] = useLocalStorage('eventAddressState', '');
  const [eventAddressZip, setEventAddressZip] = useLocalStorage('eventAddressZip', '');
  const [additionalInfo, setAdditionalInfo] = useLocalStorage('additionalInfo', '');
  const [fileAttachments, setFileAttachments] = useLocalStorage('fileAttachments', []);

  const states = {
    eventName,
    eventStartDate,
    eventStartTime,
    eventEndDate,
    eventEndTime,
    eventStartDateTime,
    eventEndDateTime,
    eventType,
    volunteerCapacity,
    canDrive,
    isAdult,
    isMinor,
    firstAidTraining,
    serveSafeKnowledge,
    transportationExperience,
    warehouseExperience,
    foodServiceKnowledge,
    eventAddressStreet,
    eventAddressCity,
    eventAddressState,
    eventAddressZip,
    additionalInfo,
    fileAttachments,
  };

  const setStates = {
    setEventName,
    setEventStartDate,
    setEventStartTime,
    setEventEndDate,
    setEventEndTime,
    setEventStartDateTime,
    setEventEndDateTime,
    setEventType,
    setVolunteerCapacity,
    setCanDrive,
    setIsAdult,
    setIsMinor,
    setFirstAidTraining,
    setServeSafeKnowledge,
    setTransportationExperience,
    setWarehouseExperience,
    setFoodServiceKnowledge,
    setEventAddressStreet,
    setEventAddressCity,
    setEventAddressState,
    setEventAddressZip,
    setAdditionalInfo,
    setFileAttachments,
  };

  // eslint-disable-next-line consistent-return
  const handlePublishEvent = () => {
    try {
      const payload = {
        eventName,
        eventStartDateTime,
        eventEndDateTime,
        eventType,
        volunteerCapacity,
        canDrive,
        isAdult,
        isMinor,
        firstAidTraining,
        serveSafeKnowledge,
        transportationExperience,
        warehouseExperience,
        foodServiceKnowledge,
        eventAddressStreet,
        eventAddressCity,
        eventAddressState,
        eventAddressZip,
        additionalInfo,
        fileAttachments,
      };

      // await axios.post('http://localhost:3001/events/create', payload);
      console.log(payload);
      localStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {formState === 'general-info' ? (
        <>
          <EventsGeneralInfo states={states} setStates={setStates} />
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
          <EventsAdditionalInfo states={states} setStates={setStates} />
          <div>
            <Button
              style={{
                borderColor: '#D9D9D9',
              }}
              onClick={() => setFormState('general-info')}
            >
              Previous
            </Button>
            <Link to="/event">
              <Button
                style={{
                  background: '#115740',
                  color: 'white',
                  borderColor: '#115740',
                  float: 'right',
                }}
                onClick={handlePublishEvent}
              >
                Publish Event
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateEvent;
