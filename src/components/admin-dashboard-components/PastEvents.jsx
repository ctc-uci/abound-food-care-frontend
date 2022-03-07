import React from 'react';
import './PastEvents.css';
import { Card } from 'antd';

const dummyData = [
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
  },
  {
    title: 'event1',
    startDate: 'startDate1',
    startTime: 'startTime1',
    endTime: 'endTime1',
  },
];

const PastEvents = () => {
  return (
    <div className="past-events-container">
      <Card title="Past Events">
        {dummyData.map(pastEvent => (
          <Card.Grid key={pastEvent.title} className="past-event">
            <div>
              <a href="https://www.google.com">{pastEvent.title}</a>
              <p>{pastEvent.startDate}</p>
              <p>
                {pastEvent.startTime} - {pastEvent.endTime}
              </p>
            </div>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

export default PastEvents;
