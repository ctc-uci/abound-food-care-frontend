import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './eventCard.css';
import 'antd/dist/antd.variable.min.css';

const EventCard = ({ id, name, type, startDateTime, endDateTime, volunteerCapacity, isAdmin }) => {
  const [numVolunteers, setNumVolunteers] = useState(0);
  const [loading, setLoading] = useState(false);

  // get date and time
  const eventStartDateObj = new Date(startDateTime);
  const eventEndDateObj = new Date(endDateTime);
  const eventDate = `${eventStartDateObj.toLocaleString('en-us', {
    month: 'long',
  })} ${eventStartDateObj.getDate()}, ${eventStartDateObj.getFullYear()}`;
  const eventStarttime = `${eventStartDateObj.getHours()}:${eventStartDateObj.getMinutes()}`;
  const eventEndtime = `${eventEndDateObj.getHours()}:${eventEndDateObj.getMinutes()}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: volunteerResponse } = await axios.get(
          `http://localhost:3001/volunteers/events/${id}`,
        );
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

  return (
    <div>
      {loading && <div>Loading Event Data...</div>}
      {!loading && isAdmin && (
        <>
          {type === 'distribution' && (
            <Card
              className="event-card"
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#009A44',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
              actions={[<EditOutlined key="edit" />]}
            >
              <p className="event-date-time">
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className="num-volunteers" style={{ color: '#BFBFBF' }}>
                {numVolunteers}/{volunteerCapacity} Volunteers Signed Up
              </p>
            </Card>
          )}
          {type === 'food' && (
            <Card
              className="event-card"
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#FFA500',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
              actions={[<EditOutlined key="edit" />]}
            >
              <p className="event-date-time">
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className="num-volunteers" style={{ color: '#BFBFBF' }}>
                {numVolunteers}/{volunteerCapacity} Volunteers Signed Up
              </p>
            </Card>
          )}
          {type !== 'distribution' && type !== 'food' && (
            <Card
              className="event-card"
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#808080',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
              actions={[<EditOutlined key="edit" />]}
            >
              <p className="event-date-time">
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className="num-volunteers" style={{ color: '#BFBFBF' }}>
                {numVolunteers}/{volunteerCapacity} Volunteers Signed Up
              </p>
            </Card>
          )}
        </>
      )}
      {!loading && !isAdmin && (
        <>
          {type === 'distribution' && (
            <Card
              className="event-card"
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#009A44',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              <p className="event-date-time">
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className="num-volunteers" style={{ color: '#BFBFBF' }}>
                {numVolunteers}/{volunteerCapacity} Volunteers Signed Up
              </p>
            </Card>
          )}
          {type === 'food' && (
            <Card
              className="event-card"
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#FFA500',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              <p className="event-date-time">
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className="num-volunteers" style={{ color: '#BFBFBF' }}>
                {numVolunteers}/{volunteerCapacity} Volunteers Signed Up
              </p>
            </Card>
          )}
          {type !== 'distribution' && type !== 'food' && (
            <Card
              className="event-card"
              title={name}
              bordered
              hoverable
              headStyle={{
                backgroundColor: '#808080',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              <p className="event-date-time">
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </p>
              <p className="num-volunteers" style={{ color: '#BFBFBF' }}>
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
  isAdmin: PropTypes.bool.isRequired,
};

export default EventCard;
