import React, { useState } from 'react';
import { Table, Input, Button, Typography, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AFCBackend } from '../util/utils';
import './Hours.css';

const { Title } = Typography;

const Hours = () => {
  const [unapprovedVolunteersData, setUnapprovedVolunteersData] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [search, setSearch] = useState('');

  const approveHours = async (userId, eventId) => {
    try {
      await AFCBackend.get(`/hours/approve/` + userId + '/' + eventId);
      getUnapprovedVolunteers();
    } catch (e) {
      console.log(e.message);
    }
  };

  const approveMultipleHours = async selectedHoursList => {
    try {
      for (let i = 0; i < selectedHoursList.length; i++) {
        const userAndEventId = selectedHoursList[i].split(' ');
        await AFCBackend.get(`/hours/approve/` + userAndEventId[0] + '/' + userAndEventId[1]);
      }
      getUnapprovedVolunteers();
    } catch (e) {
      console.log(e.message);
    }
  };

  const declineHours = async (userId, eventId) => {
    try {
      await AFCBackend.get(`/hours/decline/` + userId + '/' + eventId);
      getUnapprovedVolunteers();
    } catch (e) {
      console.log(e.message);
    }
  };

  const getUnapprovedVolunteers = async (searchQuery = '') => {
    try {
      const { data: unapprovedVolunteers } = await AFCBackend.get(
        `/hours/unapproved/` + searchQuery,
      );

      const unapprovedVolunteerHours = [];

      for (let i = 0; i < unapprovedVolunteers.length; i++) {
        const userId = unapprovedVolunteers[i]['userId'];
        const { data: userData } = await AFCBackend.get(`/users/` + userId);

        unapprovedVolunteerHours.push({
          key: unapprovedVolunteers[i]['userId'] + ' ' + unapprovedVolunteers[i]['eventId'],
          user: userData['firstName'] + ' ' + userData['lastName'],
          organizations: userData['organization'],
          event_name: unapprovedVolunteers[i]['event']['name'],
          date: unapprovedVolunteers[i]['event']['startDatetime'].slice(0, 10),
          start: unapprovedVolunteers[i]['event']['startDatetime'].slice(11, 16),
          end: unapprovedVolunteers[i]['event']['endDatetime'].slice(11, 16),
          approval: (
            <Space>
              <Button
                type="secondary"
                onClick={() =>
                  declineHours(
                    unapprovedVolunteers[i]['userId'],
                    unapprovedVolunteers[i]['eventId'],
                  )
                }
              >
                {' '}
                Decline{' '}
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  approveHours(
                    unapprovedVolunteers[i]['userId'],
                    unapprovedVolunteers[i]['eventId'],
                  )
                }
              >
                {' '}
                Approve{' '}
              </Button>
            </Space>
          ),
        });
      }

      setUnapprovedVolunteersData(unapprovedVolunteerHours);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onChange = e => {
    setSearch(e.target.value);
  };

  // const items = [
  //   {
  //     label: 'Submit and continue',
  //     key: '1',
  //   },
  // ];

  // const enterLoading = index => {
  //   setLoadings(state => {
  //     const newLoadings = [...state];
  //     newLoadings[index] = true;
  //     return newLoadings;
  //   });
  //   setTimeout(() => {
  //     setLoadings(state => {
  //       const newLoadings = [...state];
  //       newLoadings[index] = false;
  //       return newLoadings;
  //     });
  //   }, 6000);
  // };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Organization(s)',
      dataIndex: 'organizations',
      key: 'organizations',
    },
    {
      title: 'Event Name',
      dataIndex: 'event_name',
      key: 'event_name',
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
      dataIndex: 'approval',
      key: 'approval',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selectedRowsList = [];
      for (let i = 0; i < selectedRows.length; i++) {
        selectedRowsList.push(selectedRows[i]['key']);
      }
      setSelectedHours(selectedRowsList);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const searchBar = () => {
    return (
      <div>
        <div>
          <Input
            prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
            size="large"
            placeholder="Search by name, email, role..."
            onPressEnter={() => getUnapprovedVolunteers(search)}
            onChange={onChange}
            allowClear
          />
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    getUnapprovedVolunteers();
    setSelectedHours([]);
  }, []);

  return (
    <div>
      <Title>Review Volunteer Hour Logs</Title>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div className="search-bar">
          {searchBar()}
          {/* <div className="filters">
            <Title level={3}>Sort by: &nbsp;</Title>
            <Dropdown.Button
              icon={<DownOutlined />}
              loading={loadings[1]}
              menu={{
                items,
              }}
              onClick={() => enterLoading(1)}
            >
              Date (most recent first)
            </Dropdown.Button>
          </div> */}
        </div>
        <div className="approve-button">
          <Button
            type="primary"
            size="large"
            disabled={selectedHours.length === 0}
            onClick={() => approveMultipleHours(selectedHours)}
          >
            Approve Selected
          </Button>
        </div>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={unapprovedVolunteersData}
        />
      </Space>
    </div>
  );
};

export default Hours;
