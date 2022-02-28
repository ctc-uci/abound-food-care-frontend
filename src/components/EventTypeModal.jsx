import React, { useState } from 'react';
import { Button, Modal, Card, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import AddEventTypeModal from './AddEventTypeModal';

ConfigProvider.config({
  theme: {
    primaryColor: '#115740',
  },
});

const EventTypeModal = ({ visible, setVisible, eventsData, setEventsData }) => {
  const [addVisible, setAddVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };

  const handleAddEvent = () => {
    setAddVisible(true);
  };

  return (
    <ConfigProvider>
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
                  <Button type="link">Edit</Button>|<Button type="link">Delete</Button>
                </div>
              </Card>
            </>
          );
        })}
      </Modal>
      <div>
        {addVisible && (
          <AddEventTypeModal
            eventsData={eventsData}
            setEventsData={setEventsData}
            addVisible={addVisible}
            setAddVisible={setAddVisible}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

EventTypeModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  eventsData: PropTypes.arrayOf(Object).isRequired,
  setEventsData: PropTypes.func.isRequired,
};

export default EventTypeModal;
