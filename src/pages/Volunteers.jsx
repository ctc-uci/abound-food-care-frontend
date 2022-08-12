import React, { useState } from 'react';
import Database from '../components/volunteer-database/Database';
import './Volunteers.css';
import VolunteerAvailability from '../components/volunteer-availabilities/VolunteerAvailability';

const Volunteers = () => {
  const [viewDatabase, setViewDatabase] = useState(true);

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
