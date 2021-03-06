import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { AFCBackend, getMonthString, getTimeInPST } from '../../../util/utils';
import useViewPort from '../../../common/useViewPort';
import styles from './UpcomingEvents.module.css';

const UpcomingEvents = () => {
  const { width } = useViewPort();
  const breakpoint = 720;

  const [events, setEvents] = useState([]);

  useEffect(async () => {
    const response = await AFCBackend.get('/events/upcoming');
    await setEvents(response.data);
  }, []);

  return (
    <div>
      {width > breakpoint ? (
        <>
          <Card className={styles['upcoming-events']} title="Upcoming Events">
            {events.map(upcomingEvent => (
              <Card.Grid key={upcomingEvent.name} className={styles['upcoming-event']}>
                <div>
                  <a className={styles['upcoming-event-name']} href="https://www.google.com">
                    {upcomingEvent.name}
                  </a>
                  <p className={styles['upcoming-event-start-date']}>
                    {getMonthString(upcomingEvent.startDateTime)}{' '}
                    {new Date(upcomingEvent.startDateTime).getDate()},{' '}
                    {new Date(upcomingEvent.startDateTime).getFullYear()}
                  </p>
                  <p>
                    {getTimeInPST(upcomingEvent.startDateTime)} -{' '}
                    {getTimeInPST(upcomingEvent.endDateTime)}
                  </p>
                </div>
              </Card.Grid>
            ))}
          </Card>
        </>
      ) : (
        <>
          <br />
          <div className={styles['upcoming-events-title-mobile-box']}>
            <h4>Upcoming Events</h4>
            <Link to="/events">
              <h5>View All</h5>
            </Link>
          </div>
          <div>
            {events.slice(0, 3).map(upcomingEvent => (
              <Card.Grid key={upcomingEvent.name} className={styles.grid}>
                <div className={styles['show-event-mobile-container']}>
                  <div className={styles['show-event-date-mobile']}>
                    <h6>{getMonthString(upcomingEvent.startDateTime)}</h6>
                    <h7>{new Date(upcomingEvent.startDateTime).getDate()}</h7>
                  </div>
                  <div className={styles['show-event-details-mobile']}>
                    <a className={styles['upcoming-event-name']} href="https://www.google.com">
                      {upcomingEvent.name}
                    </a>
                    <h8>
                      {getTimeInPST(upcomingEvent.startDateTime)} -{' '}
                      {getTimeInPST(upcomingEvent.endDateTime)}
                    </h8>
                  </div>
                </div>
              </Card.Grid>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingEvents;
