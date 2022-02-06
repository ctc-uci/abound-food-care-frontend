import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.variable.min.css';
import './database.css';
import { Input, Button, Row, Col, Dropdown, Menu, Divider, Table, ConfigProvider } from 'antd';
import { SearchOutlined, FilterFilled, DownOutlined } from '@ant-design/icons';

function Database() {
  const [volunteerData, setVolunteerData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [currentDriverOption, setCurrentDriverOption] = useState('All');
  const [searchCriterion, setSearchCriterion] = useState('');

  useEffect(() => {
    const data = [];
    /*
    fetch(BACKEND_URL)
      .then((res) => {
        setVolunteerData(res);
      })
    */
    for (let i = 0; i < 100; i += 1) {
      data.push({
        key: i,
        name: `Edward ${i}`,
        role: 'Volunteer',
        email: 'volunteer@gmail.com',
        phone: '(949) 000-0000',
        city: 'Irvine',
        state: 'CA',
        isDriver: true,
      });
    }
    setVolunteerData(data);
    setFilteredData(data);
    setLoading(false);
  }, []);

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: text => (
        <a style={{ color: '#6CC24A' }} href="/volunteers">
          {text}
        </a>
      ),
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
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
  ];

  const onSearch = e => {
    const data = [];
    for (let i = 0; i < volunteerData.length; i += 1) {
      const person = volunteerData[i];
      if (
        person.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.role.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.phone.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
        person.state.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        if (
          (currentDriverOption === 'Can Drive' && person.isDriver) ||
          (currentDriverOption === "Can't Drive" && !person.isDriver) ||
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
        person.name.toLowerCase().includes(searchCriterion) ||
        person.role.toLowerCase().includes(searchCriterion) ||
        person.email.toLowerCase().includes(searchCriterion) ||
        person.phone.toLowerCase().includes(searchCriterion) ||
        person.city.toLowerCase().includes(searchCriterion) ||
        person.state.toLowerCase().includes(searchCriterion)
      ) {
        if (
          (option === 'Can Drive' && person.isDriver) ||
          (option === "Can't Drive" && !person.isDriver) ||
          option === 'All'
        ) {
          data.push(person);
        }
      }
    }
    setCurrentDriverOption(option);
    setFilteredData(data);
  };

  const menu = (
    <Menu className="menu">
      <Menu.Item key="1" className="menu">
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" className="menu">
        1st menu item
      </Menu.Item>
      <Menu.Item key="3" className="menu">
        1st menu item
      </Menu.Item>
    </Menu>
  );

  const isDriverMenu = (
    <Menu className="menu">
      <Menu.Item key="1" className="menu" onClick={() => setDriver('All')}>
        All
      </Menu.Item>
      <Menu.Item key="1" className="menu" onClick={() => setDriver('Can Drive')}>
        Can Drive
      </Menu.Item>
      <Menu.Item key="3" className="menu" onClick={() => setDriver("Can't Drive")}>
        Cannot Drive
      </Menu.Item>
    </Menu>
  );

  const ageMenu = (
    <Menu className="menu">
      <Menu.Item key="1" className="menu">
        All
      </Menu.Item>
      <Menu.Item key="1" className="menu">
        18+
      </Menu.Item>
    </Menu>
  );

  ConfigProvider.config({
    theme: {
      primaryColor: '#6CC24A',
    },
  });

  return (
    <>
      <ConfigProvider>
        <div className="database-tab">
          <div className="database-header">
            <Row style={{ height: '50%' }} align="middle">
              <Col span={1}>
                <FilterFilled style={{ fontSize: '28px' }} />
              </Col>
              <Col span={13}>
                <Input
                  size="large"
                  placeholder="Search by name, email, role..."
                  onChange={onSearch}
                  prefix={<SearchOutlined style={{ fontSize: '22px', color: '#BFBFBF' }} />}
                />
              </Col>
              <Col span={2} />
              <Col span={8} className="button-group">
                <Button>View Heatmap</Button>
                <Button>Export</Button>
                <Button type="primary">+ Add User</Button>
              </Col>
            </Row>
            <Row style={{ height: '50%' }} align="middle">
              <Col span={1} />
              <Col span={4}>
                <div className="dropdown-box">
                  <p className="dropdown-label">Event Types</p>
                  <Dropdown overlay={menu}>
                    <Button className="dropdown-button">
                      <div className="dropdown-button-text">
                        All
                        <DownOutlined />
                      </div>
                    </Button>
                  </Dropdown>
                </div>
              </Col>
              <Col span={2} />
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
              <Col span={2} />
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
              size="medium"
              rowClassName="table-row"
            />
          </div>
        </div>
      </ConfigProvider>
    </>
  );
}

export default Database;
