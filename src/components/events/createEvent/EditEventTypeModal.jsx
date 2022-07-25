import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const EditEventTypeModal = ({
  editVisible,
  setEditVisible,
  eventsData,
  setEventsData,
  editName,
  editDescription,
}) => {
  const [eventName, setEventName] = useState(editName);
  const [eventDescription, setEventDescription] = useState(editDescription);

  const onCancel = () => {
    setEditVisible(false);
  };
  const handleEventChange = e => {
    const { value } = e.target;
    setEventName(value);
  };
  const handleDescriptionChange = e => {
    const { value } = e.target;
    setEventDescription(value);
  };
  const handleSave = () => {
    // build a new event object to add to eventsData
    const newEventType = {
      name: eventName,
      description: eventDescription,
    };
    // call setEventsData to update the eventsData state
    setEventsData([...eventsData.filter(type => type.name !== editName), newEventType]);
    setEditVisible(false);
  };
  return (
    <>
      <Modal
        visible={editVisible}
        animation={false}
        title="Edit Event Type"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Form requiredMark>
          <Form.Item label="Event Type Name" rules={[{ required: true }]}>
            <Input onChange={handleEventChange} defaultValue={eventName} />
          </Form.Item>
          <Form.Item label="Description" rules={[{ required: true }]}>
            <Input onChange={handleDescriptionChange} defaultValue={eventDescription} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

EditEventTypeModal.propTypes = {
  editVisible: PropTypes.bool.isRequired,
  setEditVisible: PropTypes.func.isRequired,
  eventsData: PropTypes.arrayOf(Object).isRequired,
  setEventsData: PropTypes.func.isRequired,
  editName: PropTypes.string.isRequired,
  editDescription: PropTypes.string.isRequired,
};

export default EditEventTypeModal;
