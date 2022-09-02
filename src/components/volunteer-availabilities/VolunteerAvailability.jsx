import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import HeatMap from './HeatMap';
import { AFCBackend } from '../../util/utils';
import styles from './VolunteerAvailability.module.css';

const VolunteerAvailability = props => {
  const { handleViewDatabase } = props;

  const showDatabase = () => {
    handleViewDatabase();
  };
  const [totalVolunteers, setTotalVolunteers] = useState(-1);
  const [availableVolunteers, setAvailableVolunteers] = useState([]);
  const [eventInterest, setEventInterest] = useState('All');
  const [driverOption, setDriverOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getVolunteers = async () => {
    try {
      const { data } = await AFCBackend.get(`/volunteers/`, {
        params: {
          driverOption,
          ageOption: 'All',
          eventInterest,
          searchQuery,
        },
      });
      setAvailableVolunteers(data);

      // sets the total # volunteers only the first time
      if (totalVolunteers === -1) {
        setTotalVolunteers(data.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVolunteers();
  }, [eventInterest, driverOption, searchQuery]);

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
          Volunteers ({availableVolunteers.length}/{totalVolunteers})
        </h2>
        {availableVolunteers.map(v => {
          return (
            <p key={v.userId}>
              {v.firstName} {v.lastName}
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
