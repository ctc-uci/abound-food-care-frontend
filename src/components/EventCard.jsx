import React from 'react';
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

const EventCard = ({
  eventTitle,
  eventDate,
  eventStarttime,
  eventEndtime,
  numVolunteers,
  eventCapacity,
}) => {
  return (
    <div>
      <Card title={eventTitle} borderd="false">
        <Title level={5}>{eventDate}</Title>
        <Title level={5}>
          {eventStarttime} - {eventEndtime}
        </Title>
        <p style={{ color: 'GrayText' }}>
          {numVolunteers}/{eventCapacity} Volunteers
        </p>
      </Card>
    </div>
  );
};

EventCard.propTypes = {
  eventTitle: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventStarttime: PropTypes.string.isRequired,
  eventEndtime: PropTypes.string.isRequired,
  numVolunteers: PropTypes.number.isRequired,
  eventCapacity: PropTypes.number.isRequired,
};

export default EventCard;
