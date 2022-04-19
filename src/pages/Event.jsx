import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import EventPage from '../components/events/event/EventPage';

const Event = ({ isAdmin }) => {
  return <EventPage isAdmin={isAdmin} />;
};

Event.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Event;
