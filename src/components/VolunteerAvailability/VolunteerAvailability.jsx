import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Input, Row, Col } from 'antd';
import { DownOutlined, FilterFilled, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import HeatMap from './HeatMap';
import ViewAdminCodes from '../ViewAdminCodes/ViewAdminCodes';
import { AFCBackend } from '../../util/utils';
import styles from './VolunteerAvailability.module.css';

const VolunteerAvailability = props => {
  const { handleViewDatabase } = props;

  const [selectedTimeslot, setSelectedTimeslot] = useState({});
  const [volunteers, setVolunteers] = useState([]);
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
      setAvailableVolunteers(data);
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
    const mappedVolunteers = data.map(({ userId, firstName, lastName, availabilities }) => ({
      id: userId,
      firstName,
      lastName,
      available: !!availabilities,
    }));
    setVolunteers(mappedVolunteers);
    const availables = mappedVolunteers.filter(v => v.available);
    setAvailableVolunteers(availables);
    setFilteredVolunteers(availables);
  }, []);

  useEffect(() => {
    getVolunteers();
  }, [eventInterest, driverOption, searchQuery]);

  useEffect(async () => {
    const { day, time } = selectedTimeslot;
    if (selectedTimeslot === {} || !day || !time) {
      setFilteredVolunteers(availableVolunteers);
      return;
    }
    const [start, end] = time;
    const { data } = await AFCBackend.get(
      `volunteers/available/day/${day}/start/${start}/end/${end}`,
    );
    const processedData = data.map(e => ({
      id: e.userId,
      firstName: e.firstName,
      lastName: e.lastName,
    }));
    setFilteredVolunteers(processedData);
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
                      View Heatmap
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
              setSelectedTimeslot={setSelectedTimeslot}
              eventInterest={eventInterest}
              driverOption={driverOption}
              searchQuery={searchQuery}
            />
          </div>
          <div className={styles.volunteerAvRight}>
            <div className={styles.volunteerAvRightHeaderContainer}>
              <h2 className={styles.volunteerAvRightHeader}>
                Volunteers ({filteredVolunteers.length}/{volunteers.length})
              </h2>
            </div>
            {/* TODO Add pagination for > 30 available volunteers */}
            {/* TODO Move export button here */}
            {filteredVolunteers.slice(0, 30).map(({ id, firstName, lastName }) => (
              <Link to={`/profile/${id}`} key={id}>
                <p className={styles.volunteerAvRightName}>
                  {lastName}, {firstName}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ViewAdminCodes isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

VolunteerAvailability.propTypes = {
  handleViewDatabase: PropTypes.func.isRequired,
};

export default VolunteerAvailability;