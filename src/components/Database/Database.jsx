import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { Input, Button, Row, Col, Dropdown, Menu, Table } from 'antd';
import { SearchOutlined, PlusOutlined, FilterFilled, DownOutlined } from '@ant-design/icons';
import ViewAdminCodes from '../ViewAdminCodes/ViewAdminCodes';
import { AFCBackend, localeSort } from '../../util/utils';
import styles from './Database.module.css';

const Database = ({ handleHideDatabase }) => {
  const [volunteerData, setVolunteerData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [driverOption, setDriverOption] = useState('All');
  const [ageOption, setAgeOption] = useState('All');
  const [eventInterest, setEventInterest] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getVolunteers = async () => {
    try {
      const { data: volunteerResponse } = await AFCBackend.get('/volunteers', {
        params: {
          driverOption,
          ageOption,
          eventInterest,
          searchQuery,
        },
      });
      setVolunteerData(
        volunteerResponse.map(v => ({
          ...v,
          firstNameCell: (
            <Link className={styles.dgEmphasis} to={`/profile/${v.userId}`}>
              {v.firstName}
            </Link>
          ),
          lastNameCell: (
            <Link className={styles.dgEmphasis} to={`/profile/${v.userId}`}>
              {v.lastName}
            </Link>
          ),
          emailLink: (
            <a className={styles.dgEmphasis} href={`mailto:${v.email}`}>
              {v.email}
            </a>
          ),
          role: `${v.role.slice(0, 1).toUpperCase()}${v.role.slice(1)}`,
        })),
      );
    } catch (e) {
      toast.error(`Unable to fetch volunteer data.`);
    }
  };

  useEffect(() => {
    getVolunteers();
    setLoading(false);
  }, [ageOption, driverOption, eventInterest, searchQuery]);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstNameCell',
      key: 'firstName',
      sorter: { compare: (a, b) => localeSort(a.firstName, b.firstName) },
    },
    {
      title: 'Last Name',
      dataIndex: 'lastNameCell',
      key: 'lastName',
      sorter: { compare: (a, b) => localeSort(a.lastName, b.lastName) },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: { compare: (a, b) => localeSort(a.role, b.role) },
    },
    {
      title: 'Email',
      dataIndex: 'emailLink',
      key: 'email',
      sorter: { compare: (a, b) => localeSort(a.email, b.email) },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: { compare: (a, b) => localeSort(a.phone, b.phone) },
    },
    {
      title: 'City',
      dataIndex: 'addressCity',
      key: 'city',
      sorter: { compare: (a, b) => localeSort(a.addressCity, b.addressCity) },
    },
    {
      title: 'State',
      dataIndex: 'addressState',
      key: 'state',
      sorter: { compare: (a, b) => localeSort(a.addressState, b.addressState) },
    },
  ];

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

  const ageMenu = (
    <Menu className={styles.menu}>
      <Menu.Item key="all" onClick={() => setAgeOption('All')}>
        All
      </Menu.Item>
      <Menu.Item key="adult" onClick={() => setAgeOption('Adult')}>
        Adult (18+)
      </Menu.Item>
      <Menu.Item key="minor" onClick={() => setAgeOption('Minor')}>
        Minor (&lt;18)
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <h1 className={styles.volunteerDBTitle}>Volunteer Database</h1>
      <div>
        <div className={styles.dbContainer}>
          <Row className={styles.filterRow} align="middle">
            {window.innerWidth > 1250 && (
              <Col span={1}>
                <FilterFilled className={styles.filterFilledMedium} />
              </Col>
            )}
            <Col span={10} className={styles.filterSearch}>
              <Input
                size="large"
                placeholder="Search by name, email, role..."
                onChange={e => setSearchQuery(e.target.value)}
                prefix={<SearchOutlined className={styles.filterSearchOutlined} />}
              />
            </Col>
            <Col span={13} className={styles['button-group']}>
              <Button className={styles.dbButton} onClick={handleHideDatabase}>
                View Heatmap
              </Button>
              <Button className={styles.dbButton}>Export</Button>
              <Button
                className={styles.dbButton}
                icon={<PlusOutlined className={styles.addAdminsPlus} />}
                type="primary"
                onClick={() => setIsOpen(true)}
              >
                <span className={styles.addAdmins}>Add Administrators</span>
              </Button>
            </Col>
          </Row>
          <Row className={styles.filterRow} align="middle">
            {window.innerWidth > 1250 && <Col span={1} />}
            <Col span={4}>
              <div className={styles['dropdown-box']}>
                <p className={styles['dropdown-label']}>Event Type Interests</p>
                <Dropdown overlay={eventInterestMenu}>
                  <Button className={styles['dropdown-button']}>
                    <div className={styles['dropdown-button-text']}>
                      {eventInterest}
                      <DownOutlined />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            </Col>
            <Col span={3} />
            <Col span={4}>
              <div className={styles['dropdown-box']}>
                <p className={styles['dropdown-label']}>Driving Ability</p>
                <Dropdown overlay={isDriverMenu}>
                  <Button className={styles['dropdown-button']}>
                    <div className={styles['dropdown-button-text']}>
                      {driverOption}
                      <DownOutlined />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            </Col>
            <Col span={3} />
            <Col span={4}>
              <div className={styles['dropdown-box']}>
                <p className={styles['dropdown-label']}>Age</p>
                <Dropdown overlay={ageMenu}>
                  <Button className={styles['dropdown-button']}>
                    <div className={styles['dropdown-button-text']}>
                      {ageOption}
                      <DownOutlined />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.tableContainer}>
          <p className={styles['table-label']}>Search Table</p>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={volunteerData}
            loading={isLoading}
            size="small"
            rowClassName={styles['table-row']}
          />
        </div>
      </div>
      <ViewAdminCodes isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

Database.propTypes = {
  handleHideDatabase: PropTypes.func.isRequired,
};

export default Database;
