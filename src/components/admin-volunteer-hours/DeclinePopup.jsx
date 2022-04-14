/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.variable.min.css';
import '../volunteer-database/database.css';
import { Input, Button, Row, Col, Modal } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const DeclinePopup = ({
  setIsModalVisible,
  name,
  userId,
  organization,
  eventName,
  eventId,
  startDate,
  endDate,
  startTime,
  endTime,
}) => {
  const [notes, setNotes] = useState('');
  const handleNotes = e => {
    setNotes(e.target.value);
  };
  const handleDecline = async () => {
    try {
      const startDatetime = `${startDate} ${startTime}`;
      const endDatetime = `${endDate} ${endTime}`;
      const payload = {
        startDatetime,
        endDatetime,
        submitted: false,
        approved: false,
        declined: true,
        notes,
      };
      await axios.post(`http://localhost:3001/hours/${userId}/${eventId}`, payload);
      setIsModalVisible(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Modal
      title="Decline Volunteer Hours"
      visible
      width={1000}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalVisible(false)}>
          Cancel
        </Button>,
        <Button
          type="primary"
          style={{ backgroundColor: '#115740' }}
          key="send"
          onClick={handleDecline}
        >
          Send
        </Button>,
      ]}
    >
      <h4>Details</h4>
      <Row>
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Volunteer</p>
        </Col>
        <Col xs={24} xl={21}>
          <Input placeholder={name} disabled />
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Organization(s)</p>
        </Col>
        <Col xs={24} xl={21}>
          <Input placeholder={organization} disabled />
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Event</p>
        </Col>
        <Col xs={24} xl={21}>
          <Input placeholder={eventName} disabled />
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Date</p>
        </Col>
        <Col xs={24} xl={4}>
          <Input placeholder={startDate} disabled />
        </Col>
        <Col span={1} />
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Time In</p>
        </Col>
        <Col xs={24} xl={3}>
          <Input placeholder={startTime} disabled />
        </Col>
        <Col span={1} />
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Time Out</p>
        </Col>
        <Col xs={24} xl={3}>
          <Input placeholder={endTime} disabled />
        </Col>
      </Row>
      <h4>Feedback</h4>
      <Row>
        <Col span={1} />
        <Col span={2}>
          <p style={{ textAlign: 'right' }}>Comments (Optional)</p>
        </Col>
        <Col span={1} />
        <Col xs={24} xl={20}>
          <TextArea
            placeholder="Add any additional information here."
            autoSize={{ minRows: 2 }}
            onChange={handleNotes}
          />
        </Col>
      </Row>
    </Modal>
  );
};

DeclinePopup.propTypes = {
  setIsModalVisible: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  organization: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
};

export default DeclinePopup;
