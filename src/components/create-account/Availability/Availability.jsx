import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ScheduleSelector from 'react-schedule-selector';

const Availability = ({ availability, setAvailability }) => {

};

Availability.propTypes = {
  availabilityTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  setAvailability: PropTypes.func.isRequired,
};

export default Availability;
