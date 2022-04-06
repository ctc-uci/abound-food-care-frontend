import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.variable.min.css';
import './database.css';
import { Input, Button, Row, Col, Dropdown, Menu, Divider, Table } from 'antd';
import { SearchOutlined, FilterFilled, DownOutlined } from '@ant-design/icons';

function Database() {
  const [volunteerData, setVolunteerData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [currentDriverOption, setCurrentDriverOption] = useState('All');
  const [searchCriterion, setSearchCriterion] = useState('');

  const getVolunteers = async () => {
    try {
      const { data: volunteerResponse } = await axios.get('http://localhost:3001/volunteers');
      setVolunteerData(volunteerResponse);
      setFilteredData(volunteerResponse);
    } catch (e) {
      console.log('Error getting volunteer data!');
    }
  };

  useEffect(() => {
    getVolunteers();
    setLoading(false);
  }, []);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: text => (
        <a style={{ color: '#115740' }} href="/volunteers">
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

  const onSearch = e => {
    const data = [];
    for (let i = 0; i < volunteerData.length; i += 1) {
      const person = volunteerData[i];
      if (
        person.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.role.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.phone.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.addressCity.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.addressState.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        if (
          (currentDriverOption === 'Can Drive' && person.canDrive) ||
          (currentDriverOption === "Can't Drive" && !person.canDrive) ||
          currentDriverOption === 'All'
        ) {
          data.push(person);
        }
      }
    }
    setSearchCriterion(e.target.value.toLowerCase());
    setFilteredData(data);
  };

  const setDriver = option => {
    const data = [];
    for (let i = 0; i < volunteerData.length; i += 1) {
      const person = volunteerData[i];
      if (
        person.firstName.toLowerCase().includes(searchCriterion) ||
        person.lastName.toLowerCase().includes(searchCriterion) ||
        person.role.toLowerCase().includes(searchCriterion) ||
        person.email.toLowerCase().includes(searchCriterion) ||
        person.phone.toLowerCase().includes(searchCriterion) ||
        person.addressCity.toLowerCase().includes(searchCriterion) ||
        person.addressState.toLowerCase().includes(searchCriterion)
      ) {
        if (
          (option === 'Can Drive' && person.canDrive) ||
          (option === "Can't Drive" && !person.canDrive) ||
          option === 'All'
        ) {
          data.push(person);
        }
      }
    }
    setCurrentDriverOption(option);
    setFilteredData(data);
  };

  const eventInterestMenu = (
    <Menu className="menu">
      <Menu.Item key="all" className="menu">
        All
      </Menu.Item>
      <Menu.Item key="distribution" className="menu">
        Distributions
      </Menu.Item>
      <Menu.Item key="food" className="menu">
        Food Running
      </Menu.Item>
      <Menu.Item key="other" className="menu">
        Other
      </Menu.Item>
    </Menu>
  );

  const isDriverMenu = (
    <Menu className="menu">
      <Menu.Item key="1" className="menu" onClick={() => setDriver('All')}>
        All
      </Menu.Item>
      <Menu.Item key="2" className="menu" onClick={() => setDriver('Can Drive')}>
        Can Drive
      </Menu.Item>
      <Menu.Item key="3" className="menu" onClick={() => setDriver("Can't Drive")}>
        Cannot Drive
      </Menu.Item>
    </Menu>
  );

  const ageMenu = (
    <Menu className="menu">
      <Menu.Item key="all" className="menu">
        All
      </Menu.Item>
      <Menu.Item key="adult" className="menu">
        Adult (18 and older)
      </Menu.Item>
      <Menu.Item key="minor" className="menu">
        Minor (17 and younger)
      </Menu.Item>
    </Menu>
  );

  const filterIcon = () => {
    if (window.innerWidth > 1250) {
      return (
        <Col span={1}>
          <FilterFilled style={{ fontSize: '28px' }} />
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
      <div className="database-tab">
        <div className="database-header">
          <Row style={{ height: '50%', flexWrap: 'wrap' }} align="middle">
            {filterIcon()}
            <Col style={{ width: '40vw' }}>
              <Input
                size="large"
                placeholder="Search by name, email, role..."
                onChange={onSearch}
                prefix={<SearchOutlined style={{ fontSize: '22px', color: '#BFBFBF' }} />}
              />
            </Col>
            <Col span={3} />
            <Col span={6} className="button-group">
              <Button>View Heatmap</Button>
              <Button>Export</Button>
              <Button type="primary" style={{ backgroundColor: '#115740' }}>
                + Add User
              </Button>
            </Col>
          </Row>
          <Row style={{ height: '50%' }} align="middle">
            {iconGap()}
            <Col span={4}>
              <div className="dropdown-box">
                <p className="dropdown-label">Event Types Interested In</p>
                <Dropdown overlay={eventInterestMenu}>
                  <Button className="dropdown-button">
                    <div className="dropdown-button-text">
                      All
                      <DownOutlined />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            </Col>
            <Col span={3} />
            <Col span={4}>
              <div className="dropdown-box">
                <p className="dropdown-label">Driving Ability</p>
                <Dropdown overlay={isDriverMenu}>
                  <Button className="dropdown-button">
                    <div className="dropdown-button-text">
                      All
                      <DownOutlined />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            </Col>
            <Col span={3} />
            <Col span={4}>
              <div className="dropdown-box">
                <p className="dropdown-label">Age</p>
                <Dropdown overlay={ageMenu}>
                  <Button className="dropdown-button">
                    <div className="dropdown-button-text">
                      {currentDriverOption}
                      <DownOutlined />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <p className="table-label">Search Table</p>

        <div className="table">
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={isLoading}
            size="small"
            rowClassName="table-row"
          />
        </div>
      </div>
    </>
  );
}

export default Database;
