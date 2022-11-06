import React, { useState } from 'react';
import { Table, Input, Button, Typography, Dropdown, Space } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import './Hours.css';

const { Title } = Typography;

const Hours = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const items = [
    {
      label: 'Submit and continue',
      key: '1',
    },
  ];

  const [loadings, setLoadings] = useState([]);

  const enterLoading = index => {
    setLoadings(state => {
      const newLoadings = [...state];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings(state => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
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
      render: () => (
        <Space>
          <Button type="secondary"> Decline </Button>
          <Button type="primary"> Approve </Button>
        </Space>
      ),
    },
  ];

  const data = [];

  for (let i = 0; i < 20; i += 1) {
    data.push({
      key: i,
      user: 'FirstName LastName',
      organizations: 'Organizationname',
      event_name: 'EventName',
      date: '01/01/2021',
      start: '9:00 am',
      end: '11:00 am',
    });
  }

  const rowSelection = {
    onChange: selectedRowKeys => {
      setSelectedRows(selectedRowKeys);
      selectedRows.clear();
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
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
            onPressEnter={null}
            onChange={null}
            allowClear
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Title>Review Volunteer Hour Logs</Title>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div className="search-bar">
          {searchBar()}
          <div className="filters">
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
          </div>
        </div>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </Space>
    </div>
  );
};

export default Hours;
