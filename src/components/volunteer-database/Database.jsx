import React, { useState, useEffect } from 'react';
import { Input, Button, Row, Col, Dropdown, Menu, Divider, Table } from 'antd';
import { SearchOutlined, FilterFilled, DownOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { AFCBackend } from '../../util/utils';
import ViewAdminCodes from './ViewAdminCodes/ViewAdminCodes';
import styles from './Database.module.css';

function Database({ handleHideDatabase }) {
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
      setVolunteerData(volunteerResponse);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVolunteers();
    setLoading(false);
  }, [ageOption, driverOption, eventInterest, searchQuery]);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: text => (
        <a className={styles.eden} href="/volunteers">
          {text}
        </a>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'City',
      dataIndex: 'addressCity',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'addressState',
      key: 'state',
    },
  ];

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

  const ageMenu = (
    <Menu className={styles.menu}>
      <Menu.Item key="all" className={styles.menu} onClick={() => setAgeOption('All')}>
        All
      </Menu.Item>
      <Menu.Item key="adult" className={styles.menu} onClick={() => setAgeOption('Adult')}>
        Adult (18+)
      </Menu.Item>
      <Menu.Item key="minor" className={styles.menu} onClick={() => setAgeOption('Minor')}>
        Minor (&lt;18)
      </Menu.Item>
    </Menu>
  );

  const filterIcon = () => {
    if (window.innerWidth > 1250) {
      return (
        <Col span={1}>
          <FilterFilled className={styles.filterFilledMedium} />
        </Col>
      );
    }
    return <></>;
  };

  const iconGap = () => {
    if (window.innerWidth > 1250) {
      return <Col span={1} />;
    }
    return <></>;
  };

  return (
    <>
      <div className={styles['database-tab']}>
        <div className={styles['database-header']}>
          <Row className={styles.filterRow} align="middle">
            {filterIcon()}
            <Col className={styles.filterSearch}>
              <Input
                size="large"
                placeholder="Search by name, email, role..."
                onChange={e => setSearchQuery(e.target.value)}
                prefix={<SearchOutlined className={styles.filterSearchOutlined} />}
              />
            </Col>
            <Col span={3} />
            <Col span={6} className={styles['button-group']}>
              <Button onClick={handleHideDatabase}>View Heatmap</Button>
              <Button>Export</Button>
            </Col>
          </Row>
          <Row className={styles.filterRow} align="middle">
            {iconGap()}
            <Col span={4}>
              <div className={styles['dropdown-box']}>
                <p className={styles['dropdown-label']}>Event Types Interested In</p>
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
        <Divider className={styles.divider} />
        <p className={styles['table-label']}>Search Table</p>

        <div className={styles.table}>
          <Table
            columns={columns}
            dataSource={volunteerData}
            loading={isLoading}
            size="small"
            rowClassName={styles['table-row']}
          />
        </div>
        <Button
          type="primary"
          className={styles['view-admin-codes-button']}
          onClick={() => setIsOpen(true)}
        >
          View Admin Codes
        </Button>
      </div>
      <ViewAdminCodes isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

Database.propTypes = {
  handleHideDatabase: PropTypes.func.isRequired,
};

export default Database;
