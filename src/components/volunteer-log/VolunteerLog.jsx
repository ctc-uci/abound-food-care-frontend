import React, { useState, useEffect } from 'react'; // cant commit without forcing past eslint or not importing usestate since its unfinished
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { AFCBackend } from '../../util/utils';
import { auth, getCurrentUser } from '../../util/auth_utils';
import EditEvents from './edit-events/EditEvents';

import styles from './VolunteerLog.module.css';

const VolunteerLog = ({ submitted, refreshHours, setRefreshHours }) => {
  const [hours, setHours] = useState([]);
  const [userId, setUserId] = useState();
  const [editEventModalIsOpen, setEditEventModalIsOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState({});
  // const [unsubmittedData, setUnsubmittedData] = useState([]);
  // const [editIndex, setEditIndex] = useState(0); based on eventpage
  // const editEvent = async () => {
  //   //  create popup, then send that info to post request
  //   <EditEvents/>;
  // };

  const padTo2Digits = num => {
    return num.toString().padStart(2, '0');
  };

  const formatDate = date => {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join('/');
  };

  const getVolunteerLogs = async uid => {
    const { data: res } = await AFCBackend.get(`/volunteers/logs/${uid}`, {
      params: {
        submitted,
      },
    });
    const formattedData = res.map(data => ({
      ...data,
      startDatetimeFormatted: new Date(data.startDatetime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      endDatetimeFormatted: new Date(data.endDatetime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      date: formatDate(new Date(data.startDatetime)),
    }));
    setHours(formattedData);
  };
  const submitEvent = async eventId => {
    await AFCBackend.post(`/volunteers/${userId}/${eventId}/submit`);
    setRefreshHours(!refreshHours);
  };

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time In',
      dataIndex: 'startDatetimeFormatted',
      key: 'startDatetimeFormatted',
    },
    {
      title: 'Time out',
      dataIndex: 'endDatetimeFormatted',
      key: 'endDatetimeFormatted',
    },
  ];
  const additionalColumns = {
    false: [
      {
        title: 'Submit?',
        dataIndex: 'submit',
        key: 'submit',
        render: (text, record) => (
          <Button
            className={styles['submit-button']}
            onClick={async () => submitEvent(record.eventId)}
          >
            Submit
          </Button>
        ),
      },
      {
        title: 'Edit Info',
        dataIndex: 'editinfo',
        key: 'editinfo',
        render: (text, record) => (
          <Button
            onClick={() => {
              setRecordToEdit(record);
              setEditEventModalIsOpen(true);
            }}
          >
            Edit
          </Button>
        ),
      },
    ],
    true: [
      {
        title: 'Hours',
        dataIndex: 'numHours',
        key: 'numHours',
      },
    ],
  };

  useEffect(async () => {
    const { uid } = await getCurrentUser(auth);
    await getVolunteerLogs(uid);
    setUserId(uid);
  }, []);

  useEffect(async () => {
    await getVolunteerLogs(userId);
  }, [refreshHours]);
  return (
    <>
      <EditEvents
        isOpen={editEventModalIsOpen}
        setIsOpen={setEditEventModalIsOpen}
        record={recordToEdit}
        userId={userId}
        refreshHours={refreshHours}
        setRefreshHours={setRefreshHours}
      />
      <Table dataSource={hours} columns={columns.concat(additionalColumns[submitted])} />
    </>
  );
};

VolunteerLog.propTypes = {
  submitted: PropTypes.bool.isRequired,
  refreshHours: PropTypes.bool.isRequired,
  setRefreshHours: PropTypes.func.isRequired,
};

export default VolunteerLog;
