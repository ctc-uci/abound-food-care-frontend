import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './eventCard.css';
import 'antd/dist/antd.variable.min.css';

const { Title } = Typography;

const EventCard = ({ id, name, type, startDateTime, endDateTime, volunteerCapacity }) => {
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
          `http://localhost:3001/volunteers/${id}`,
        );
        setNumVolunteers(volunteerResponse.count);
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
      {!loading && (
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
              <Title className="event-date-time" level={5}>
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </Title>
              <p className="num-volunteers" style={{ color: 'GrayText' }}>
                {numVolunteers}/{volunteerCapacity} Volunteers
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
              <Title className="event-date-time" level={5}>
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </Title>
              <p className="num-volunteers" style={{ color: 'GrayText' }}>
                {numVolunteers}/{volunteerCapacity} Volunteers
              </p>
            </Card>
          )}
          {(type === 'other' || type === null) && (
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
              <Title className="event-date-time" level={5}>
                {eventDate}
                <br />
                {eventStarttime} - {eventEndtime}
              </Title>
              <p className="num-volunteers" style={{ color: 'GrayText' }}>
                {numVolunteers}/{volunteerCapacity} Volunteers
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
