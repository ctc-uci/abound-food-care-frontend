import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const AddEventTypeModal = ({ addVisible, setAddVisible, eventsData, setEventsData }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const onCancel = () => {
    setAddVisible(false);
  };
  const handleEventChange = e => {
    const { value } = e.target;
    setEventName(value);
  };
  const handleDescriptionChange = e => {
    const { value } = e.target;
    setEventDescription(value);
  };
  const handleAdd = () => {
    // build a new event object to add to eventsData
    const newEventType = {
      name: eventName,
      description: eventDescription,
    };
    // call setEventsData to update the eventsData state
    setEventsData([...eventsData, newEventType]);
    setAddVisible(false);
  };
  return (
    <>
      <Modal
        visible={addVisible}
        animation={false}
        title="Add Event Type"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAdd}>
            Add Event Type
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Event Type Name" rules={[{ required: true }]}>
            <Input
              onChange={handleEventChange}
              placeholder="Describe what events should go under this type"
            />
          </Form.Item>
          <Form.Item label="Description" rules={[{ required: true }]}>
            <Input
              onChange={handleDescriptionChange}
              placeholder="Describe what events should go under this type"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

AddEventTypeModal.propTypes = {
  addVisible: PropTypes.bool.isRequired,
  setAddVisible: PropTypes.func.isRequired,
  eventsData: PropTypes.arrayOf(Object).isRequired,
  setEventsData: PropTypes.func.isRequired,
};

export default AddEventTypeModal;
