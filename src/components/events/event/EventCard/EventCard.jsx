import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    eventStartDateObj.getHours() > 9
      ? eventStartDateObj.getHours()
      : `0${eventStartDateObj.getHours()}`
  }:${
    eventStartDateObj.getMinutes() > 9
      ? eventStartDateObj.getMinutes()
      : `${eventStartDateObj.getMinutes()}0`
  }`;
  const eventEndtime = `${
    eventEndDateObj.getHours() > 9 ? eventEndDateObj.getHours() : `0${eventEndDateObj.getHours()}`
  }:${
    eventEndDateObj.getMinutes() > 9
      ? eventEndDateObj.getMinutes()
      : `${eventEndDateObj.getMinutes()}0`
  }`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: volunteerResponse } = await AFCBackend.get(`/volunteers/events/${id}`);
        if (volunteerResponse.status === 200 && volunteerResponse.length > 0) {
          setNumVolunteers(volunteerResponse.userIds.length);
        }
      } catch (err) {
        console.error(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getEditLink = () => {
    return (
      <Link to={`/events/edit/${id}`}>
        <EditOutlined key="edit" />
      </Link>
    );
  };

  return (
    <div>
      {loading && <div>Loading Event Data...</div>}
      {!loading && (
        <>
          {type === 'Distribution' && (
            <Card
              className={styles['event-card']}
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#009A44',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
              actions={[getEditLink()]}
            >
              <p className={styles['event-date-time']}>
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className={styles['num-volunteers']}>
                {numVolunteers}/{volunteerCapacity} Volunteers Signed Up
              </p>
            </Card>
          )}
          {type === 'Food Running' && (
            <Card
              className={styles['event-card']}
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#FFA500',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
              actions={[getEditLink()]}
            >
              <p className={styles['event-date-time']}>
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className={styles['num-volunteers']}>
                {numVolunteers}/{volunteerCapacity} Volunteers Signed Up
              </p>
            </Card>
          )}
          {type !== 'Distribution' && type !== 'Food Running' && (
            <Card
              className={styles['event-card']}
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#808080',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
              actions={[getEditLink()]}
            >
              <p className={styles['event-date-time']}>
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className={styles['num-volunteers']}>
                {numVolunteers}/{volunteerCapacity} Volunteers Signed Up
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
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
