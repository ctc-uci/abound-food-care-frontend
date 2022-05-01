import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FieldTimeOutlined, ScheduleOutlined } from '@ant-design/icons';
import { ConfigProvider, Table, Button } from 'antd';
import './VolunteeringHistory.css';
import styled from 'styled-components';
import EditHours from '../../components/volunteer-profile-history/EditHours';
import SuccessModal from '../../components/volunteer-profile-history/SuccessModal';

const ShadowBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`;

function VolunteeringHistory() {
  const [userId, setUserId] = useState(2);
  const [totalHours, setTotalHours] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [unsubmittedData, setUnsubmittedData] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [submittedHours, setSubmittedHours] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const parseDate = date => {
    return new Date(date).toLocaleDateString();
  };

  const parseTime = time => {
    const timeString = new Date(time).toLocaleTimeString();
    return (
      timeString.substring(0, timeString.length - 6) +
      timeString.substring(timeString.length - 3, timeString.length)
    );
  };

  const removeFromUnsubmitted = index => {
    const data = [];
    for (let i = 0; i < index; i += 1) {
      data.push(unsubmittedData[i]);
    }
    for (let i = index + 1; i < unsubmittedData.length; i += 1) {
      data.push(unsubmittedData[i]);
    }
    setUnsubmittedData(data);
  };

  useEffect(() => {
    setUserId(3);
    axios.get(`http://localhost:3001/hours/statistics/${userId}`).then(res => {
      setEventCount(res.data[0].event_count);
      setTotalHours(res.data[0].hours);
    });

    let data = [];
    let data2 = [];
    axios.get(`http://localhost:3001/hours/unsubmittedUser/${userId}`).then(res => {
      data = res.data;
      for (let i = 0; i < data.length; i += 1) {
        data[i].key = i;
        data[i].edit = i;
        data[i].submit = i;
      }
      setUnsubmittedData(data);
    });

    axios.get(`http://localhost:3001/hours/submittedUser/${userId}`).then(res => {
      data2 = res.data;
      for (let i = 0; i < data2.length; i += 1) {
        data2[i].key = i;
      }
      setSubmittedData(data2);
    });

    setLoading(false);
  }, []);

  const handleSubmit = i => {
    setEditIndex(i);
    const body = {
      userId,
      eventId: unsubmittedData[i].event_id,
      startDatetime: new Date(unsubmittedData[i].start_datetime),
      endDatetime: new Date(unsubmittedData[i].end_datetime),
      approved: false,
      notes: unsubmittedData[i].notes,
    };
    axios.put('http://localhost:3001/hours/submit', body).then(res => {
      setIsSubmitted(true);
      setSubmittedHours(res.data[0].num_hours);
      removeFromUnsubmitted(i);

      let data = [];
      axios.get(`http://localhost:3001/hours/submittedUser/${userId}`).then(res2 => {
        data = res2.data;
        for (let j = 0; j < data.length; j += 1) {
          data[j].key = j;
        }
        setSubmittedData(data);
      });
    });
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
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="/volunteers">{text}</a>,
      width: '25em',
    },
    {
      title: 'Date',
      dataIndex: 'start_datetime',
      key: 'date',
      width: '15em',
      render: text => <p>{text ? parseDate(text) : ''}</p>,
    },
    {
      title: 'Time In',
      dataIndex: 'start_datetime',
      key: 'timeIn',
      width: '15em',
      render: text => <p>{text ? parseTime(text) : ''}</p>,
    },
    {
      title: 'Time Out',
      dataIndex: 'end_datetime',
      key: 'timeOut',
      width: '15em',
      render: text => <p>{text ? parseTime(text) : ''}</p>,
    },
    {
      title: 'Submit?',
      dataIndex: 'submit',
      key: 'submit',
      render: index => (
        <Button type="primary" disabled={isEditing} onClick={() => handleSubmit(index)}>
          Submit
        </Button>
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
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="/volunteers">{text}</a>,
      width: '25em',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '15em',
      render: text => <p>{text ? parseDate(text) : ''}</p>,
    },
    {
      title: 'Time In',
      dataIndex: 'start_datetime',
      width: '15em',
      render: text => <p>{text ? parseTime(text) : ''}</p>,
    },
    {
      title: 'Time Out',
      dataIndex: 'end_datetime',
      width: '15em',
      render: text => <p>{text ? parseTime(text) : ''}</p>,
    },
    {
      title: 'Hours',
      dataIndex: 'num_hours',
      key: 'hours',
      render: hours => <p>{hours}</p>,
    },
    {
      title: 'Approved?',
      dataIndex: 'approved',
      key: 'approved',
      render: approved => <p>{approved ? 'Yes' : 'Not yet'}</p>,
    },
  ];

  ConfigProvider.config({
    theme: {
      primaryColor: '#115740',
    },
  });

  return (
    <ConfigProvider>
      {isSubmitted && (
        <SuccessModal setIsSubmitted={setIsSubmitted} volunteerHours={submittedHours} />
      )}
      {isEditing && (
        <EditHours
          setIsEditing={setIsEditing}
          changeUnsubmittedData={changeUnsubmittedData}
          eventName={unsubmittedData[editIndex].name}
          date={unsubmittedData[editIndex].start_datetime}
          timeIn={unsubmittedData[editIndex].start_datetime}
          timeOut={unsubmittedData[editIndex].end_datetime}
          notes={unsubmittedData[editIndex].notes}
          eventId={unsubmittedData[editIndex].event_id}
          index={editIndex}
        />
      )}
      <div className="historyTab">
        <div className="container">
          <p className="tableHeader">My Volunteering History</p>

          <div className="iconDiv">
            <div className="overviewDiv">
              <FieldTimeOutlined className="icon" />
              <p className="iconTxt">{totalHours} Volunteer Hours</p>
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

          <ShadowBox>
            <p className="tableHeader">Unsubmitted Hours</p>
            <Table
              columns={unsubmittedColumns}
              loading={isLoading}
              dataSource={unsubmittedData}
              pagination={false}
            />
          </ShadowBox>
          <div className="spacer" />
          <ShadowBox>
            <p className="tableHeader">Submitted Hours</p>
            <Table
              columns={submittedColumns}
              loading={isLoading}
              dataSource={submittedData}
              pagination={false}
            />
          </ShadowBox>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default VolunteeringHistory;
