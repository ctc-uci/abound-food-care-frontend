import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Table, Input, Button, Typography, Space, Dropdown, Menu } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { AFCBackend } from '../../util/utils';
import styles from './Hours.module.css';

const { Title } = Typography;

const sortFns = {
  'Event Name (A - Z)': (a, b) => a.sort.eventName.localeCompare(b.sort.eventName),
  'Event Name (Z - A)': (a, b) => -a.sort.eventName.localeCompare(b.sort.eventName),
  'Volunteer Name (A - Z)': (a, b) => a.sort.volunteerName.localeCompare(b.sort.volunteerName),
  'Volunteer Name (Z - A)': (a, b) => -a.sort.volunteerName.localeCompare(b.sort.volunteerName),
  'Most Recent': (a, b) => -a.sort.mostRecent.localeCompare(b.sort.mostRecent),
  Oldest: (a, b) => a.sort.mostRecent.localeCompare(b.sort.mostRecent),
};

const Hours = () => {
  const [unapprovedVolunteersData, setUnapprovedVolunteersData] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('Most Recent');
  const [refresh, setRefresh] = useState(true);

  const approveHours = async (userId, eventId, userName, eventName) => {
    try {
      await AFCBackend.get(`/hours/approve/${userId}/${eventId}`);
      toast.success(`Successfully approved ${userName}'s log for ${eventName}`);
      setRefresh(true);
    } catch (e) {
      toast.error(e.message);
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
      toast.success(
        `Successfully approved ${selectedHoursList.length} log${
          selectedHoursList.length !== 1 ? 's' : ''
        }`,
      );
      setRefresh(true);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const approveAllHours = async () => {
    try {
      await Promise.all(
        unapprovedVolunteersData.map(async ({ key }) => {
          const [userId, eventId] = key.split(' ');
          return AFCBackend.get(`/hours/approve/${userId}/${eventId}`);
        }),
      );
      toast.success(
        `Successfully approved ${unapprovedVolunteersData.length} log${
          unapprovedVolunteersData.length !== 1 ? 's' : ''
        }`,
      );
      setRefresh(true);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const declineHours = async (userId, eventId, userName, eventName) => {
    try {
      await AFCBackend.get(`/hours/decline/${userId}/${eventId}`);
      toast.success(`Successfully declined ${userName}'s log for ${eventName}`);
      setRefresh(true);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const declineMultipleHours = async selectedHoursList => {
    try {
      await Promise.all(
        selectedHoursList.map(async entry => {
          const [userId, eventId] = entry.split(' ');
          return AFCBackend.get(`/hours/decline/${userId}/${eventId}`);
        }),
      );
      toast.success(
        `Successfully declined ${selectedHoursList.length} log${
          selectedHoursList.length !== 1 ? 's' : ''
        }`,
      );
      setRefresh(true);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const declineAllHours = async () => {
    try {
      await Promise.all(
        unapprovedVolunteersData.map(async ({ key }) => {
          const [userId, eventId] = key.split(' ');
          return AFCBackend.get(`/hours/decline/${userId}/${eventId}`);
        }),
      );
      toast.success(
        `Successfully declined ${unapprovedVolunteersData.length} log${
          unapprovedVolunteersData.length !== 1 ? 's' : ''
        }`,
      );
      setRefresh(true);
    } catch (e) {
      toast.error(e.message);
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
            user: (
              <a className={styles['dg-emphasis']} href={`/profile/${userData.userId}`}>
                {userData.firstName} {userData.lastName}
              </a>
            ),
            organizations: userData.organization,
            event_name: (
              <a className={styles['dg-emphasis']} href={`/event/view/${v.event.eventId}`}>
                {v.event.name}
              </a>
            ),
            date: v.event.startDatetime.slice(0, 10),
            start: v.event.startDatetime.slice(11, 16),
            end: v.event.endDatetime.slice(11, 16),
            approval: (
              <Space>
                <Button
                  type="secondary"
                  onClick={() =>
                    declineHours(v.userId, v.eventId, userData.firstName, v.event.name)
                  }
                >
                  {' '}
                  Decline{' '}
                </Button>
                <Button
                  type="primary"
                  onClick={() =>
                    approveHours(v.userId, v.eventId, userData.firstName, v.event.name)
                  }
                >
                  {' '}
                  Approve{' '}
                </Button>
              </Space>
            ),
            sort: {
              eventName: v.event.name,
              volunteerName: `${userData.firstName} ${userData.lastName}`,
              mostRecent: v.event.startDatetime,
            },
          };
        }),
      );

      setUnapprovedVolunteersData(
        unapprovedVolunteerHours.sort(sortFns[sortOption] ?? sortFns['Most Recent']),
      );
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onChange = e => {
    setSearch(e.target.value);
  };

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
    onChange: selectedRowKeys => {
      setSelectedHours(selectedRowKeys);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const sortByMenu = (
    <Menu className={styles.menu}>
      <Menu.Item key="time+" onClick={() => setSortOption('Most Recent')}>
        Most Recent
      </Menu.Item>
      <Menu.Item key="time-" onClick={() => setSortOption('Oldest')}>
        Oldest
      </Menu.Item>
      <Menu.Item key="ename+" onClick={() => setSortOption('Event Name (A - Z)')}>
        Event Name (A - Z)
      </Menu.Item>
      <Menu.Item key="ename-" onClick={() => setSortOption('Event Name (Z - A)')}>
        Event Name (Z - A)
      </Menu.Item>
      <Menu.Item key="vname+" onClick={() => setSortOption('Volunteer Name (A - Z)')}>
        Volunteer Name (A - Z)
      </Menu.Item>
      <Menu.Item key="vname-" onClick={() => setSortOption('Volunteer Name (Z - A)')}>
        Volunteer Name (Z - A)
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (!refresh) {
      return;
    }
    getUnapprovedVolunteers();
    setSelectedHours([]);
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    if (!search) {
      getUnapprovedVolunteers();
    }
    getUnapprovedVolunteers(search);
  }, [search]);

  useEffect(() => {
    if (!unapprovedVolunteersData) {
      return;
    }
    setUnapprovedVolunteersData([
      ...unapprovedVolunteersData.sort(sortFns[sortOption] ?? sortFns['Most Recent']),
    ]);
  }, [sortOption]);

  return (
    <div className={styles['hours-container']}>
      <Title className={styles['review-volunteer-logs-title']}>Review Volunteer Hour Logs</Title>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div className={styles['search-bar']}>
          <Input
            prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
            size="large"
            placeholder="Search by name, organization, event..."
            onChange={onChange}
            allowClear
          />
          <div className={styles.filters}>
            <div className={styles['sort-by-text']}>Sort by:</div>
            <Dropdown overlay={sortByMenu}>
              <Button className={styles['dropdown-button']}>
                {sortOption}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className={styles['table-header']}>
          <div className={styles['search-table-title']}>Search Table</div>
          <div className={styles['approve-action-buttons']}>
            {selectedHours.length === 0 ? (
              <>
                <Button
                  className={styles['decline-button']}
                  type="secondary"
                  size="large"
                  onClick={declineAllHours}
                >
                  Decline All
                </Button>
                <Button
                  className={styles['approve-button']}
                  type="primary"
                  size="large"
                  onClick={approveAllHours}
                >
                  Approve All
                </Button>
              </>
            ) : (
              <>
                <Button
                  className={styles['decline-button']}
                  type="secondary"
                  size="large"
                  onClick={() => declineMultipleHours(selectedHours)}
                >
                  Decline Selected
                </Button>
                <Button
                  className={styles['approve-button']}
                  type="primary"
                  size="large"
                  onClick={() => approveMultipleHours(selectedHours)}
                >
                  Approve Selected
                </Button>
              </>
            )}
          </div>
        </div>
        <div className={styles['table-container']}>
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={unapprovedVolunteersData}
          />
        </div>
      </Space>
    </div>
  );
};

export default Hours;
