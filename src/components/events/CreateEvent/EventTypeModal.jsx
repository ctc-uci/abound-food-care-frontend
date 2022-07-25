import React, { useState } from 'react';
import { Button, Modal, Card } from 'antd';
import PropTypes from 'prop-types';
import AddEventTypeModal from './AddEventTypeModal';
import EditEventTypeModal from './EditEventTypeModal';

const EventTypeModal = ({ visible, setVisible, eventsData, setEventsData }) => {
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const onCancel = () => {
    setVisible(false);
  };

  const handleAddEvent = () => {
    setAddVisible(true);
  };

  const handleEditEvent = (name, description) => {
    setEditName(name);
    setEditDescription(description);
    setEditVisible(true);
  };

  const handleDeleteEvent = name => {
    const filteredData = eventsData.filter(eventType => {
      return eventType.name !== name;
    });
    setEventsData(filteredData);
  };

  return (
    <>
      <Modal
        visible={visible}
        animation={false}
        title="Event Types"
        onCancel={onCancel}
        footer={[
          <Button key="add" type="primary" onClick={handleAddEvent}>
            Add Event Type
          </Button>,
        ]}
      >
        {eventsData.map(eventType => {
          return (
            <>
              <Card key={eventType.name}>
                <b>{eventType.name}</b>
                <div>
                  <p>{eventType.description}</p>
                </div>
                <div>
                  <Button
                    type="link"
                    onClick={() => handleEditEvent(eventType.name, eventType.description)}
                    style={{ color: '#6CC24A' }}
                  >
                    Edit
                  </Button>
                  |
                  <Button
                    type="link"
                    onClick={() => handleDeleteEvent(eventType.name)}
                    style={{ color: '#6CC24A' }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </>
          );
        })}
      </Modal>
      <div>
        {editVisible && (
          <EditEventTypeModal
            eventsData={eventsData}
            setEventsData={setEventsData}
            editVisible={editVisible}
            setEditVisible={setEditVisible}
            editName={editName}
            editDescription={editDescription}
          />
        )}
        {addVisible && (
          <AddEventTypeModal
            eventsData={eventsData}
            setEventsData={setEventsData}
            addVisible={addVisible}
            setAddVisible={setAddVisible}
          />
        )}
      </div>
    </>
  );
};

EventTypeModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  eventsData: PropTypes.arrayOf(Object).isRequired,
  setEventsData: PropTypes.func.isRequired,
};

export default EventTypeModal;
