import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import EventsGeneralInfo from '../components/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/EventsAdditionalInfo';

// TODO: Change color of hover
// TODO: Add functionality

function Events() {
  const [state, setState] = useState('start');

  return (
    <div>
      <p>This is the events page.</p>
      {state === 'start' && (
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

export default Events;
