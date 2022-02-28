import React from 'react';
import { Button, Modal, Card, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

ConfigProvider.config({
  theme: {
    primaryColor: '#115740',
  },
});

const EventTypeModal = ({ visible, setVisible }) => {
  const defaultEventTypes = [
    {
      name: 'Distribution',
      description:
        'Events where volunteers assist in distributing food - duties may include loading cars, taking data, packaging produce & meal, and traffic.',
    },
    {
      name: 'Food Running',
      description: 'Events where volunteers transport food safely from donor to recipient.',
    },
  ];

  const onCancel = () => {
    setVisible(false);
  };

  const handleAddEvent = () => {
    // console.log(e.target.value);
    setVisible(false); // change this
  };

  return (
    <ConfigProvider>
      <Modal
        visible={visible}
        animation={false}
        title="EventType"
        onCancel={onCancel}
        footer={[
          <Button key="add" type="primary" onClick={handleAddEvent}>
            Add Event Type
          </Button>,
        ]}
      >
        {defaultEventTypes.map(eventType => {
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
    </ConfigProvider>
  );
};

EventTypeModal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

EventTypeModal.defaultProps = {
  visible: false,
  setVisible: () => {},
};

export default EventTypeModal;
