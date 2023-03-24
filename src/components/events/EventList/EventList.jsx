import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { PropTypes } from 'prop-types';
import { getTimeInPST } from '../../../util/utils';

import styles from './EventList.module.css';

const EventList = ({ title, events, showViewAll }) => (
  <div className={styles['event-list']}>
    <div className={styles['list-header']}>
      <h1 className={styles['list-title']}>{title}</h1>
      {showViewAll && (
        <Link className={styles['view-all-link']} to="/events">
          View All
        </Link>
      )}
    </div>
    {events.map(event => {
      const startDate = new Date(event.startDatetime);
      return (
        <Card key={event.eventId} className={styles.event}>
          <div className={styles['event-list-card']}>
            <div className={styles['event-date']}>
              <p className={styles.month}> {moment(startDate).format('MMM')}</p>
              <p className={styles.date}>{new Date(event.startDatetime).getDate()}</p>
            </div>
            <div className={styles['right-section']}>
              <p className={styles['event-name']}>{event.name}</p>
              <p className={styles['event-time']}>
                {getTimeInPST(event.startDatetime)}-{getTimeInPST(event.endDatetime)} (PST)
              </p>
            </div>
          </div>
        </Card>
      );
    })}
  </div>
);

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
