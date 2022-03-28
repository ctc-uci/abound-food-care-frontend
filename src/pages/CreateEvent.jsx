import React, { useState } from 'react';
import { Button } from 'antd';
// import axios from 'axios';
import EventsGeneralInfo from '../components/events/createEvent/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/events/createEvent/EventsAdditionalInfo';

function CreateEvent() {
  const [formState, setFormState] = useState('general-info');

  const [eventName, setEventName] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventStartDateTime, setEventStartDateTime] = useState('');
  const [eventEndDateTime, setEventEndDateTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [volunteerCapacity, setVolunteerCapacity] = useState(null);
  const [canDrive, setCanDrive] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [firstAidTraining, setFirstAidTraining] = useState(false);
  const [serveSafeKnowledge, setServeSafeKnowledge] = useState(false);
  const [transportationExperience, setTransportationExperience] = useState(false);
  const [warehouseExperience, setWarehouseExperience] = useState(false);
  const [foodServiceKnowledge, setFoodServiceKnowledge] = useState(false);
  const [eventAddressStreet, setEventAddressStreet] = useState('');
  const [eventAddressCity, setEventAddressCity] = useState('');
  const [eventAddressState, setEventAddressState] = useState('');
  const [eventAddressZip, setEventAddressZip] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [fileAttachments, setFileAttachments] = useState([]);

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

  const handlePublishEvent = () => {
    try {
      // datetime state not setting
      const startDateTime = `${eventStartDate} ${eventStartTime}`;
      const endDateTime = `${eventEndDate} ${eventEndTime}`;
      setEventStartDateTime(startDateTime);
      setEventEndDateTime(endDateTime);
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {formState === 'general-info' && (
        <>
          <EventsGeneralInfo setStates={setStates} />
          <div>
            <Button
              style={{
                background: '#F5F5F5',
                color: 'rgba(0, 0, 0, 0.25)',
                borderColor: '#D9D9D9',
              }}
            >
              Cancel
            </Button>
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
      )}

      {formState === 'additional-info' && (
        <>
          <EventsAdditionalInfo states={states} setStates={setStates} />
          <div>
            <Button
              style={{
                background: '#F5F5F5',
                color: 'rgba(0, 0, 0, 0.25)',
                borderColor: '#D9D9D9',
              }}
            >
              Cancel
            </Button>
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
          </div>
        </>
      )}
    </div>
  );
}

export default CreateEvent;
