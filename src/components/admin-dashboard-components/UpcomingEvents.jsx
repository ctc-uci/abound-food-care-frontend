import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'antd';
import utils from '../../util/utils';
import useViewPort from '../../common/useViewPort';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
  const { width } = useViewPort();
  const breakpoint = 720;

  const gridStyle = {
    width: '100%',
    textAlign: 'center',
    marginTop: 12,
    padding: '0px 0px 0px 0px',
  };

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
          <br />
          <div className="Upcoming-Events-Title-Mobile-Box">
            <h4>Upcoming Events</h4>
            <Link to="/events">
              <h5>View All</h5>
            </Link>
          </div>
          <div>
            {events.slice(0, 3).map(upcomingEvent => (
              <Card.Grid key={upcomingEvent.name} style={gridStyle}>
                <div className="show-event-mobile-container">
                  <div className="show-event-date-mobile">
                    <h6>{utils.getMonthString(upcomingEvent.startDateTime)}</h6>
                    <h7>{new Date(upcomingEvent.startDateTime).getDate()}</h7>
                  </div>
                  <div className="show-event-details-mobile">
                    <a className="upcoming-event-name" href="https://www.google.com">
                      {upcomingEvent.name}
                    </a>
                    <h8>
                      {utils.getTimeInPST(upcomingEvent.startDateTime)} -{' '}
                      {utils.getTimeInPST(upcomingEvent.endDateTime)}
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
