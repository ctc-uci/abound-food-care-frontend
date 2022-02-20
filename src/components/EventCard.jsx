import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

const EventCard = ({ id, name, startDateTime, endDateTime, volunteerCapacity }) => {
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
        setNumVolunteers(volunteerResponse.length);
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
          <Card title={name} borderd="false">
            <Title level={5}>{eventDate}</Title>
            <Title level={5}>
              {eventStarttime} - {eventEndtime}
            </Title>
            <p style={{ color: 'GrayText' }}>
              {numVolunteers}/{volunteerCapacity} Volunteers
            </p>
          </Card>
        </>
      )}
    </div>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  startDateTime: PropTypes.string.isRequired,
  endDateTime: PropTypes.string.isRequired,
  volunteerCapacity: PropTypes.number.isRequired,
};

export default EventCard;
