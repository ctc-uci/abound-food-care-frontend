import React from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Hours = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);

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
        <>
          <Button type="primary"> Approve </Button>
          <Button type="primary"> Decline </Button>
        </>
      ),
    },
  ];

  const data = [];

  for (let i = 0; i < 20; i += 1) {
    data.push({
      key: i,
      user: i,
      organizations: 'CTC',
      event_name: 'All-Hands',
      start: '11/6/2022',
      end: '11/7/2022',
      approval: 'Approved',
    });
  }

  const rowSelection = {
    onChange: selectedRowKeys => {
      setSelectedRows(selectedRowKeys);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <h1>Review Volunteer Hour Logs</h1>
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
      <Button type="primary" disabled={selectedRows === 0}>
        Primary Button
      </Button>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Hours;
