import React from 'react';
import 'antd/dist/antd.css';
import EventsGeneralInfo from '../components/EventsGeneralInfo';
// import EventsAdditionalInfo from '../components/EventsAdditionalInfo';

function Events() {
  return (
    <div>
      <p>This is the events page.</p>
      <EventsGeneralInfo />
      {/* <EventsAdditionalInfo /> */}
    </div>
  );
}

export default Events;
