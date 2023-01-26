import React from 'react';
import PropTypes from 'prop-types';
import ScheduleSelector from 'react-schedule-selector';
import { startOfWeek } from 'date-fns';

import styles from './Availability.module.css';

const Availability = ({ availability, setAvailability }) => {
  return (
    <ScheduleSelector
      selection={availability}
      selectionScheme="square"
      onChange={newDates => setAvailability(newDates)}
      // onChange={
      //   isEditable ? newDates => setAvailabilityData(newDates) : () => editWithoutEditable()
      // }
      startDate={startOfWeek(new Date())}
      numDays={7}
      minTime={0}
      maxTime={24}
      hourlyChunks={2}
      timeFormat="h:mm A"
      dateFormat="ddd"
      columnGap="4px"
      rowGap="2px"
      renderDateCell={(time, selected, refSetter) => (
        <div
          // className={styles.avGridCell}
          style={{ backgroundColor: `${selected ? '#115740' : '#F6FCFC'}` }}
          ref={refSetter}
          role="button"
          tabIndex="0"
        >
          {' '}
        </div>
      )}
    />
  );
};

Availability.propTypes = {
  availability: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  setAvailability: PropTypes.func.isRequired,
};

export default Availability;
