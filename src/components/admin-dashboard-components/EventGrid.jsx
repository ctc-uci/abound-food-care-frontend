import React, { useState, useEffect } from 'react';
import './EventGrid.css';
import { Card } from 'antd';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import utils from '../../util/utils';

const EventGrid = ({ title, eventStatus }) => {
  const [events, setEvents] = useState([]);
  // get events of that type
  useEffect(async () => {
    let query = 'http://localhost:3001/events/';
    if (eventStatus === 'past') {
      query += 'past';
    } else if (eventStatus === 'upcoming') {
      query += 'upcoming';
    }
    const response = await axios.get(query);
    await setEvents(response.data);
  }, []);

  const renderTotalHours = (startDatetime, endDatetime) => {
    return (
      <p>
        <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Total Hours: </span>
        {utils.getHourDiff(startDatetime, endDatetime)} hrs
      </p>
    );
  };

  return (
    <div className="events-container">
      <Card title={title}>
        {events.map(event => (
          <Card.Grid key={event.name} className={`${eventStatus}-event`}>
            <div>
              <a className="event-name" href="https://www.google.com">
                {event.name}
              </a>
              <p className="event-start-date">
                {' '}
                {utils.getMonthString(event.startDatetime)}{' '}
                {new Date(event.startDatetime).getDate()},{' '}
                {new Date(event.startDatetime).getFullYear()}
              </p>
              <p className="event-end">
                {utils.getTimeInPST(event.startDatetime)} - {utils.getTimeInPST(event.endDatetime)}
              </p>
              {eventStatus === 'past' && renderTotalHours(event.startDatetime, event.endDatetime)}
            </div>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

EventGrid.propTypes = {
  title: PropTypes.string,
  eventStatus: PropTypes.string,
};

EventGrid.defaultProps = {
  title: '',
  eventStatus: '',
};

export default EventGrid;
