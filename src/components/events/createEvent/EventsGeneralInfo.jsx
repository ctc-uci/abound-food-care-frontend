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

const EventsGeneralInfo = ({ setStates }) => {
  // const onFinish = values => {
  //   console.log(values);
  // };

  const {
    setEventName,
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

  // const defaultVolunteerTypes = [
  //   {
  //     name: 'type1',
  //   },
  //   {
  //     name: 'type2',
  //   },
  //   {
  //     name: 'type3',
  //   },
  // ];

  const [componentSize, setComponentSize] = useState('default');
  const [eventTypeModal, setEventTypeModal] = useState(false); // visible, setVisible
  const [eventsData, setEventsData] = useState(defaultEventTypes);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleClickNewEventType = () => {
    setEventTypeModal(true);
  };

  const handleStartDate = (date, dateString) => {
    console.log(date);
    setEventStartDate(dateString);
  };

  const handleStartTime = (time, timeString) => {
    console.log(time);
    setEventStartTime(timeString);
  };

  const handleEndDate = (date, dateString) => {
    console.log(date);
    setEventEndDate(dateString);
  };

  const handleEndTime = (time, timeString) => {
    console.log(time);
    setEventEndTime(timeString);
  };

  // Volunteer Type
  // const volunteerTypeMenu = defaultVolunteerTypes.map(event => {
  //   return <Option key={event.name}>{event.name}</Option>;
  // });

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
          <Input
            placeholder="Ex. Food Running Event"
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
            style={{ width: '100px' }}
            onSelect={(s, option) => {
              console.log(option);
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
          <InputNumber onChange={v => setVolunteerCapacity(v)} />
        </Form.Item>

        {/* <Form.Item label="Volunteer Type">
          <Select placeholder="Type" style={{ width: '100px' }}>
            {volunteerTypeMenu}
          </Select>
        </Form.Item> */}

        <Form.Item label="Requirements (optional)">
          <Checkbox.Group style={{ width: '100%' }}>
            {' '}
            {/* onChange={onChange}> */}
            {/* Add color for when state of checkbox is checked */}
            {/* Slightly change spacing */}
            <Row>
              <Col span={8}>
                <Checkbox value="Can Drive" onChange={() => setCanDrive(true)}>
                  Can Drive
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Adult (age 18+)" onChange={() => setIsAdult(true)}>
                  Adult (age 18+)
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Minor (age <18)" onChange={() => setIsMinor(true)}>
                  Minor (age &#60;18)
                </Checkbox>
              </Col>
              <br />
              <br />
              <Col span={8}>
                <Checkbox value="First Aid Training" onChange={() => setFirstAidTraining(true)}>
                  First Aid Training
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="Serve Safe Knowledge" onChange={() => setServeSafeKnowledge(true)}>
                  Serve Safe Knowledge
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="Transportation Experience"
                  onChange={() => setTransportationExperience(true)}
                >
                  Transportation Experience
                </Checkbox>
              </Col>
              <br />
              <br />
              <Col span={8}>
                <Checkbox
                  value="Moving / Warehouse Experience"
                  onChange={() => setWarehouseExperience(true)}
                >
                  Moving / Warehouse Experience
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="Food Service Industry Knowledge"
                  onChange={() => setFoodServiceKnowledge(true)}
                >
                  Food Service Industry Knowledge
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Street Address" rules={[{ required: true }]}>
          <Input
            placeholder="Ex. 123 Banana St."
            onChange={e => setEventAddressStreet(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="City" rules={[{ required: true }]}>
          <Input placeholder="Austin" onChange={e => setEventAddressCity(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="State"
          rules={[{ required: true }]}
          onChange={e => setEventAddressState(e.target.value)}
        >
          <Input placeholder="TX" />
        </Form.Item>
        <Form.Item
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
  setStates: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EventsGeneralInfo;
