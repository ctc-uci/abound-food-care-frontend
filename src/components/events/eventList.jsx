import './EventList.css';
import { Card } from 'antd';
import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import utils from '../../util/utils';

const EventList = ({ title, events }) => {
  return (
    <div className="event-list">
      <h1 className="list-title">{title}</h1>
      {events.map(event => {
        const startDate = new Date(event.startDatetime);
        return (
          <Card key={event.id}>
            <div className="event-list-card">
              <div className="event-date">
                <p className="month"> {moment(startDate).format('MMM')}</p>
                <p className="date">{new Date(event.startDatetime).getDate()}</p>
              </div>
              <div className="right-section">
                <p className="event-name">{event.name}</p>
                <p className="event-time">
                  {utils.getTimeInPST(event.startDatetime)}-{utils.getTimeInPST(event.endDatetime)}{' '}
                  (PST)
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

EventList.propTypes = {
  title: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.obj),
};

EventList.defaultProps = {
  title: '',
  events: [],
};

export default EventList;
