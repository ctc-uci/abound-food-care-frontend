import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AFCBackend } from '../../util/utils';
import AvailabilityChart from '../AvailabilityChart/AvailabilityChart';

const ProfileAvailability = ({ userId }) => {
  const [availabilityData, setAvailabilityData] = useState(undefined);

  useEffect(async () => {
    const { data: res } = await AFCBackend.get(`/availability/${userId}`);
    const { availabilities } = res;
    setAvailabilityData(availabilities);
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {/* {renderChart()} */}
          {availabilityData && (
            <AvailabilityChart
              availability={availabilityData}
              setAvailability={setAvailabilityData}
              title="Weekly Availability"
              days={7}
            />
          )}
        </div>
      </div>
    </div>
  );
};

ProfileAvailability.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileAvailability;
