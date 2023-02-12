import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Input, Row, Col, Pagination } from 'antd';
import {
  CarOutlined,
  DownOutlined,
  DownloadOutlined,
  FilterFilled,
  IdcardOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import HeatMap from '../HeatMap/HeatMap';
import ViewAdminCodes from '../ViewAdminCodes/ViewAdminCodes';
import { AFCBackend, isAdult } from '../../util/utils';
import styles from './VolunteerAvailability.module.css';

const PAGE_SIZE = 30;

const VolunteerAvailability = props => {
  const { handleViewDatabase } = props;

  const [selectedTimeslot, setSelectedTimeslot] = useState({});
  const [availableVolunteers, setAvailableVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [eventInterest, setEventInterest] = useState('All');
  const [driverOption, setDriverOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const csvConfig = {
    data: filteredVolunteers.map(v => {
      return {
        'First Name': v.firstName,
        'Last Name': v.lastName,
        Organization: v.organization,
        Email: v.email,
        Phone: `${v.phone}\t`,
        'Street Address': v.addressStreet,
        City: v.addressCity,
        State: v.addressState,
        'ZIP Code': v.addressZip,
        Birthdate: `${
          v.birthdate.getMonth() + 1
        }/${v.birthdate.getDate()}/${v.birthdate.getFullYear()}`,
        'Lifting Capacity (lb)': v.weightLiftingAbility,
        'Can/Will Drive': v.canDrive && v.willingToDrive ? 'yes' : 'no',
      };
    }),
    headers: [
      'First Name',
      'Last Name',
      'Organization',
      'Email',
      'Phone',
      'Street Address',
      'City',
      'State',
      'ZIP Code',
      'Birthdate',
      'Lifting Capacity (lb)',
      'Can/Will Drive',
    ],
    filename: 'AFC-Volunteers.csv',
    onClick: () => toast.success('Exported volunteer data to CSV!'),
  };

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
          .map(v => ({
            id: v.userId,
            firstName: v.firstName,
            lastName: v.lastName,
            organization: v.organization,
            birthdate: new Date(v.birthdate),
            email: v.email,
            phone: v.phone,
            addressStreet: v.addressStreet,
            addressCity: v.addressCity,
            addressState: v.addressState,
            addressZip: v.addressZip,
            weightLiftingAbility: v.weightLiftingAbility,
            canDrive: v.canDrive,
            willingToDrive: v.willingToDrive,
            available: !!v.availabilities,
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
            .map(v => ({
              id: v.userId,
              firstName: v.firstName,
              lastName: v.lastName,
              organization: v.organization,
              birthdate: new Date(v.birthdate),
              email: v.email,
              phone: v.phone,
              addressStreet: v.addressStreet,
              addressCity: v.addressCity,
              addressState: v.addressState,
              addressZip: v.addressZip,
              weightLiftingAbility: v.weightLiftingAbility,
              canDrive: v.canDrive,
              willingToDrive: v.willingToDrive,
              available: !!v.availabilities ?? false,
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
        .map(v => ({
          id: v.userId,
          firstName: v.firstName,
          lastName: v.lastName,
          organization: v.organization,
          birthdate: new Date(v.birthdate),
          email: v.email,
          phone: v.phone,
          addressStreet: v.addressStreet,
          addressCity: v.addressCity,
          addressState: v.addressState,
          addressZip: v.addressZip,
          weightLiftingAbility: v.weightLiftingAbility,
          canDrive: v.canDrive,
          willingToDrive: v.willingToDrive,
          available: !!v.availabilities ?? false,
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
      .map(v => ({
        id: v.userId,
        firstName: v.firstName,
        lastName: v.lastName,
        organization: v.organization,
        birthdate: new Date(v.birthdate),
        email: v.email,
        phone: v.phone,
        addressStreet: v.addressStreet,
        addressCity: v.addressCity,
        addressState: v.addressState,
        addressZip: v.addressZip,
        weightLiftingAbility: v.weightLiftingAbility,
        canDrive: v.canDrive,
        willingToDrive: v.willingToDrive,
        available: !!v.availabilities,
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
            {filteredVolunteers
              .slice(PAGE_SIZE * page - PAGE_SIZE, PAGE_SIZE * page)
              .map(({ id, firstName, lastName, birthdate, willingToDrive }) => (
                <Link to={`/profile/${id}`} key={`${id}_link`}>
                  <p className={styles.volunteerAvRightName}>
                    {lastName}, {firstName}{' '}
                    {isAdult(birthdate) && <IdcardOutlined className={styles.volRowIcon} />}{' '}
                    {willingToDrive && <CarOutlined className={styles.volRowIcon} />}
                  </p>
                </Link>
              ))}
            <div className={styles.volunteerAvRightFooterContainer}>
              <div
                className={filteredVolunteers.length > PAGE_SIZE && styles.volunteerAvPagination}
              >
                <Pagination
                  hideOnSinglePage
                  defaultPageSize={PAGE_SIZE}
                  showSizeChanger={false}
                  defaultCurrent={1}
                  responsive
                  size="small"
                  simple
                  total={filteredVolunteers.length}
                  onChange={pg => setPage(pg)}
                />
              </div>
              <CSVLink {...csvConfig}>
                <Button className={styles.volunteerExpButton} icon={<DownloadOutlined />}>
                  Export Volunteers
                </Button>
              </CSVLink>
              <h3 className={styles.volunteerAvRightQual}>
                * Some volunteers do not appear here because they have not marked their
                availability. You can view all registered volunteers in the{' '}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <span
                  onClick={handleViewDatabase}
                  role="link"
                  tabIndex={0}
                  className={styles.volunteerAvLink}
                >
                  Volunteer Database.
                </span>
              </h3>
            </div>
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
