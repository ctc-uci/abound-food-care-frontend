import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import ScheduleSelector from 'react-schedule-selector';
import { startOfWeek } from 'date-fns';
import { convertDatesToSlots } from '../../../util/utils';

import styles from './Availability.module.css';

const { Text } = Typography;

const Availability = ({ availability, setAvailability, incrementFormStep, decrementFormStep }) => {
  const [av, setAv] = useState([]);
  const [error, setError] = useState('');

  const onBack = () => {
    setAvailability(convertDatesToSlots(av));
    decrementFormStep();
    toast.dismiss();
  };

  const onNext = () => {
    if (av.length === 0) {
      setError('Please select at least one availability slot.');
      toast.error('Please select at least one availability slot.');
      return;
    }
    setAvailability(convertDatesToSlots(av));
    setError('');
    incrementFormStep();
    toast.dismiss();
  };

  useEffect(() => {
    if (availability) {
      setAv(availability);
    }
  }, []);

  useEffect(() => {
    if (av.length > 0) {
      setError('');
    }
  }, [av]);

  return (
    <>
      <h1 className={styles.heading}>Availability</h1>
      <p className={styles.instructions}>
        Please select your availability by clicking or dragging over tiles on the chart. A{' '}
        <span className={styles.avGreen}>dark green cell</span> indicates marked availability.
      </p>
      <div className={styles.avContainer}>
        <ScheduleSelector
          selection={av}
          selectionScheme="square"
          onChange={newDates => setAv(newDates)}
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
              className={styles.avGridCell}
              style={{ backgroundColor: `${selected ? '#115740' : '#F6FCFC'}` }}
              ref={refSetter}
              role="button"
              tabIndex="0"
            >
              {' '}
            </div>
          )}
        />
      </div>
      <Text type="danger">{error}</Text>
      <div className={styles.navButtons}>
        <Button className={styles.previousButton} onClick={onBack}>
          Back
        </Button>
        <Button type="primary" onClick={onNext}>
          Next
        </Button>
      </div>
    </>
  );
};

Availability.propTypes = {
  availability: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  setAvailability: PropTypes.func.isRequired,
  incrementFormStep: PropTypes.func.isRequired,
  decrementFormStep: PropTypes.func.isRequired,
};

export default Availability;
