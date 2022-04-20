import React, { useState, useEffect } from 'react';
import './PastEvents.css';
import { Card } from 'antd';
import axios from 'axios';
import utils from '../../util/utils';
import useViewPort from '../../common/useViewPort';

const PastEvents = () => {
  const [events, setEvents] = useState([]);
  const { width } = useViewPort();
  const breakpoint = 720;
  useEffect(async () => {
    const response = await axios.get('http://localhost:3001/events/past');
    await setEvents(response.data);
  }, []);

  const gridStyle = {
    width: '100%',
    textAlign: 'center',
    marginTop: 12,
    padding: '0px 0px 0px 0px',
  };

  return (
    <div>
      {width > breakpoint ? (
        <>
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
                      {utils.getMonthString(pastEvent.startDateTime)}{' '}
                      {new Date(pastEvent.startDateTime).getDate()},{' '}
                      {new Date(pastEvent.startDateTime).getFullYear()}
                    </p>
                    <p className="past-event-end">
                      {utils.getTimeInPST(pastEvent.startDateTime)} -{' '}
                      {utils.getTimeInPST(pastEvent.endDateTime)}
                    </p>
                    <p>
                      <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Total Hours: </span>
                      {utils.getHourDiff(pastEvent.startDateTime, pastEvent.endDateTime)} hrs
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
          <div className="mobile-header">
            <h4>Past Events</h4>
            {/* Need to connect a-tag to all the evnets */}
            <a href="https://www.google.com">
              <h5>View All</h5>
            </a>
          </div>
          {events.slice(0, 1).map(pastEvent => (
            <Card.Grid key={pastEvent.name} style={gridStyle}>
              <div className="show-past-event-mobile-container">
                <div className="show-past-event-date-mobile">
                  {/* Need to remove March, I just put it in there for time being for testing purposes */}
                  <h6>March {utils.getMonthString(pastEvent.startDateTime)}</h6>
                  <h7>{new Date(pastEvent.startDateTime).getDate()}</h7>
                </div>
                <div className="show-past-event-details-mobile">
                  <a className="past-event-name" href="https://www.google.com">
                    {pastEvent.name}
                  </a>
                  <h8>
                    {utils.getTimeInPST(pastEvent.startDateTime)} -{' '}
                    {utils.getTimeInPST(pastEvent.endDateTime)}
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
