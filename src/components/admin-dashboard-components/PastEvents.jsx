import React, { useState, useEffect } from 'react';
import './PastEvents.css';
import { Card } from 'antd';
import axios from 'axios';
import utils from '../../util/utils';

const PastEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(async () => {
    const response = await axios.get('http://localhost:3001/events/past');
    await setEvents(response.data);
  }, []);
  return (
    <div className="past-events-container">
      <Card title="Past Events">
        {events.map(pastEvent => (
          <Card.Grid key={pastEvent.name} className="past-event">
            <div>
              <a className="past-event-name" href="https://www.google.com">
                {pastEvent.name}
              </a>
              <p className="past-event-start-date">
                {' '}
                {utils.getMonthString(pastEvent.startDatetime)}{' '}
                {new Date(pastEvent.startDatetime).getDate()},{' '}
                {new Date(pastEvent.startDatetime).getFullYear()}
              </p>
              <p className="past-event-end">
                {utils.getTimeInPST(pastEvent.startDatetime)} -{' '}
                {utils.getTimeInPST(pastEvent.endDatetime)}
              </p>
              <p>
                <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Total Hours: </span>
                {utils.getHourDiff(pastEvent.startDatetime, pastEvent.endDatetime)} hrs
              </p>
            </div>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

export default PastEvents;
