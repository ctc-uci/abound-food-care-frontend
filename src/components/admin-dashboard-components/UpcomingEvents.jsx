import './UpcomingEvents.css';
import { Card } from 'antd';
import React from 'react';

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
const UpcomingEvents = () => {
  return (
    <Card className="upcoming-events" title="Upcoming Events">
      {dummyData.map(upcomingEvent => (
        <Card.Grid key={upcomingEvent.title} className="upcoming-event">
          <div>
            <a href="https://www.google.com">{upcomingEvent.title}</a>
            <p>{upcomingEvent.startDate}</p>
            <p>
              {upcomingEvent.startTime} - {upcomingEvent.endTime}
            </p>
          </div>
        </Card.Grid>
      ))}
    </Card>
  );
};

export default UpcomingEvents;
