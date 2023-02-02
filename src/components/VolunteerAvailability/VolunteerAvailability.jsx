import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Input, Row, Col } from 'antd';
import {
  CarOutlined,
  DownOutlined,
  FilterFilled,
  IdcardOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import HeatMap from '../HeatMap/HeatMap';
import ViewAdminCodes from '../ViewAdminCodes/ViewAdminCodes';
import { AFCBackend, isAdult } from '../../util/utils';
import styles from './VolunteerAvailability.module.css';

const VolunteerAvailability = props => {
  const { handleViewDatabase } = props;

  const [selectedTimeslot, setSelectedTimeslot] = useState({});
  const [availableVolunteers, setAvailableVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [eventInterest, setEventInterest] = useState('All');
  const [driverOption, setDriverOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const getVolunteers = async () => {
    try {
      const { data } = await AFCBackend.get(`/volunteers`, {
        params: {
          driverOption,
          ageOption: 'All',
          eventInterest,
          searchQuery,
        },
      });
      setAvailableVolunteers(
        data
          .map(({ userId, firstName, lastName, birthdate, willingToDrive, availabilities }) => ({
            id: userId,
            firstName,
            lastName,
            birthdate: new Date(birthdate),
            willingToDrive,
            available: !!availabilities,
          }))
          .filter(v => v.available)
          .sort((a, b) =>
            `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`),
          ),
      );
    } catch (err) {
      toast.error(`Error fetching volunteer data: ${err.message}`);
    }
  };

  const getFilteredVolunteers = async ts => {
    try {
      const { day, time } = ts;
      if (ts === {} || !day || !time) {
        const { data } = await AFCBackend.get(`/volunteers`, {
          params: {
            driverOption,
            ageOption: 'All',
            eventInterest,
            searchQuery,
          },
        });
        setFilteredVolunteers(
          data
            .map(({ userId, firstName, lastName, birthdate, willingToDrive, availabilities }) => ({
              id: userId,
              firstName,
              lastName,
              birthdate: new Date(birthdate),
              willingToDrive,
              available: !!availabilities,
            }))
            .filter(v => v.available)
            .sort((a, b) =>
              `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`),
            ),
        );
        return;
      }
      const [start, end] = time;
      const { data } = await AFCBackend.get(
        `volunteers/available/day/${day}/start/${start}/end/${end}`,
        {
          params: {
            driverOption,
            ageOption: 'All',
            eventInterest,
            searchQuery,
          },
        },
      );
      const processedData = data
        .map(e => ({
          id: e.userId,
          firstName: e.firstName,
          lastName: e.lastName,
          birthdate: new Date(e.birthdate),
          willingToDrive: e.willingToDrive,
        }))
        .sort((a, b) =>
          `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`),
        );
      setFilteredVolunteers(processedData);
    } catch (err) {
      toast.error(`Error fetching volunteer data: ${err.message}`);
    }
  };

  const eventInterestMenu = (
    <Menu className={styles.menu}>
      <Menu.Item key="all" onClick={() => setEventInterest('All')}>
        All
      </Menu.Item>
      <Menu.Item key="distribution" onClick={() => setEventInterest('Distributions')}>
        Distributions
      </Menu.Item>
      <Menu.Item key="food" onClick={() => setEventInterest('Food Running')}>
        Food Running
      </Menu.Item>
    </Menu>
  );

  const isDriverMenu = (
    <Menu className={styles.menu}>
      <Menu.Item key="1" onClick={() => setDriverOption('All')}>
        All
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setDriverOption('Can Drive')}>
        Can Drive
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setDriverOption('Cannot Drive')}>
        Cannot Drive
      </Menu.Item>
    </Menu>
  );

  useEffect(async () => {
    const { data } = await AFCBackend.get('/volunteers/');
    const availables = data
      .map(({ userId, firstName, lastName, birthdate, willingToDrive, availabilities }) => ({
        id: userId,
        firstName,
        lastName,
        birthdate: new Date(birthdate),
        willingToDrive,
        available: !!availabilities,
      }))
      .filter(v => v.available)
      .sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`));
    setAvailableVolunteers(availables);
    setFilteredVolunteers(availables);
  }, []);

  useEffect(async () => {
    await getVolunteers();
    await getFilteredVolunteers(selectedTimeslot);
  }, [eventInterest, driverOption, searchQuery]);

  useEffect(async () => {
    await getFilteredVolunteers(selectedTimeslot);
  }, [selectedTimeslot]);

  return (
    <>
      <div className={styles.volunteerAvContainer}>
        <h1 className={styles.volunteerAvTitle}>Volunteer Availabilities</h1>
        <div>
          <div className={styles.volunteerAvLeft}>
            <div>
              <div className={styles.volunteerAvFiltersContainer}>
                <Row className={styles.filterRow} align="middle">
                  <Col span={1}>
                    <FilterFilled className={styles.filterFilledMedium} />
                  </Col>
                  <Col span={12} className={styles.filterSearch}>
                    <Input
                      size="large"
                      placeholder="Search by name, email, role..."
                      className={styles.filterSearchBar}
                      onChange={e => setSearchQuery(e.target.value)}
                      prefix={<SearchOutlined className={styles.filterSearchOutlined} />}
                    />
                  </Col>
                  <Col span={11} className={styles.buttonGroup}>
                    <Button className={styles.dbButton} onClick={handleViewDatabase}>
                      View Database
                    </Button>
                    <Button
                      className={styles.dbButton}
                      icon={<PlusOutlined className={styles.addAdminsPlus} />}
                      type="primary"
                      onClick={() => setIsOpen(true)}
                    >
                      <span className={styles.addAdmins}>Add Admins</span>
                    </Button>
                  </Col>
                </Row>
                <div>
                  <Row className={styles.filterRow} align="middle">
                    <Col span={1} />
                    <Col span={4}>
                      <div className={styles.dropdownBox}>
                        <p className={styles.dropdownLabel}>Event Type Interests</p>
                        <Dropdown overlay={eventInterestMenu}>
                          <Button className={styles.dropdownButton}>
                            <div className={styles.dropdownButtonText}>
                              {eventInterest}
                              <DownOutlined />
                            </div>
                          </Button>
                        </Dropdown>
                      </div>
                    </Col>
                    <Col span={3} />
                    <Col span={4}>
                      <div className={styles.dropdownBox}>
                        <p className={styles.dropdownLabel}>Driving Ability</p>
                        <Dropdown overlay={isDriverMenu}>
                          <Button className={styles.dropdownButton}>
                            <div className={styles.dropdownButtonText}>
                              {driverOption}
                              <DownOutlined />
                            </div>
                          </Button>
                        </Dropdown>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <HeatMap
              {...{
                selectedTimeslot,
                setSelectedTimeslot,
                eventInterest,
                driverOption,
                searchQuery,
              }}
            />
          </div>
          <div className={styles.volunteerAvRight}>
            <div className={styles.volunteerAvRightHeaderContainer}>
              <h2 className={styles.volunteerAvRightHeader}>
                Volunteers ({filteredVolunteers.length}/{availableVolunteers.length})
              </h2>
              <h3 className={styles.volunteerAvRightLegend}>
                <div>
                  <IdcardOutlined className={styles.volRowIcon} /> = 18+
                </div>
                <div>
                  <CarOutlined className={styles.volRowIcon} /> = Driver
                </div>
              </h3>
            </div>
            {/* TODO Add pagination for > 30 available volunteers */}
            {/* TODO Move export button here */}
            {/* TODO Add icons for can drive, event types, etc. */}
            {filteredVolunteers
              .slice(0, 30)
              .map(({ id, firstName, lastName, birthdate, willingToDrive }) => (
                <Link to={`/profile/${id}`} key={`${id}_link`}>
                  <p className={styles.volunteerAvRightName}>
                    {lastName}, {firstName}{' '}
                    {isAdult(birthdate) && <IdcardOutlined className={styles.volRowIcon} />}{' '}
                    {willingToDrive && <CarOutlined className={styles.volRowIcon} />}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <ViewAdminCodes {...{ isOpen, setIsOpen }} />
    </>
  );
};

VolunteerAvailability.propTypes = {
  handleViewDatabase: PropTypes.func.isRequired,
};

export default VolunteerAvailability;
