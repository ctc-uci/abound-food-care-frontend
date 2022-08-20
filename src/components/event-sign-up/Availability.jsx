import React from 'react';
import { PropTypes } from 'prop-types';
import AvailabilityChart from '../AvailabilityChart/AvailabilityChart';

const Availability = ({ availability, setAvailability, dayOfWeekIdx }) => {
  return (
    <>
      <AvailabilityChart
        availability={availability}
        setAvailability={setAvailability}
        days={1}
        currDayOfWeek={dayOfWeekIdx}
      />
    </>
  );
};

Availability.propTypes = {
  availability: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setAvailability: PropTypes.func.isRequired,
  dayOfWeekIdx: PropTypes.number.isRequired,
};

export default Availability;
