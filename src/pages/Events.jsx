import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import EventsGeneralInfo from '../components/EventsGeneralInfo';
import EventsAdditionalInfo from '../components/EventsAdditionalInfo';

function Events() {
  const [state, setState] = useState('start');

  return (
    <div>
      <p>This is the events page.</p>
      {state === 'start' && (
        <>
          <EventsGeneralInfo />
          <div>
            <Button type="primary">Cancel</Button>
            <Button
              onClick={() => setState('additional-info')}
              type="primary"
              style={{ float: 'right' }}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {state === 'additional-info' && <EventsAdditionalInfo />}
    </div>
  );
}

export default Events;
