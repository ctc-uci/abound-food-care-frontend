import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.variable.min.css';
import '../volunteer-database/database.css';
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
import axios from 'axios';

function ReviewHours() {
  const [hoursData, setHoursData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [sortCriterion, setSortCriterion] = useState('Date (most recent first)');

  useEffect(async () => {
    const data = [];
    const unapprovedData = await axios.get('http://localhost:3001/hours/unapproved').then(res => {
      return res.data;
    });
    const namesPromises = [];
    const eventsPromises = [];
    const names = [];
    const events = [];
    for (let i = 0; i < unapprovedData.length; i += 1) {
      namesPromises.push(
        axios
          .get(`http://localhost:3001/users/ ${unapprovedData[i].user_id.toString()}`)
          .then(res => {
            names.push(res.data[0].name);
          }),
      );
      eventsPromises.push(
        axios
          .get(`http://localhost:3001/events/ ${unapprovedData[i].event_id.toString()}`)
          .then(res => {
            events.push(res.data[0].name);
          }),
      );
    }
    await Promise.all(namesPromises);
    await Promise.all(eventsPromises);

    for (let i = 0; i < unapprovedData.length; i += 1) {
      const startDate = new Date(unapprovedData[i].start_datetime);
      const endDate = new Date(unapprovedData[i].end_datetime);
      data.push({
        key: i,
        name: names[i],
        organization: '',
        eventName: events[i],
        date: startDate.toLocaleDateString(),
        start: startDate
          .toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' })
          .toString(),
        end: endDate
          .toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' })
          .toString(),
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
      title: 'Organization(s)',
      dataIndex: 'organization',
      key: 'organization',
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
      title: 'Start (PST)',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'End (PST)',
      dataIndex: 'end',
      key: 'end',
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
      <Menu.Item
        key="1"
        className="menu"
        onClick={() => setSortCriterion('Date (most recent first)')}
      >
        Date (most recent first)
      </Menu.Item>
      <Menu.Item key="2" className="menu" onClick={() => setSortCriterion('Volunteer Name')}>
        Volunteer Name
      </Menu.Item>
      <Menu.Item key="3" className="menu" onClick={() => setSortCriterion('Organization')}>
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
          <Col span={12} />
          <Col span={4}>
            <Space>
              <Button type="primary" style={{ backgroundColor: '#115740' }}>
                Approve Selected
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
