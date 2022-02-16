import React, { useState, useEffect } from 'react';
import { FieldTimeOutlined, ScheduleOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { ConfigProvider, Table, Button } from 'antd';
import './VolunteeringHistory.css';
import EditHours from './EditHours';
import SuccessModal from './SuccessModal';

function VolunteeringHistory() {
  const [totalHours, setTotalHours] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [peopleImpacted, setPeopleImpacted] = useState(0);
  const [unsubmittedData, setUnsubmittedData] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTotalHours(230);
    setEventCount(0);
    setPeopleImpacted(0);

    const data = [];
    const data2 = [];
    /*
    fetch(BACKEND_URL)
      .then((res) => {
        setVolunteerData(res);
      })
    */
    for (let i = 0; i < 5; i += 1) {
      data.push({
        key: i,
        name: `EventName ${i}`,
        date: '01/01/2021',
        timeIn: '09:00',
        timeOut: '09:00',
        submit: i,
        edit: i,
      });
    }

    for (let i = 0; i < 5; i += 1) {
      data2.push({
        key: i,
        name: `EventName ${i}`,
        date: '01/01/2021',
        timeIn: '09:00',
        timeOut: '09:00',
        hours: 0,
      });
    }
    setUnsubmittedData(data);
    setSubmittedData(data2);
    setLoading(false);
  }, []);

  const handleSubmit = index => {
    setEditIndex(index);
    setIsSubmitted(true);
    /*
    fetch(BACKEND_URL)
      .then((res) => {
        setVolunteerData(res);
      })
    */
  };

  const handleEdit = index => {
    setEditIndex(index);
    setIsEditing(true);
    /*
    fetch(BACKEND_URL)
      .then((res) => {
        setVolunteerData(res);
      })
    */
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
      render: text => (
        <a style={{ color: '#115740' }} href="/volunteers">
          {text}
        </a>
      ),
      width: '25em',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '15em',
    },
    {
      title: 'Time In',
      dataIndex: 'timeIn',
      key: 'timeIn',
      width: '15em',
    },
    {
      title: 'Time Out',
      dataIndex: 'timeOut',
      key: 'timeOut',
      width: '15em',
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
      render: text => (
        <a style={{ color: '#115740' }} href="/volunteers">
          {text}
        </a>
      ),
      width: '25em',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '15em',
    },
    {
      title: 'Time In',
      dataIndex: 'timeIn',
      width: '15em',
    },
    {
      title: 'Time Out',
      dataIndex: 'timeOut',
      width: '15em',
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
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
      {isSubmitted && (
        <SuccessModal
          setIsSubmitted={setIsSubmitted}
          volunteerHours={unsubmittedData[editIndex].hours}
        />
      )}
      {isEditing && (
        <EditHours
          setIsEditing={setIsEditing}
          changeUnsubmittedData={changeUnsubmittedData}
          eventName={unsubmittedData[editIndex].name}
          date={unsubmittedData[editIndex].date}
          timeIn={unsubmittedData[editIndex].timeIn}
          timeOut={unsubmittedData[editIndex].timeOut}
          notes=""
          index={editIndex}
        />
        /*
          timeIn, timeOut, and date are all treated as strings. not too sure what format the backend
          is going to serve to us in and wether or not we'll have to do string manipulation
        */
      )}
      <div className="historyTab">
        <div className="container">
          <p className="header">My Volunteering History</p>

          <div className="iconDiv">
            <div className="overviewDiv">
              <FieldTimeOutlined className="icon" />
              <p className="iconTxt">{totalHours} Volunteer Hours</p>
            </div>
            <div className="overviewDiv">
              <ScheduleOutlined className="icon" />
              <p className="iconTxt">{eventCount} Events</p>
            </div>
            <div className="overviewDiv">
              <UsergroupDeleteOutlined className="icon" />
              <p className="iconTxt">Impacted {peopleImpacted} People</p>
            </div>
          </div>

          <p className="tableHeader">Unsubmitted Hours</p>
          <Table
            className="table"
            columns={unsubmittedColumns}
            loading={isLoading}
            dataSource={unsubmittedData}
            pagination={false}
          />

          <p className="tableHeader">Submitted Hours</p>
          <Table
            className="table"
            columns={submittedColumns}
            loading={isLoading}
            dataSource={submittedData}
            pagination={false}
          />
          <div className="spacer" />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default VolunteeringHistory;
