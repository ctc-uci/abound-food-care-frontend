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
import { SearchOutlined, DownOutlined, FilterOutlined } from '@ant-design/icons';
import axios from 'axios';
import DeclinePopup from './DeclinePopup';
import useViewPort from '../../common/useViewPort';
import './reviewHours.css';

const ReviewHours = () => {
  const [isLoading, setLoading] = useState(true);
  const [unapprovedHours, setUnapprovedHours] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortCriterion, setSortCriterion] = useState('Date (most recent first)');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [approvedOrDeclined, setApprovedOrDeclined] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const { width } = useViewPort();
  const breakpoint = 720;

  ConfigProvider.config({
    theme: {
      primaryColor: '#6CC24A',
    },
  });

  const rowSelection = {
    onChange: (selectedKeys, selectedRows_) => {
      setSelectedRows(selectedRows_);
    },
  };

  const getHoursData = async () => {
    const allHoursData = [];
    let unapprovedHoursData = [];
    try {
      const { data: hoursResponse } = await axios.get('http://localhost:3001/hours');
      for (let i = 0; i < hoursResponse.length; i += 1) {
        allHoursData.push(hoursResponse[i]);
      }
      unapprovedHoursData = allHoursData.filter(
        hour => hour.submitted === true && hour.declined === false && hour.approved === false,
      );
    } catch (e) {
      console.log(e.message);
    }

    return unapprovedHoursData;
  };

  const handleApprove = async (userId, eventId, startDate, startTime, endDate, endTime) => {
    try {
      const startDatetime = `${startDate} ${startTime}`;
      const endDatetime = `${endDate} ${endTime}`;
      const payload = {
        startDatetime,
        endDatetime,
        submitted: true,
        approved: true,
        declined: false,
      };
      await axios.post(`http://localhost:3001/hours/${userId}/${eventId}`, payload);
      setApprovedOrDeclined(!approvedOrDeclined);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleApproveSelected = async () => {
    for (let i = 0; i < selectedRows.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await handleApprove(
        selectedRows[i].userId,
        selectedRows[i].eventId,
        selectedRows[i].startDate,
        selectedRows[i].startTime,
        selectedRows[i].endDate,
        selectedRows[i].endTime,
      );
    }
  };

  const handleDecline = async (userId, eventId, startDate, startTime, endDate, endTime) => {
    try {
      const startDatetime = `${startDate} ${startTime}`;
      const endDatetime = `${endDate} ${endTime}`;
      const payload = {
        startDatetime,
        endDatetime,
        submitted: true,
        approved: false,
        declined: true,
      };
      await axios.post(`http://localhost:3001/hours/${userId}/${eventId}`, payload);
      setIsModalVisible(false);
      setApprovedOrDeclined(!approvedOrDeclined);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeclineSelected = async () => {
    for (let i = 0; i < selectedRows.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await handleDecline(
        selectedRows[i].userId,
        selectedRows[i].eventId,
        selectedRows[i].startDate,
        selectedRows[i].startTime,
        selectedRows[i].endDate,
        selectedRows[i].endTime,
      );
    }
  };

  useEffect(async () => {
    const unapprovedHoursData = await getHoursData();
    const data = [];
    const namesPromises = [];
    const orgPromises = [];
    const names = [];
    const organizations = [];
    for (let i = 0; i < unapprovedHoursData.length; i += 1) {
      namesPromises.push(
        axios
          .get(`http://localhost:3001/users/${unapprovedHoursData[i].userId.toString()}`)
          .then(res => {
            names.push(`${res.data.firstName} ${res.data.lastName}`);
            organizations.push(res.data.organization);
          }),
      );
    }
    await Promise.all(namesPromises);
    await Promise.all(orgPromises);

    for (let i = 0; i < unapprovedHoursData.length; i += 1) {
      const startDate = new Date(unapprovedHoursData[i].startDatetime);
      const endDate = new Date(unapprovedHoursData[i].endDatetime);
      data.push({
        key: i,
        userId: unapprovedHoursData[i].userId,
        name: names[i],
        organization: organizations[i],
        eventId: unapprovedHoursData[i].eventId,
        eventName: unapprovedHoursData[i].event.name,
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        startTime: startDate
          .toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' })
          .toString(),
        endTime: endDate
          .toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' })
          .toString(),
      });
    }
    setUnapprovedHours(data);
    setFilteredData(data);
    setLoading(false);
  }, [approvedOrDeclined]);

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
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Start (PST)',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End (PST)',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Approved or Declined',
      key: 'review',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setModalKey(record.key);
              setIsModalVisible(true);
            }}
          >
            Decline
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: '#115740' }}
            onClick={() => {
              handleApprove(
                filteredData[modalKey].userId,
                filteredData[modalKey].eventId,
                filteredData[modalKey].startDate,
                filteredData[modalKey].startTime,
                filteredData[modalKey].endDate,
                filteredData[modalKey].endTime,
              );
            }}
          >
            Approve
          </Button>
        </Space>
      ),
    },
  ];

  const keyInWord = (key, word) => {
    return word.toLowerCase().includes(key.toLowerCase());
  };

  const onSearch = e => {
    const data = [];
    for (let i = 0; i < unapprovedHours.length; i += 1) {
      const volunteerHours = unapprovedHours[i];
      if (
        keyInWord(e.target.value, volunteerHours.name) ||
        keyInWord(e.target.value, volunteerHours.organization) ||
        keyInWord(e.target.value, volunteerHours.eventName) ||
        keyInWord(e.target.value, volunteerHours.startDate)
      ) {
        data.push(volunteerHours);
      }
    }
    // setSearchCriterion(e.target.value.toLowerCase());
    setFilteredData(data);
  };

  const onChange = e => {
    if (e.target.value) {
      onSearch(e);
    } else {
      setFilteredData(unapprovedHours);
    }
  };

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

  const mobileSortMenu = (
    <Menu
      onClick={({ key }) => {
        if (key === '1') {
          setSortCriterion('Date (most recent first)');
        } else if (key === '2') {
          setSortCriterion('Volunteer Name');
        } else if (key === '3') {
          setSortCriterion('Organization');
        }
      }}
      items={[
        {
          type: 'group',
          label: 'Sort by:',
          children: [
            {
              key: '1',
              label: 'Date (most recent first)',
            },
            {
              key: '2',
              label: 'Volunteer Name',
            },
            {
              key: '3',
              label: 'Organization',
            },
          ],
        },
      ]}
    />
  );

  const renderMobileSearchBar = () => {
    return (
      <div
        className="mobile-search-bar"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Input
          placeholder="Search by name, email, role..."
          onPressEnter={onSearch}
          onChange={onChange}
          allowClear
          prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
        />
        <Dropdown.Button
          overlay={mobileSortMenu}
          placement="bottomRight"
          icon={<FilterOutlined style={{ color: '#115740' }} />}
        />
      </div>
    );
  };

  const renderMobileApproveSelectedButton = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          className="mobile-approve-selected-btn"
          type="primary"
          size="large"
          style={{ background: '#115740' }}
          onClick={handleApproveSelected}
        >
          Approve Selected
        </Button>
      </div>
    );
  };

  const renderMobileAdminHoursLogScreen = () => {
    return (
      <>
        <div id="mobile-admin-hours-log-screen">
          {renderMobileApproveSelectedButton()}
          {renderMobileSearchBar()}
        </div>
        <div className="table">
          <Table
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={columns}
            dataSource={filteredData}
            loading={isLoading}
            size="small"
            rowClassName="table-row"
          />
        </div>
      </>
    );
  };

  const renderAdminHoursLogScreen = () => {
    return (
      <div className="database-tab">
        <div className="database-header">
          <Row style={{ height: '50%', flexWrap: 'wrap' }} align="middle">
            <Col style={{ width: '50vw' }}>
              <Input
                size="large"
                placeholder="Search by event, name, date..."
                onPressEnter={onSearch}
                onChange={onChange}
                allowClear
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
          <Col span={6} />
          <Col span={10}>
            <Space>
              <Button
                type="primary"
                style={{ backgroundColor: '#115740', marginLeft: '30px' }}
                onClick={handleApproveSelected}
              >
                Approve Selected
              </Button>
            </Space>
            <Space>
              <Button style={{ marginLeft: '30px' }} onClick={handleDeclineSelected}>
                Decline Selected
              </Button>
            </Space>
          </Col>
        </Row>

        <div className="table">
          <Table
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={columns}
            dataSource={filteredData}
            loading={isLoading}
            size="small"
            rowClassName="table-row"
          />
        </div>
      </div>
    );
  };

  return (
    <ConfigProvider>
      {width > breakpoint ? renderAdminHoursLogScreen() : renderMobileAdminHoursLogScreen()}
      {isModalVisible ? (
        <DeclinePopup
          setIsModalVisible={setIsModalVisible}
          userId={filteredData[modalKey].userId}
          name={filteredData[modalKey].name}
          organization={filteredData[modalKey].organization}
          eventId={filteredData[modalKey].eventId}
          event={filteredData[modalKey].eventName}
          startDate={filteredData[modalKey].startDate}
          endDate={filteredData[modalKey].endDate}
          startTime={filteredData[modalKey].startTime}
          endTime={filteredData[modalKey].endTime}
          handleDecline={handleDecline}
        />
      ) : null}
    </ConfigProvider>
  );
};

export default ReviewHours;
