import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import HeatMap from '../components/HeatMap';
import Database from '../components/Database';
import AdminDashboard from '../components/AdminDashboard';
import './Admin.css';

function Admin() {
  const VOLUNTEERS_DUMMY_DATA = [
    {
      id: 0,
      name: 'John Stone',
      available: true,
    },
    {
      id: 1,
      name: 'Ponnappa Priya',
      available: true,
    },
    {
      id: 2,
      name: 'Mia Wong',
      available: true,
    },
    {
      id: 3,
      name: 'Peter Stanbridge',
      available: true,
    },
    {
      id: 4,
      name: 'Natalie Lee-Walsh',
      available: true,
    },
    {
      id: 5,
      name: 'Ang Li',
      available: true,
    },
    {
      id: 6,
      name: 'Nguta Ithya',
      available: true,
    },
    {
      id: 7,
      name: 'John Stone',
      available: true,
    },
    {
      id: 8,
      name: 'Ponnappa Priya',
      available: true,
    },
    {
      id: 9,
      name: 'Mia Wong',
      available: true,
    },
    {
      id: 10,
      name: 'Peter Stanbridge',
      available: true,
    },
    {
      id: 11,
      name: 'Natalie Lee-Walsh',
      available: true,
    },
    {
      id: 12,
      name: 'Ang Li',
      available: true,
    },
    {
      id: 13,
      name: 'Nguta Ithya',
      available: true,
    },
    {
      id: 14,
      name: 'John Stone',
      available: true,
    },
    {
      id: 15,
      name: 'Ponnappa Priya',
      available: true,
    },
    {
      id: 16,
      name: 'Mia Wong',
      available: true,
    },
    {
      id: 17,
      name: 'Peter Stanbridge',
      available: true,
    },
    {
      id: 18,
      name: 'Natalie Lee-Walsh',
      available: true,
    },
    {
      id: 19,
      name: 'Ang Li',
      available: true,
    },
    {
      id: 20,
      name: 'Nguta Ithya',
      available: true,
    },
    {
      id: 21,
      name: 'John Stone',
      available: false,
    },
    {
      id: 22,
      name: 'Ponnappa Priya',
      available: false,
    },
    {
      id: 23,
      name: 'Mia Wong',
      available: false,
    },
    {
      id: 24,
      name: 'Peter Stanbridge',
      available: false,
    },
    {
      id: 25,
      name: 'Natalie Lee-Walsh',
      available: false,
    },
    {
      id: 26,
      name: 'Ang Li',
      available: false,
    },
  ];

  const [volunteers, setVolunteers] = useState([]);
  const [availableVolunteers, setAvailableVolunteers] = useState([]);

  useEffect(() => {
    setVolunteers(VOLUNTEERS_DUMMY_DATA);
    setAvailableVolunteers(VOLUNTEERS_DUMMY_DATA.filter(v => v.available));
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
              <button type="button">View Database</button>
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
        {availableVolunteers.map(v => {
          const nameArr = v.name.split(' ');
          const lastName = nameArr[1];
          const firstName = nameArr[0];
          return (
            <p key={v.id}>
              {lastName}, {firstName}
            </p>
          );
        })}
      </div>
      <div>
        <Database />
      </div>
      <div>
        <AdminDashboard />
      </div>
    </div>
  );
}

export default Admin;
