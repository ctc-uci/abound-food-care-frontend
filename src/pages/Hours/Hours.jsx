import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Typography, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AFCBackend } from '../../util/utils';
import styles from './Hours.module.css';

const { Title } = Typography;

const Hours = () => {
  const [unapprovedVolunteersData, setUnapprovedVolunteersData] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(true);

  const approveHours = async (userId, eventId) => {
    try {
      await AFCBackend.get(`/hours/approve/${userId}/${eventId}`);
      setRefresh(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const approveMultipleHours = async selectedHoursList => {
    try {
      await Promise.all(
        selectedHoursList.map(async entry => {
          const [userId, eventId] = entry.split(' ');
          return AFCBackend.get(`/hours/approve/${userId}/${eventId}`);
        }),
      );
      setRefresh(true);
    } catch (e) {
      setError(e.message);
    }
  };

  const declineHours = async (userId, eventId) => {
    try {
      await AFCBackend.get(`/hours/decline/${userId}/${eventId}`);
      setRefresh(true);
    } catch (e) {
      setError(e.message);
    }
  };

  const getUnapprovedVolunteers = async (searchQuery = '') => {
    try {
      const { data: unapprovedVolunteers } = await AFCBackend.get(
        `/hours/unapproved/${searchQuery}`,
      );

      const unapprovedVolunteerHours = await Promise.all(
        unapprovedVolunteers.map(async v => {
          const { userId } = v;
          const { data: userData } = await AFCBackend.get(`/users/${userId}`);

          return {
            key: `${v.userId} ${v.eventId}`,
            user: `${userData.firstName} ${userData.lastName}`,
            organizations: userData.organization,
            event_name: v.event.name,
            date: v.event.startDatetime.slice(0, 10),
            start: v.event.startDatetime.slice(11, 16),
            end: v.event.endDatetime.slice(11, 16),
            approval: (
              <Space>
                <Button type="secondary" onClick={() => declineHours(v.userId, v.eventId)}>
                  {' '}
                  Decline{' '}
                </Button>
                <Button type="primary" onClick={() => approveHours(v.userId, v.eventId)}>
                  {' '}
                  Approve{' '}
                </Button>
              </Space>
            ),
          };
        }),
      );

      setUnapprovedVolunteersData(unapprovedVolunteerHours);
    } catch (e) {
      setError(e.message);
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

  // const items = [
  //   {
  //     label: 'Submit and continue',
  //     key: '1',
  //   },
  // ];

  // const [loadings, setLoadings] = useState([]);

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
      const selectedRowsList = selectedRows.map(row => row.key);
      setSelectedHours(selectedRowsList);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  // useEffect(() => {
  //   getUnapprovedVolunteers();
  //   setSelectedHours([]);
  // }, []);

  useEffect(() => {
    if (!refresh) {
      return;
    }
    getUnapprovedVolunteers();
    setSelectedHours([]);
    setRefresh(false);
  }, [refresh]);

  return (
    <div>
      <Title>Review Volunteer Hour Logs</Title>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div className={styles['search-bar']}>
          <Input
            prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
            size="large"
            placeholder="Search by name, email, role..."
            onPressEnter={() => getUnapprovedVolunteers(search)}
            onChange={onChange}
            allowClear
          />
          {/* <div className={styles['filters']}>
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
        <div className={styles['approve-button']}>
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
      {error && error}
    </div>
  );
};

export default Hours;
