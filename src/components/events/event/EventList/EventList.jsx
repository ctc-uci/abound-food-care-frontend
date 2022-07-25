import { Card } from 'antd';
import React from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { getTimeInPST } from '../../../../util/utils';
import styles from './EventList.module.css';

const EventList = ({ title, events }) => {
  return (
    <div className={styles['event-list']}>
      <h1 className={styles['list-title']}>{title}</h1>
      {events.map(event => {
        const startDate = new Date(event.startDatetime);
        return (
          <Card key={event.id}>
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
