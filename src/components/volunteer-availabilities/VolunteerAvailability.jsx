import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './VolunteerAvailability.module.css';
import HeatMap from './HeatMap';
import { AFCBackend } from '../../util/utils';

const VolunteerAvailability = props => {
  const { handleViewDatabase } = props;
  const VOLUNTEERS_DUMMY_DATA = [
    {
      id: 0,
      name: 'John Stones',
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

  const showDatabase = () => {
    handleViewDatabase();
  };
  const [volunteers, setVolunteers] = useState([]);
  const [availableVolunteers, setAvailableVolunteers] = useState([]);
  const [eventInterest, setEventInterest] = useState('All');
  const [driverOption, setDriverOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setVolunteers(VOLUNTEERS_DUMMY_DATA);
    setAvailableVolunteers(VOLUNTEERS_DUMMY_DATA.filter(v => v.available));
  }, []);

  // useEffect(async () => {
  //   try {
  //     let { data } = await AFCBackend.get(`/volunteers/available/`, {
  //       params: {
  //         driverOption,
  //         eventInterest,
  //         searchQuery,
  //       },
  //     });
  //     console.log(data);
  //     data = data.map(user => `${user.firstName} ${user.lastName}`);
  //     console.log(data);
  //     setAvailableVolunteers(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [eventInterest, driverOption, searchQuery]);

  const eventInterestMenu = (
    <Menu className={styles.menu}>
      <Menu.Item key="all" className={styles.menu} onClick={() => setEventInterest('All')}>
        All
      </Menu.Item>
      <Menu.Item
        key="distribution"
        className={styles.menu}
        onClick={() => setEventInterest('Distributions')}
      >
        Distributions
      </Menu.Item>
      <Menu.Item
        key="food"
        className={styles.menu}
        onClick={() => setEventInterest('Food Running')}
      >
        Food Running
      </Menu.Item>
    </Menu>
  );

  const isDriverMenu = (
    <Menu className={styles.menu}>
      <Menu.Item key="1" className={styles.menu} onClick={() => setDriverOption('All')}>
        All
      </Menu.Item>
      <Menu.Item key="2" className={styles.menu} onClick={() => setDriverOption('Can Drive')}>
        Can Drive
      </Menu.Item>
      <Menu.Item key="3" className={styles.menu} onClick={() => setDriverOption('Cannot Drive')}>
        Cannot Drive
      </Menu.Item>
    </Menu>
  );

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
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="right-align">
              <button type="button" onClick={showDatabase}>
                View Database
              </button>
              <button type="button">Export</button>
              <button type="button" style={{ backgroundColor: '#115740' }} id="add-user-btn">
                + Add User
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="event-types" className={styles['dropdown-label']}>
              Event Types
              <br />
              <Dropdown overlay={eventInterestMenu}>
                <Button className={styles['dropdown-button']}>
                  <Space className={styles['dropdown-button-text']}>
                    {eventInterest}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </label>
            <label htmlFor="drivers" className={styles['dropdown-label']}>
              Driving Ability
              <br />
              <Dropdown overlay={isDriverMenu}>
                <Button className={styles['dropdown-button']}>
                  <Space className={styles['dropdown-button-text']}>
                    {driverOption}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </label>
          </div>
        </div>
        <HeatMap
          eventInterest={eventInterest}
          driverOption={driverOption}
          searchQuery={searchQuery}
          availableVolunteers={availableVolunteers}
        />
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
    </div>
  );
};

VolunteerAvailability.propTypes = {
  handleViewDatabase: PropTypes.func.isRequired,
};

export default VolunteerAvailability;
