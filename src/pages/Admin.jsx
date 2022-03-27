import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Database from '../components/volunteer-database/Database';
import './Admin.css';
import VolunteerAvailability from '../components/volunteer-availabilities/VolunteerAvailability';

function Admin() {
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
}

export default Admin;
