import './EventList.css';
import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { getTimeInPST } from '../../../util/utils';

const EventList = ({ title, events, showViewAll }) => {
  const renderViewAllLink = () => {
    return (
      <Link id="view-all-link" to="/events">
        View All
      </Link>
    );
  };

  return (
    <div className="event-list">
      <div className="list-header">
        <h1 className="list-title">{title}</h1>
        {showViewAll && renderViewAllLink()}
      </div>
      {events.map(event => {
        const startDate = new Date(event.startDatetime);
        return (
          <Card key={event.eventId}>
            <div className="event-list-card">
              <div className="event-date">
                <p className="month"> {moment(startDate).format('MMM')}</p>
                <p className="date">{new Date(event.startDatetime).getDate()}</p>
              </div>
              <div className="right-section">
                <p className="event-name">{event.name}</p>
                <p className="event-time">
                  {getTimeInPST(event.startDatetime)}-{getTimeInPST(event.endDatetime)} (PST)
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
  // eslint-disable-next-line react/forbid-prop-types
  events: PropTypes.arrayOf(PropTypes.any),
  showViewAll: PropTypes.bool,
};

EventList.defaultProps = {
  title: '',
  events: [],
  showViewAll: false,
};

export default EventList;
