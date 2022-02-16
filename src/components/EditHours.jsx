import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Input, DatePicker, TimePicker } from 'antd';
import PropTypes from 'prop-types';

const EditHours = props => {
  const [newEventName, setNewEventName] = useState('');
  const [newTimeIn, setNewTimeIn] = useState('');
  const [newTimeOut, setNewTimeOut] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const { changeUnsubmittedData, setIsEditing, eventName, timeIn, timeOut, date, notes, index } =
    props;

  useEffect(() => {
    setNewEventName(eventName);
    setNewDate(date);
    setNewTimeIn(timeIn);
    setNewTimeOut(timeOut);
    setNewNotes(notes);
  }, []);

  const setEventNameVal = e => {
    setNewEventName(e.target.value);
  };

  const setTimeInVal = e => {
    setNewTimeIn(e.target.value);
  };

  const setTimeOutVal = e => {
    setNewTimeOut(e.target.value);
  };

  const setDateVal = e => {
    setNewDate(e.target.value);
  };

  const setNotesVal = e => {
    setNewNotes(e.target.value);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    changeUnsubmittedData(index, {
      key: index,
      name: newEventName,
      timeIn: newTimeIn,
      timeOut: newTimeOut,
      date: newDate,
      notes: newNotes,
      submit: index,
      edit: index,
    });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        borderRadius: '.2em',
        position: 'fixed',
        bottom: '31.5vh',
        right: '30.5vw',
        zIndex: 2,
        backgroundColor: '#FFFFFF',
        width: '39vw',
        height: '37vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow:
          '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        style={{
          height: '6vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '5vh',
            justifyContent: 'space-between',
            width: '92%',
            margin: 0,
            padding: 0,
          }}
        >
          <p
            style={{
              fontSize: '1em',
              fontWeight: 800,
              margin: 0,
              padding: 0,
            }}
          >
            Edit Hours
          </p>

          <CloseOutlined
            onClick={handleClose}
            style={{
              fontSize: '1em',
              color: '#AAAAAA',
            }}
          />
        </div>
        <Divider style={{ height: '.5vh', margin: 0, padding: 0 }} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '92%',
          height: '50%',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingBottom: '3%',
          }}
        >
          <p style={{ width: '30%', paddingRight: '2%', margin: 0, textAlign: 'right' }}>
            Event Name:
          </p>
          <Input
            onChange={setEventNameVal}
            size="small"
            style={{ width: '64%' }}
            placeholder="Name of the event"
          />
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingBottom: '3%',
          }}
        >
          <p style={{ width: '30%', paddingRight: '2%', margin: 0, textAlign: 'right' }}>Date:</p>
          <DatePicker onChange={setDateVal} size="small" style={{ width: '50%' }} />
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingBottom: '3%',
          }}
        >
          <p style={{ width: '30%', paddingRight: '2%', margin: 0, textAlign: 'right' }}>Time:</p>
          <TimePicker
            onChange={setTimeInVal}
            size="small"
            style={{ width: '27%' }}
            placeholder="Time in"
          />
          <TimePicker
            onChange={setTimeOutVal}
            size="small"
            style={{ width: '27%' }}
            placeholder="Time out"
          />
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <p style={{ width: '30%', paddingRight: '2%', margin: 0, textAlign: 'right' }}>
            Additional Notes:
          </p>
          <Input
            onChange={setNotesVal}
            size="small"
            style={{ width: '64%' }}
            placeholder="Please enter your work goals"
          />
        </div>
      </div>

      <div
        style={{
          height: '7vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          justifyContent: 'center',
        }}
      >
        <Divider style={{ height: '.5vh', margin: 0, padding: 0 }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '95%',
            height: '5.5vh',
          }}
        >
          <div
            style={{
              width: '26%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEdit} type="primary">
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditHours.propTypes = {
  setIsEditing: PropTypes.func,
  changeUnsubmittedData: PropTypes.func,
  eventName: PropTypes.string,
  date: PropTypes.string,
  timeIn: PropTypes.string,
  timeOut: PropTypes.string,
  notes: PropTypes.string,
  index: PropTypes.number,
};

EditHours.defaultProps = {
  setIsEditing: () => {},
  changeUnsubmittedData: () => {},
  eventName: '',
  date: '',
  timeIn: '',
  timeOut: '',
  notes: '',
  index: 0,
};

export default EditHours;
