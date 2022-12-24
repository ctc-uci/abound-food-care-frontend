import React, { useState } from 'react';
import Database from '../components/Database/Database';
import VolunteerAvailability from '../components/VolunteerAvailability/VolunteerAvailability';

const Volunteers = () => {
  const [viewDatabase, setViewDatabase] = useState(false);

  const handleViewDatabase = () => {
    setViewDatabase(true);
  };

  const handleHideDatabase = () => {
    setViewDatabase(false);
  };

  return (
    <div>
      {viewDatabase ? (
        <Database handleHideDatabase={handleHideDatabase} />
      ) : (
        <VolunteerAvailability handleViewDatabase={handleViewDatabase} />
      )}
    </div>
  );
};

export default Volunteers;
