import React from 'react';
import AdminEvents from '../components/events/adminEvent/AdminEvents';
import 'antd/dist/antd.css';
import EventPage from '../components/EventPage';

function Events() {
  return (
    <div>
      <AdminEvents />
      <EventPage />
    </div>
  );
}

export default Events;
