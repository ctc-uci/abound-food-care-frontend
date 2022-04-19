import React from 'react';
import PropTypes from 'prop-types';
import EventDashboard from '../components/events/eventDashboard/EventDashboard';
import 'antd/dist/antd.css';

const Events = ({ isAdmin }) => {
  return (
    <div>
      <EventDashboard isAdmin={isAdmin} />
    </div>
  );
};

Events.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Events;
