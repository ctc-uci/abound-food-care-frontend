/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const EventsGeneralInfo = ({ states, setStates }) => {
  const {
    eventName,
    eventStartDate,
    eventStartTime,
    eventEndDate,
    eventEndTime,
    eventType,
    volunteerCapacity,
    canDrive,
    isAdult,
    isMinor,
    firstAidTraining,
    serveSafeKnowledge,
    transportationExperience,
    warehouseExperience,
    foodServiceKnowledge,
    eventAddressStreet,
    eventAddressCity,
    eventAddressState,
    eventAddressZip,
  } = states;

  const {
    setEventName,
    setEventStartDateTime,
    setEventEndDateTime,
    setEventStartDate,
    setEventStartTime,
    setEventEndDate,
    setEventEndTime,
    setEventType,
    setVolunteerCapacity,
    setCanDrive,
    setIsAdult,
    setIsMinor,
    setFirstAidTraining,
    setServeSafeKnowledge,
    setTransportationExperience,
    setWarehouseExperience,
    setFoodServiceKnowledge,
    setEventAddressStreet,
    setEventAddressCity,
    setEventAddressState,
    setEventAddressZip,
  } = setStates;

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

  const [componentSize, setComponentSize] = useState('default');
  const [eventTypeModal, setEventTypeModal] = useState(false); // visible, setVisible
  const [eventsData, setEventsData] = useState(defaultEventTypes);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleClickNewEventType = () => {
    setEventTypeModal(true);
  };

  const setEventTimes = () => {
    // datetime state not setting
    const startDateTime = `${eventStartDate} ${eventStartTime}`;
    const endDateTime = `${eventEndDate} ${eventEndTime}`;
    console.log(startDateTime, endDateTime);
    setEventStartDateTime(startDateTime);
    setEventEndDateTime(endDateTime);
  };

  const handleStartDate = (date, dateString) => {
    setEventStartDate(dateString);
  };

  const handleStartTime = (time, timeString) => {
    setEventStartTime(timeString);
  };

  const handleEndDate = (date, dateString) => {
    setEventEndDate(dateString);
  };

  const handleEndTime = (time, timeString) => {
    setEventEndTime(timeString);
    setEventTimes();
  };

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
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Event Name" rules={[{ required: true }]}>
          <Input
            placeholder="Ex. Food Running Event"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Start Date / Time" rules={[{ required: true }]}>
          <DatePicker placeholder="Select date" onChange={handleStartDate} />
          <TimePicker placeholder="Select time" onChange={handleStartTime} />
        </Form.Item>

        <Form.Item label="End Date / Time" rules={[{ required: true }]}>
          <DatePicker placeholder="Select date" onChange={handleEndDate} />
          <TimePicker placeholder="Select time" onChange={handleEndTime} />
        </Form.Item>

        <Form.Item label="Event Type" rules={[{ required: true }]}>
          <Select
            placeholder="Type"
            value={eventType}
            style={{ width: '100px' }}
            onSelect={s => {
              setEventType(s);
            }}
          >
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
          <InputNumber onChange={v => setVolunteerCapacity(v)} value={volunteerCapacity} />
        </Form.Item>

        <Form.Item label="Requirements (optional)">
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              <Col span={8}>
                <Checkbox
                  value="Can Drive"
                  onChange={() => setCanDrive(!canDrive)}
                  checked={canDrive}
                >
                  Can Drive
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="Adult (age 18+)"
                  onChange={() => setIsAdult(!isAdult)}
                  checked={isAdult}
                >
                  Adult (age 18+)
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="Minor (age <18)"
                  onChange={() => setIsMinor(!isMinor)}
                  checked={isMinor}
                >
                  Minor (age &#60;18)
                </Checkbox>
              </Col>
              <br />
              <br />
              <Col span={8}>
                <Checkbox
                  value="First Aid Training"
                  onChange={() => setFirstAidTraining(!firstAidTraining)}
                  checked={firstAidTraining}
                >
                  First Aid Training
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="Serve Safe Knowledge"
                  onChange={() => setServeSafeKnowledge(!serveSafeKnowledge)}
                  checked={serveSafeKnowledge}
                >
                  Serve Safe Knowledge
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={transportationExperience}
                  value="Transportation Experience"
                  onChange={() => setTransportationExperience(!transportationExperience)}
                >
                  Transportation Experience
                </Checkbox>
              </Col>
              <br />
              <br />
              <Col span={8}>
                <Checkbox
                  checked={warehouseExperience}
                  value="Moving / Warehouse Experience"
                  onChange={() => setWarehouseExperience(!warehouseExperience)}
                >
                  Moving / Warehouse Experience
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={foodServiceKnowledge}
                  value="Food Service Industry Knowledge"
                  onChange={() => setFoodServiceKnowledge(!foodServiceKnowledge)}
                >
                  Food Service Industry Knowledge
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Street Address" rules={[{ required: true }]}>
          <Input
            value={eventAddressStreet}
            placeholder="Ex. 123 Banana St."
            onChange={e => setEventAddressStreet(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="City" rules={[{ required: true }]}>
          <Input
            value={eventAddressCity}
            placeholder="Austin"
            onChange={e => setEventAddressCity(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          value={eventAddressState}
          label="State"
          rules={[{ required: true }]}
          onChange={e => setEventAddressState(e.target.value)}
        >
          <Input placeholder="TX" />
        </Form.Item>
        <Form.Item
          value={eventAddressZip}
          label="Zipcode"
          rules={[{ required: true }]}
          onChange={e => setEventAddressZip(e.target.value)}
        >
          <Input placeholder="73301" />
        </Form.Item>
      </Form>
    </div>
  );
};

EventsGeneralInfo.propTypes = {
  states: PropTypes.objectOf(PropTypes.any).isRequired,
  setStates: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EventsGeneralInfo;
