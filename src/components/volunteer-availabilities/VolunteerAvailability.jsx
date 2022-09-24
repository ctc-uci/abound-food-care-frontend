import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeatMap from './HeatMap';
import { AFCBackend } from '../../util/utils';

const VolunteerAvailability = ({ handleViewDatabase }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [availableVolunteers, setAvailableVolunteers] = useState([]);

  useEffect(async () => {
    const { data } = await AFCBackend.get('/volunteers/');
    const mappedVolunteers = data.map(({ userId, firstName, lastName, availabilities }) => ({
      id: userId,
      firstName,
      lastName,
      available: !!availabilities,
    }));
    setVolunteers(mappedVolunteers);
    setAvailableVolunteers(mappedVolunteers.filter(v => v.available));
  }, []);

  return (
    <div className="volunteer-availabilities">
      <div>
        <h1>Volunteer Availabilities</h1>
        <div className="filter-availabilities">
          <div>
            <img src="filter-icon.png" alt="Filter icon" />
            <input
              type="search"
              placeholder="Search by name, email, role..."
              id="search-volunteers"
            />
            <div className="right-align">
              <button type="button" onClick={handleViewDatabase}>
                View Database
              </button>
              <button type="button">Export</button>
              <button type="button" style={{ backgroundColor: '#115740' }} id="add-user-btn">
                + Add User
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="event-types">
              Event Types
              <br />
              <select name="event-types" id="event-types">
                <option value="all">All</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </label>
            <label htmlFor="drivers">
              Drivers?
              <br />
              <select name="drivers" id="drivers">
                <option value="can-drive">Can Drive</option>
                <option value="cant-drive">Can&apos;t Drive</option>
              </select>
            </label>
          </div>
        </div>
        <HeatMap />
      </div>
      <div className="available-volunteers">
        <h2>
          Volunteers ({availableVolunteers.length}/{volunteers.length})
        </h2>
        {availableVolunteers.map(({ id, firstName, lastName }) => (
          <p key={id}>
            {lastName}, {firstName}
          </p>
        ))}
      </div>
    </div>
  );
};

VolunteerAvailability.propTypes = {
  handleViewDatabase: PropTypes.func.isRequired,
};

export default VolunteerAvailability;
