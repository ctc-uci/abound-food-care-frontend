import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FieldTimeOutlined, ScheduleOutlined } from '@ant-design/icons';
import { ConfigProvider, Table, Button, Space, Typography } from 'antd';
import { AFCBackend } from '../../util/utils';
import './VolunteeringHistory.css';
import EditHours from '../volunteer-profile-history/EditHours';

const { Title } = Typography;

function VolunteeringHistory({ userId }) {
  const [hoursCount, setHoursCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [unsubmittedData, setUnsubmittedData] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const parseDate = date => {
    return new Date(date).toLocaleDateString();
    /*
    console.log(newDate);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    const year = date.substring(0, 4);
    return `${month}/${day}/${year}`;
    */
  };

  const parseTime = time => {
    const timeString = new Date(time).toLocaleTimeString();
    return (
      timeString.substring(0, timeString.length - 6) +
      timeString.substring(timeString.length - 3, timeString.length)
    );
    /*
    let startTime = time.substring(11, 16);
    if (parseInt(startTime.substring(0, 2), 10) > 12) {
      startTime = `${parseInt(startTime.substring(0, 2), 10) - 12}:${startTime.substring(3, 5)} pm`;
    } else if (parseInt(startTime.substring(0, 2), 10) > 9) {
      startTime = `${startTime.substring(0, 5)} am`;
    } else if (parseInt(startTime.substring(0, 2), 10) == 0) {
      startTime = `12:${startTime.substring(3, 5)} am`;
    } else {
      startTime = `${startTime.substring(1, 5)} am`;
    }
    return startTime;
    */
  };

  const getEventsCount = async () => {
    const { data: res } = await AFCBackend.get(`/volunteers/${userId}/total-events`);
    setEventCount(res.count);
  };

  const getHoursCount = async () => {
    const { data: res } = await AFCBackend.get(`/hours/user/${userId}/total`);
    setHoursCount(res.count);
  };

  const setAllHoursData = async () => {
    const { data: res } = await AFCBackend.get(`/hours/${userId}`);
    const unsubmittedHoursData = [];
    const submittedHoursData = [];
    for (let i = 0; i < res.length; i += 1) {
      if (res[i].submitted === false && res[i].declined === false) {
        unsubmittedHoursData.push(res[i]);
      } else if (res[i].submitted === true && res[i].declined === false) {
        submittedHoursData.push(res[i]);
      }
    }

    for (let i = 0; i < submittedHoursData.length; i += 1) {
      submittedHoursData[i].key = i;
    }
    setSubmittedData(submittedHoursData);

    for (let i = 0; i < unsubmittedHoursData.length; i += 1) {
      unsubmittedHoursData[i].key = i;
      unsubmittedHoursData[i].edit = i;
      unsubmittedHoursData[i].approveOrDecline = i;
    }
    setUnsubmittedData(unsubmittedHoursData);
  };

  useEffect(() => {
    getEventsCount();
    getHoursCount();
    setAllHoursData();
    setLoading(false);
  }, [isSubmitted, isDeclined]);

  // update approved status to true
  // update submitted status to true
  const handleApprove = async index => {
    setEditIndex(index);
    const payload = {
      startDatetime: new Date(unsubmittedData[index].startDatetime),
      endDatetime: new Date(unsubmittedData[index].endDatetime),
      submitted: true,
      approved: true,
      declined: false,
      notes: unsubmittedData[index].event.notes,
    };

    await AFCBackend.post(`/hours/${userId}/${unsubmittedData[index].eventId}`, payload);
    setIsDeclined(true);
  };

  // change declined status to true
  // disappears from admin hours page
  // remains in the volunteer hours page
  const handleDecline = async index => {
    setEditIndex(index);
    const payload = {
      startDatetime: new Date(unsubmittedData[index].startDatetime),
      endDatetime: new Date(unsubmittedData[index].endDatetime),
      submitted: false,
      approved: false,
      declined: true,
      notes: unsubmittedData[index].event.notes,
    };

    await AFCBackend.post(`/hours/${userId}/${unsubmittedData[index].eventId}`, payload);
    setIsSubmitted(true);
  };

  const handleEdit = index => {
    setEditIndex(index);
    setIsEditing(true);
  };

  const changeUnsubmittedData = (index, newVal) => {
    const data = [];
    for (let i = 0; i < index; i += 1) {
      data.push(unsubmittedData[i]);
    }
    data.push(newVal);
    for (let i = index + 1; i < unsubmittedData.length; i += 1) {
      data.push(unsubmittedData[i]);
    }
    setUnsubmittedData(data);
  };

  const unsubmittedColumns = [
    {
      title: 'Event Name',
      dataIndex: ['event', 'name'],
      key: 'name',
      render: text => <a href="/volunteers">{text}</a>,
      width: '25em',
    },
    {
      title: 'Date',
      dataIndex: 'startDatetime',
      key: 'startDatetime',
      width: '15em',
      render: text => <p>{text ? parseDate(text) : ''}</p>,
    },
    {
      title: 'Time In',
      dataIndex: 'startDatetime',
      key: 'startDatetime',
      width: '15em',
      render: text => <p>{text ? parseTime(text) : ''}</p>,
    },
    {
      title: 'Time Out',
      dataIndex: 'endDatetime',
      key: 'endDatetime',
      width: '15em',
      render: text => <p>{text ? parseTime(text) : ''}</p>,
    },
    {
      title: 'Approve or Decline',
      dataIndex: 'approveOrDecline',
      key: 'approveOrDecline',
      render: index => (
        <Space>
          <Button
            className="decline-btn"
            disabled={isEditing}
            onClick={async () => {
              await handleDecline(index);
            }}
          >
            Decline
          </Button>
          <Button
            type="primary"
            disabled={isEditing}
            onClick={async () => {
              await handleApprove(index);
            }}
          >
            Approve
          </Button>
        </Space>
      ),
    },
    {
      title: 'Edit Info',
      dataIndex: 'edit',
      key: 'edit',
      render: index => (
        <Button disabled={isEditing} onClick={() => handleEdit(index)}>
          Edit
        </Button>
      ),
    },
  ];

  const submittedColumns = [
    {
      title: 'Event Name',
      dataIndex: ['event', 'name'],
      key: 'name',
      render: text => <a href="/volunteers">{text}</a>,
      width: '25em',
    },
    {
      title: 'Date',
      dataIndex: 'startDatetime',
      key: 'startDatetime',
      width: '15em',
      render: text => <p>{text ? parseDate(text) : ''}</p>,
    },
    {
      title: 'Time In',
      dataIndex: 'startDatetime',
      width: '15em',
      render: text => <p>{text ? parseTime(text) : ''}</p>,
    },
    {
      title: 'Time Out',
      dataIndex: 'endDatetime',
      width: '15em',
      render: text => <p>{text ? parseTime(text) : ''}</p>,
    },
    {
      title: 'Hours',
      dataIndex: 'numHours',
      key: 'hours',
      render: hours => <p>{hours}</p>,
    },
  ];

  ConfigProvider.config({
    theme: {
      primaryColor: '#115740',
    },
  });

  return (
    <ConfigProvider>
      {isEditing && (
        <EditHours
          setIsEditing={setIsEditing}
          changeUnsubmittedData={changeUnsubmittedData}
          eventName={unsubmittedData[editIndex].event.name}
          date={unsubmittedData[editIndex].startDatetime}
          timeIn={unsubmittedData[editIndex].startDatetime}
          timeOut={unsubmittedData[editIndex].endDatetime}
          notes={unsubmittedData[editIndex].event.notes}
          eventId={unsubmittedData[editIndex].eventId}
          index={editIndex}
        />
      )}
      <div className="historyTab">
        <div className="container">
          <Title>My Volunteering History</Title>

          <div className="iconDiv">
            <div className="overviewDiv">
              <FieldTimeOutlined className="icon" />
              <p className="iconTxt">{hoursCount} Volunteer Hours</p>
            </div>
            <div className="overviewDiv">
              <ScheduleOutlined className="icon" />
              <p className="iconTxt">{eventCount} Events</p>
            </div>
            {/*
              <div className="overviewDiv">
                <UsergroupDeleteOutlined className="icon" />
                <p className="iconTxt">Impacted {peopleImpacted} People</p>
              </div>
              */}
          </div>

          <p className="tableHeader">Unsubmitted Hours</p>
          <Table
            className="table"
            columns={unsubmittedColumns}
            loading={isLoading}
            dataSource={unsubmittedData}
            pagination={false}
            scroll
          />

          <p className="tableHeader">Submitted Hours</p>
          <Table
            className="table"
            columns={submittedColumns}
            loading={isLoading}
            dataSource={submittedData}
            pagination={false}
            scroll
          />
          <div className="spacer" />
        </div>
      </div>
    </ConfigProvider>
  );
}

VolunteeringHistory.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default VolunteeringHistory;
