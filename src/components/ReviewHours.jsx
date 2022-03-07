import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.variable.min.css';
import './database.css';
import {
  Space,
  Input,
  Button,
  Row,
  Col,
  Dropdown,
  Menu,
  Divider,
  Table,
  ConfigProvider,
} from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';

function ReviewHours() {
  const [hoursData, setHoursData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [sortCriterion, setSortCriterion] = useState('All');

  useEffect(() => {
    const data = [];
    /*
    fetch(BACKEND_URL)
      .then((res) => {
        setHoursData(res);
      })
    */
    for (let i = 0; i < 100; i += 1) {
      data.push({
        key: i,
        name: `Edward ${i}`,
        eventName: 'EventName',
        date: '01/01/2021',
        timeIn: '09:00',
        timeOut: '15:00',
      });
    }
    setHoursData(data);
    setFilteredData(data);
    setLoading(false);
  }, []);

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: text => (
        <a style={{ color: '#115740' }} href="/volunteers">
          {text}
        </a>
      ),
    },
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time In',
      dataIndex: 'timeIn',
      key: 'timeIn',
    },
    {
      title: 'Time Out',
      dataIndex: 'timeOut',
      key: 'timeOut',
    },
    {
      title: 'Approved or Declined',
      key: 'review',
      render: () => (
        <Space>
          <Button>Decline</Button>
          <Button type="primary" style={{ backgroundColor: '#115740' }}>
            Approve
          </Button>
        </Space>
      ),
    },
  ];

  const onSearch = e => {
    const data = [];
    for (let i = 0; i < hoursData.length; i += 1) {
      const volunteerHours = hoursData[i];
      if (
        volunteerHours.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        volunteerHours.eventName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        volunteerHours.date.toLowerCase().includes(e.target.value.toLowerCase()) ||
        volunteerHours.timeIn.toLowerCase().includes(e.target.value.toLowerCase()) ||
        volunteerHours.timeOut.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        data.push(volunteerHours);
      }
    }
    // setSearchCriterion(e.target.value.toLowerCase());
    setFilteredData(data);
  };

  ConfigProvider.config({
    theme: {
      primaryColor: '#6CC24A',
    },
  });

  const sortMenu = (
    <Menu>
      <Menu.Item key="1" className="menu" onClick={() => setSortCriterion('Most Recent')}>
        Date (most recent first)
      </Menu.Item>
      <Menu.Item key="2" className="menu" onClick={() => setSortCriterion('Name')}>
        Volunteer Name
      </Menu.Item>
      <Menu.Item key="3" className="menu" onClick={() => setSortCriterion('Email')}>
        Organization
      </Menu.Item>
    </Menu>
  );

  return (
    <ConfigProvider>
      <div className="database-tab">
        <div className="database-header">
          <Row style={{ height: '50%', flexWrap: 'wrap' }} align="middle">
            <Col style={{ width: '50vw' }}>
              <Input
                size="large"
                placeholder="Search by event, name, date..."
                onChange={onSearch}
                prefix={<SearchOutlined style={{ fontSize: '22px', color: '#BFBFBF' }} />}
              />
            </Col>
            <Col span={1} />
            <Col span={2} style={{ textAlign: 'right', paddingRight: '10px' }}>
              <p className="dropdown-label">Sort by:</p>
            </Col>
            <Col span={3} className="button-group">
              <div className="dropdown-box">
                <Dropdown overlay={sortMenu}>
                  <Button className="dropdown-button">
                    <div className="dropdown-button-text">
                      {sortCriterion}
                      <DownOutlined />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </div>
        <Divider className="divider" />
        <Row style={{ height: '20%', flexWrap: 'wrap' }} align="middle">
          <Col span={1} />
          <Col span={7}>
            <p className="table-label">Search Table</p>
          </Col>
          <Col span={8} />
          <Col span={8}>
            <Space>
              <Button>Decline All</Button>
              <Button type="primary" style={{ backgroundColor: '#115740' }}>
                Approve All
              </Button>
            </Space>
          </Col>
        </Row>

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
    </ConfigProvider>
  );
}

export default ReviewHours;
