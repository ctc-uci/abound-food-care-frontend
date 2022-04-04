import React, { useState } from 'react';
import { Button } from 'antd';
import EventsGeneralInfo from '../components/events/createEvent/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/events/createEvent/EventsAdditionalInfo';

function CreateEvent() {
  const [state, setState] = useState('general-info');

  return (
    <div>
      {state === 'general-info' && (
        <>
          <EventsGeneralInfo />
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
          <EventsAdditionalInfo />
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
