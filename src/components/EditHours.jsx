import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Input, DatePicker, TimePicker } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import ErrorModal from './ErrorModal';

const EditHours = props => {
  const {
    changeUnsubmittedData,
    setIsEditing,
    eventName,
    timeIn,
    timeOut,
    date,
    notes,
    index,
    eventId,
  } = props;
  const [newTimeIn, setNewTimeIn] = useState('');
  const [newTimeOut, setNewTimeOut] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setNewDate(date);
    setNewTimeIn(timeIn);
    setNewTimeOut(timeOut);
    setNewNotes(notes);
  }, []);

  const setTimeInVal = e => {
    if (e && e.toISOString) {
      setNewTimeIn(e.toISOString());
    } else {
      setNewTimeIn('');
    }
  };

  const setTimeOutVal = e => {
    if (e && e.toISOString) {
      setNewTimeOut(e.toISOString());
    } else {
      setNewTimeOut('');
    }
  };

  const setDateVal = e => {
    if (e && e.toISOString) {
      setNewDate(e.toISOString());
    } else {
      setNewDate('');
    }
  };

  const setNotesVal = e => {
    setNewNotes(e.target.value);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (newDate !== '' && newTimeIn !== '' && newTimeOut !== '') {
      const dateSubstring = newDate.substring(0, 10);
      const startSubstring = newTimeIn.substring(11, newTimeIn.length);
      const endSubstring = newTimeOut.substring(11, newTimeOut.length);
      const startTime = `${dateSubstring}T${startSubstring}`;
      const endTime = `${dateSubstring}T${endSubstring}`;

      changeUnsubmittedData(index, {
        key: index,
        name: eventName,
        date: newDate,
        start_datetime: startTime,
        end_datetime: endTime,
        event_id: eventId,
        notes: newNotes,
        submit: index,
        edit: index,
      });
      setIsEditing(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div>
      {isError && <ErrorModal setIsError={setIsError} />}
      <div
        style={{
          borderRadius: '.2em',
          position: 'fixed',
          bottom: '31.5vh',
          right: '30.5vw',
          zIndex: 2,
          backgroundColor: '#FFFFFF',
          width: '39vw',
          height: '28vh',
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
          {/*
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
            defaultValue={eventName}
            onChange={setEventNameVal}
            size="small"
            style={{ width: '64%' }}
            placeholder="Name of the event"
          />
        </div>
          */}

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
            <DatePicker
              defaultValue={() => moment(new Date(timeIn))}
              onChange={setDateVal}
              size="small"
              style={{ width: '50%' }}
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
            <p style={{ width: '30%', paddingRight: '2%', margin: 0, textAlign: 'right' }}>Time:</p>
            <TimePicker
              defaultValue={() => moment(new Date(timeIn))}
              onChange={setTimeInVal}
              size="small"
              style={{ width: '27%' }}
              placeholder="Time in"
            />
            <TimePicker
              defaultValue={() => moment(new Date(timeOut))}
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
              defaultValue={notes}
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
  eventId: PropTypes.number,
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
  eventId: 0,
};

export default EditHours;
