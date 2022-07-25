import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { AFCBackend, getMonthString, getTimeInPST, getHourDiff } from '../../../util/utils';
import useViewPort from '../../../common/useViewPort';
import styles from './PastEvents.module.css';

const PastEvents = () => {
  const [events, setEvents] = useState([]);
  const { width } = useViewPort();
  const breakpoint = 720;
  useEffect(async () => {
    const response = await AFCBackend.get('/events/past');
    setEvents(response.data);
  }, []);

  return (
    <div>
      {width > breakpoint ? (
        <>
          <div className={styles['past-events-container']}>
            <Card title="Past Events">
              {events.map(pastEvent => (
                <Card.Grid key={pastEvent.name} className={styles['past-event']}>
                  <div>
                    <a className={styles['past-event-name']} href="https://www.google.com">
                      {pastEvent.name}
                    </a>
                    <p className={styles['past-event-start-date']}>
                      {' '}
                      {getMonthString(pastEvent.startDateTime)}{' '}
                      {new Date(pastEvent.startDateTime).getDate()},{' '}
                      {new Date(pastEvent.startDateTime).getFullYear()}
                    </p>
                    <p className={styles['past-event-end']}>
                      {getTimeInPST(pastEvent.startDateTime)} -{' '}
                      {getTimeInPST(pastEvent.endDateTime)}
                    </p>
                    <p>
                      <span className={styles['semi-opaque-black']}>Total Hours: </span>
                      {getHourDiff(pastEvent.startDateTime, pastEvent.endDateTime)} hrs
                    </p>
                  </div>
                </Card.Grid>
              ))}
            </Card>
          </div>
        </>
      ) : (
        <>
          <br />
          <div className={styles['mobile-header']}>
            <h4>Past Events</h4>
            <Link to="/events">
              <h5>View All</h5>
            </Link>
          </div>
          {events.slice(0, 1).map(pastEvent => (
            <Card.Grid key={pastEvent.name} className={styles.grid}>
              <div className={styles['show-past-event-mobile-container']}>
                <div className={styles['show-past-event-date-mobile']}>
                  <h6>{getMonthString(pastEvent.startDateTime)}</h6>
                  <h7>{new Date(pastEvent.startDateTime).getDate()}</h7>
                </div>
                <div className={styles['show-past-event-details-mobile']}>
                  <a className={styles['past-event-name']} href="https://www.google.com">
                    {pastEvent.name}
                  </a>
                  <h8>
                    {getTimeInPST(pastEvent.startDateTime)} - {getTimeInPST(pastEvent.endDateTime)}
                  </h8>
                </div>
              </div>
            </Card.Grid>
          ))}
        </>
      )}
    </div>
  );
};

export default PastEvents;
