import React from 'react';
import 'antd/dist/antd.variable.min.css';
import '../volunteer-database/database.css';
import { Input, Button, Row, Col, Modal } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

function DeclinePopup({ setIsModalVisible, name, organization, event, date, start, end }) {
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
        <Button type="primary" style={{ backgroundColor: '#115740' }} key="send">
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
          <Input placeholder={event} disabled />
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Date</p>
        </Col>
        <Col xs={24} xl={4}>
          <Input placeholder={date} disabled />
        </Col>
        <Col span={1} />
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Time In</p>
        </Col>
        <Col xs={24} xl={3}>
          <Input placeholder={start} disabled />
        </Col>
        <Col span={1} />
        <Col span={3}>
          <p style={{ textAlign: 'right', marginRight: '10%' }}>Time Out</p>
        </Col>
        <Col xs={24} xl={3}>
          <Input placeholder={end} disabled />
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
          <TextArea placeholder="Add any additional information here." autoSize={{ minRows: 2 }} />
        </Col>
      </Row>
    </Modal>
  );
}

DeclinePopup.defaultProps = {
  setIsModalVisible: null,
  name: '',
  organization: '',
  event: '',
  date: '',
  start: '',
  end: '',
};

DeclinePopup.propTypes = {
  setIsModalVisible: PropTypes.func,
  name: PropTypes.string,
  organization: PropTypes.string,
  event: PropTypes.string,
  date: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
};

export default DeclinePopup;
