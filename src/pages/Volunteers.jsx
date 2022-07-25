import React, { useState } from 'react';
import Database from '../components/volunteer-database/Database';
import './Volunteers.css';
import VolunteerAvailability from '../components/volunteer-availabilities/VolunteerAvailability';
import Profile from './Profile';

function Volunteers() {
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
      {/* TODO: should only render profile when user selected from database^ */}
      <Profile />
    </div>
  );
}

export default Volunteers;
