import './UpcomingEvents.css';
import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import utils from '../../util/utils';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(async () => {
    const response = await axios.get('http://localhost:3001/events/upcoming');
    await setEvents(response.data);
  }, []);
  return (
    <Card className="upcoming-events" title="Upcoming Events">
      {events.map(upcomingEvent => (
        <Card.Grid key={upcomingEvent.name} className="upcoming-event">
          <div>
            <a className="upcoming-event-name" href="https://www.google.com">
              {upcomingEvent.name}
            </a>
            <p className="upcoming-event-start-date">
              {utils.getMonthString(upcomingEvent.startDatetime)}{' '}
              {new Date(upcomingEvent.startDatetime).getDate()},{' '}
              {new Date(upcomingEvent.startDatetime).getFullYear()}
            </p>
            <p>
              {utils.getTimeInPST(upcomingEvent.startDatetime)} -{' '}
              {utils.getTimeInPST(upcomingEvent.endDatetime)}
            </p>
          </div>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default UpcomingEvents;
