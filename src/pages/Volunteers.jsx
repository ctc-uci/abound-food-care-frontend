import React from 'react';
import Database from '../components/volunteer-database/Database';
import VolunteerAvailability from '../components/volunteer-availabilities/VolunteerAvailability';

function Volunteers() {
  return (
    <div>
      <p>This is the admin volunteer viewing page</p>
      <Database />
      <VolunteerAvailability />
    </div>
  );
}

export default Volunteers;
