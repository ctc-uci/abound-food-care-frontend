import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { PropTypes } from 'prop-types';
import { AFCBackend, getHourDiff, getMonthString, getTimeInPST } from '../../../util/utils';
import styles from './EventGrid.module.css';

const EventGrid = ({ title, eventStatus }) => {
  const [events, setEvents] = useState([]);
  // get events of that type
  useEffect(async () => {
    // eventStatus is either 'past' or 'upcoming'
    const response = await AFCBackend.get(`/events/${eventStatus}`);
    setEvents(response.data);
  }, []);

  const renderTotalHours = (startDatetime, endDatetime) => {
    return (
      <p>
        <span className={styles['semi-opaque-black']}>Total Hours: </span>
        {getHourDiff(startDatetime, endDatetime)} hrs
      </p>
    );
  };

  return (
    <div className={styles['events-container']}>
      <Card title={title}>
        {events.map((event, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card.Grid key={index} className={styles[`${eventStatus}-event`]}>
            <div>
              <a className={styles['event-name']} href="https://www.google.com">
                {event.name}
              </a>
              <p className={styles['event-start-date']}>
                {' '}
                {getMonthString(event.startDatetime)} {new Date(event.startDatetime).getDate()},{' '}
                {new Date(event.startDatetime).getFullYear()}
              </p>
              <p className={styles['event-end']}>
                {getTimeInPST(event.startDatetime)} - {getTimeInPST(event.endDatetime)}
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
