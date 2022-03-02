import React, { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import EventsGeneralInfo from '../components/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/EventsAdditionalInfo';

function Events() {
  const [state, setState] = useState('general-info');

  const [eventName, setEventName] = useState('');
  const [eventStartDateTime, setEventStartDateTime] = useState('');
  const [eventEndDateTime, setEventEndDateTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventVolunteerCapacity, setEventVolunteerCapacity] = useState(0);
  const [eventVolunteerType, setEventVolunteerType] = useState('');
  const [eventVolunteerRequirements, setEventVolunteerRequirements] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const [eventNotes, setEventNotes] = useState('');
  const [eventFileAttachments, setEventFileAttachments] = useState();

  const [data, setData] = useState({});

  const submitForm = async () => {
    axios
      .post('http://localhost:3001/events/create', data)
      .then(response => {
        console.log(`Status: ${response.status}`);
      })
      .catch(error => {
        console.log('Something went wrong!', error);
      });
  };

  const setGeneralInfo = async values => {
    await setEventName(values.name);
    await setEventStartDateTime(values.startDateTime);
    await setEventEndDateTime(values.endDateTime);
    await setEventType(values.ntype);
    await setEventVolunteerCapacity(values.volunteerCapacity);
    await setEventVolunteerType(values.volunteerType);
    await setEventVolunteerRequirements(values.volunteerRequirements);
    await setEventLocation(values.location);
  };

  const setAdditionalInfo = async values => {
    await setEventNotes(values.notes);
    await setEventFileAttachments(values.fileAttachments);
    await setData({
      name: eventName,
      startDateTime: eventStartDateTime,
      endDateTime: eventEndDateTime,
      ntype: eventType,
      volunteerCapacity: eventVolunteerCapacity,
      volunteerType: eventVolunteerType,
      volunteerRequirements: eventVolunteerRequirements,
      location: eventLocation,
      notes: eventNotes,
      fileAttachments: eventFileAttachments,
    });
    submitForm(data);
  };

  return (
    <div>
      <p>This is the events page.</p>
      {state === 'general-info' && (
        <>
          <EventsGeneralInfo setGeneralInfo={setGeneralInfo} />
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
              onClick={() => setState('additional-info')}
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

      {state === 'additional-info' && (
        <>
          <EventsAdditionalInfo setAdditionalInfo={setAdditionalInfo} />
          <div>
            <Button
              onClick={() => setState('general-info')}
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
            >
              Publish Event
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Events;
