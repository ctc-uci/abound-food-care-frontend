import './UpcomingEvents.css';
import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import utils from '../../util/utils';
import useViewPort from '../../common/useViewPort';

const UpcomingEvents = () => {
  const { width } = useViewPort();
  const breakpoint = 720;

  const [events, setEvents] = useState([]);
  useEffect(async () => {
    const response = await axios.get('http://localhost:3001/events/upcoming');
    await setEvents(response.data);
  }, []);

  return (
    <div>
      {width > breakpoint ? (
        <>
          <Card className="upcoming-events" title="Upcoming Events">
            {events.map(upcomingEvent => (
              <Card.Grid key={upcomingEvent.name} className="upcoming-event">
                <div>
                  <a className="upcoming-event-name" href="https://www.google.com">
                    {upcomingEvent.name}
                  </a>
                  <p className="upcoming-event-start-date">
                    {utils.getMonthString(upcomingEvent.startDateTime)}{' '}
                    {new Date(upcomingEvent.startDateTime).getDate()},{' '}
                    {new Date(upcomingEvent.startDateTime).getFullYear()}
                  </p>
                  <p>
                    {utils.getTimeInPST(upcomingEvent.startDateTime)} -{' '}
                    {utils.getTimeInPST(upcomingEvent.endDateTime)}
                  </p>
                </div>
              </Card.Grid>
            ))}
          </Card>
        </>
      ) : (
        <>
          <Card className="upcoming-events" title="Upcoming Events">
            {events.map(upcomingEvent => (
              <Card.Grid key={upcomingEvent.name} className="upcoming-event">
                <div>
                  <a className="upcoming-event-name" href="https://www.google.com">
                    {upcomingEvent.name}
                  </a>
                  <p className="upcoming-event-start-date">
                    {utils.getMonthString(upcomingEvent.startDateTime)}{' '}
                    {new Date(upcomingEvent.startDateTime).getDate()},{' '}
                    {new Date(upcomingEvent.startDateTime).getFullYear()}
                  </p>
                  <p>
                    {utils.getTimeInPST(upcomingEvent.startDateTime)} -{' '}
                    {utils.getTimeInPST(upcomingEvent.endDateTime)}
                  </p>
                </div>
              </Card.Grid>
            ))}
          </Card>
        </>
      )}
    </div>
  );
};

export default UpcomingEvents;
