import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Database from '../components/volunteer-database/Database';
import './Volunteers.css';
import VolunteerAvailability from '../components/volunteer-availabilities/VolunteerAvailability';
import Profile from './Profile';
import useViewPort from '../common/useViewPort';

function Volunteers() {
  const { width } = useViewPort();
  const breakpoint = 720;
  const [viewDatabase, setViewDatabase] = useState(true);

  const handleViewDatabase = () => {
    setViewDatabase(true);
  };

  const handleHideDatabase = () => {
    setViewDatabase(false);
  };

  return (
    <div>
      {width > breakpoint ? (
        <>
          {viewDatabase ? (
            <Database handleHideDatabase={handleHideDatabase} />
          ) : (
            <VolunteerAvailability handleViewDatabase={handleViewDatabase} />
          )}
          {/* TODO: should only render profile when user selected from database^ */}
          <Profile />
        </>
      ) : (
        <>
          <Database handleHideDatabase={handleHideDatabase} />
        </>
      )}
    </div>
  );
}

export default Volunteers;
