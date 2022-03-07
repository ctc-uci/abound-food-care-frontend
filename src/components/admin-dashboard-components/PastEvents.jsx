import React from 'react';
import './PastEvents.css';
import { Card } from 'antd';

const dummyData = [
  {
    title: 'event1',
    startDate: 'startDate1',
    startTime: 'startTime1',
    endTime: 'endTime1',
    totalHours: 230,
  },
  {
    title: 'event1',
    startDate: 'startDate1',
    startTime: 'startTime1',
    endTime: 'endTime1',
    totalHours: 230,
  },
  {
    title: 'event1',
    startDate: 'startDate1',
    startTime: 'startTime1',
    endTime: 'endTime1',
  },
  {
    title: 'event1',
    startDate: 'startDate1',
    startTime: 'startTime1',
    endTime: 'endTime1',
    totalHours: 230,
  },
];

const PastEvents = () => {
  return (
    <div className="past-events-container">
      <Card title="Past Events">
        {dummyData.map(pastEvent => (
          <Card.Grid key={pastEvent.title} className="past-event">
            <div>
              <a className="past-event-name" href="https://www.google.com">
                {pastEvent.title}
              </a>
              <p className="past-event-start-date">{pastEvent.startDate}</p>
              <p className="past-event-end">
                {pastEvent.startTime} - {pastEvent.endTime}
              </p>
              <p>
                <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Total Hours: </span>
                {pastEvent.totalHours} hrs
              </p>
            </div>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

export default PastEvents;
