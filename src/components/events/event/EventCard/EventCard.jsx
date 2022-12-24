import { React, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { AFCBackend } from '../../../../util/utils';
import styles from './EventCard.module.css';

const EventCard = ({ id, name, type, startDateTime, endDateTime, volunteerCapacity }) => {
  const [numVolunteers, setNumVolunteers] = useState(0);
  const [loading, setLoading] = useState(false);

  // get date and time
  const eventStartDateObj = new Date(startDateTime);
  const eventEndDateObj = new Date(endDateTime);
  const eventDate = `${eventStartDateObj.toLocaleString('en-us', {
    month: 'long',
  })} ${eventStartDateObj.getDate()}, ${eventStartDateObj.getFullYear()}`;
  const eventStarttime = `${
    eventStartDateObj.getHours() === 0 ? 12 : eventStartDateObj.getHours() % 12
  }:${
    eventStartDateObj.getMinutes() > 9
      ? eventStartDateObj.getMinutes()
      : `0${eventStartDateObj.getMinutes()}`
  } ${eventStartDateObj.getHours() > 11 ? 'AM' : 'PM'}`;
  const eventEndtime = `${
    eventEndDateObj.getHours() === 0 ? 12 : eventEndDateObj.getHours() % 12
  }:${
    eventEndDateObj.getMinutes() > 9
      ? eventEndDateObj.getMinutes()
      : `0${eventEndDateObj.getMinutes()}`
  } ${eventEndDateObj.getHours() > 11 ? 'AM' : 'PM'}`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: volunteerResponse } = await AFCBackend.get(`/volunteers/events/${id}`);
      if (volunteerResponse.status === 200 && volunteerResponse.length > 0) {
        setNumVolunteers(volunteerResponse.userIds.length);
      }
      setLoading(false);
    } catch (err) {
      toast.error(`Error fetching data for event ${name}`);
    }
  };

  const mapCardType = () => {
    const backgroundColors = {
      Distribution: '#009A44',
      'Food Running': '#FFA500',
      Other: '#808080',
    };
    return (
      <Card
        className={styles['event-card']}
        title={name}
        bordered
        hoverable
        headStyle={{
          backgroundColor: backgroundColors[type] ?? backgroundColors.Other,
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1.2',
        }}
        actions={[<EditOutlined key="edit" />]}
      >
        <div className={styles.eventCardInner}>
          <span className={styles['event-date-time']}>
            <p className={styles.eventDate}>{eventDate}</p>
            <p className={styles.eventTime}>
              {eventStarttime} - {eventEndtime}
            </p>
          </span>
          <p className={styles['num-volunteers']}>
            {numVolunteers}/{volunteerCapacity} Volunteer{volunteerCapacity === 1 ? '' : 's'}
          </p>
        </div>
      </Card>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !loading && mapCardType();
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  startDateTime: PropTypes.string.isRequired,
  endDateTime: PropTypes.string.isRequired,
  volunteerCapacity: PropTypes.number.isRequired,
};

export default EventCard;
