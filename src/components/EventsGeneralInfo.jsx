import React, { useState } from 'react';
import {
  DatePicker,
  Form,
  Input,
  Select,
  Button,
  TimePicker,
  InputNumber,
  Checkbox,
  Row,
  Col,
} from 'antd';
import EventTypeModal from './EventTypeModal';

const { Option } = Select;

const EventsGeneralInfo = () => {
  // const onFinish = values => {
  //   console.log(values);
  // };
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

  const defaultVolunteerTypes = [
    {
      name: 'type1',
    },
    {
      name: 'type2',
    },
    {
      name: 'type3',
    },
  ];

  const [componentSize, setComponentSize] = useState('default');
  const [eventTypeModal, setEventTypeModal] = useState(false); // visible, setVisible
  const [eventsData, setEventsData] = useState(defaultEventTypes);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleClickNewEventType = () => {
    setEventTypeModal(true);
  };

  // Volunteer Type
  const volunteerTypeMenu = defaultVolunteerTypes.map(event => {
    return <Option key={event.name}>{event.name}</Option>;
  });

  // Event Type Menu
  const eventTypeMenu = eventsData.map(event => {
    return <Option key={event.name}>{event.name}</Option>;
  });

  return (
    <div>
      <h1> General Information </h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        // name="nest-messages"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Event Name" rules={[{ required: true }]}>
          <Input placeholder="Ex. Food Running Event" />
        </Form.Item>

        <Form.Item label="Start Date / Time" rules={[{ required: true }]}>
          <DatePicker placeholder="Select date" />
          <TimePicker placeholder="Select time" />
        </Form.Item>

        <Form.Item label="End Date / Time" rules={[{ required: true }]}>
          <DatePicker placeholder="Select date" />
          <TimePicker placeholder="Select time" />
        </Form.Item>

        <Form.Item label="Event Type" rules={[{ required: true }]}>
          <Select placeholder="Type" style={{ width: '100px' }}>
            {eventTypeMenu}
          </Select>
          <Button type="link" onClick={handleClickNewEventType} style={{ color: '#6CC24A' }}>
            New Event Type
          </Button>
          <div>
            {eventTypeModal && (
              <EventTypeModal
                visible={eventTypeModal}
                setVisible={setEventTypeModal}
                eventsData={eventsData}
                setEventsData={setEventsData}
              />
            )}
          </div>
        </Form.Item>

        <Form.Item label="Num Volunteers" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Volunteer Type">
          <Select placeholder="Type" style={{ width: '100px' }}>
            {volunteerTypeMenu}
          </Select>
        </Form.Item>

        <Form.Item label="Requirements (optional)">
          <Checkbox.Group style={{ width: '100%' }}>
            {' '}
            {/* onChange={onChange}> */}
            {/* Add color for when state of checkbox is checked */}
            {/* Slightly change spacing */}
            <Row>
              <Col span={8}>
                <Checkbox value="Can Drive">Can Drive</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Adult (age 18+)">Adult (age 18+)</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Minor (age <18)">Minor (age &#60;18)</Checkbox>
              </Col>
              <br />
              <br />
              <Col span={8}>
                <Checkbox value="First Aid Training">First Aid Training</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Serve Safe Knowledge">Serve Safe Knowledge</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Transportation Experience">Transportation Experience</Checkbox>
              </Col>
              <br />
              <br />
              <Col span={8}>
                <Checkbox value="Moving / Warehouse Experience">
                  Moving / Warehouse Experience
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Food Service Industry Knowledge">
                  Food Service Industry Knowledge
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Location" rules={[{ required: true }]}>
          <Input placeholder="Ex. Irvine, CA" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventsGeneralInfo;
