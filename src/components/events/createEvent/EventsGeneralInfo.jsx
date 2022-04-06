import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Form, DatePicker, Input, Select, Button, TimePicker, Checkbox, Row, Col } from 'antd';
import EventTypeModal from './EventTypeModal';

const { Option } = Select;

const EventsGeneralInfo = () => {
  const {
    register,
    control,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useFormContext();

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

  const [eventTypeModal, setEventTypeModal] = useState(false);
  const [eventsData, setEventsData] = useState(defaultEventTypes);

  const handleClickNewEventType = () => {
    setEventTypeModal(true);
  };

  // const setEventTimes = () => {
  //   // datetime state not setting
  //   const startDateTime = `${eventStartDate} ${eventStartTime}`;
  //   const endDateTime = `${eventEndDate} ${eventEndTime}`;
  //   console.log(startDateTime, endDateTime);
  //   setEventStartDateTime(startDateTime);
  //   setEventEndDateTime(endDateTime);
  // };

  // const handleStartDate = (date, dateString) => {
  //   setEventStartDate(dateString);
  // };

  // const handleStartTime = (time, timeString) => {
  //   setEventStartTime(timeString);
  // };

  // const handleEndDate = (date, dateString) => {
  //   setEventEndDate(dateString);
  // };

  // const handleEndTime = (time, timeString) => {
  //   setEventEndTime(timeString);
  //   setEventTimes();
  // };

  // Event Type Menu
  const eventTypeMenu = eventsData.map(event => {
    return <Option key={event.name}>{event.name}</Option>;
  });

  return (
    <div>
      <h1> General Information </h1>
      <Form.Item label="Event Name">
        <Input
          placeholder="Ex. Food Running Event"
          // value={eventName}
          {...register('eventName', { required: true })}
        />
      </Form.Item>

      <Form.Item label="Start Date / Time">
        <Controller
          control={control}
          name="eventStartDate"
          render={({ field }) => (
            <DatePicker
              {...field}
              placeholder="Select date"
              onChange={e => {
                field.onChange(e);
              }}
            />
          )}
          rules={{ required: true }}
        />
        <TimePicker
          placeholder="Select time"
          // onChange={handleStartTime}
        />
      </Form.Item>

      <Form.Item label="End Date / Time">
        <Controller
          control={control}
          name="eventEndDate"
          render={({ field }) => (
            <DatePicker
              {...field}
              placeholder="Select date"
              onChange={e => {
                field.onChange(e);
              }}
            />
          )}
          rules={{ required: true }}
        />
        <TimePicker
          placeholder="Select time"
          // onChange={handleEndTime}
        />
      </Form.Item>

      <Form.Item label="Event Type">
        <Controller
          control={control}
          name="eventType"
          render={({ field }) => (
            <>
              <Select placeholder="Type" defaultValue="" style={{ width: '100px' }} {...field}>
                {eventTypeMenu}
              </Select>
            </>
          )}
        />

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

      <Form.Item label="Num Volunteers" style={{ width: '200px' }}>
        <Input {...register('volunteerCapacity', { required: true })} />
      </Form.Item>

      <Form.Item label="Requirements (optional)">
        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
            <Col span={8}>
              <Controller
                control={control}
                name="canDrive"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    // {...register('canDrive')}
                    checked={value}
                  >
                    Can Drive
                  </Checkbox>
                )}
              />
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="isAdult"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    // {...register('canDrive')}
                    checked={value}
                  >
                    Adult (18+)
                  </Checkbox>
                )}
              />
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="isMinor"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    // {...register('canDrive')}
                    checked={value}
                  >
                    Minor (age &#60;18)
                  </Checkbox>
                )}
              />
            </Col>
            <br />
            <br />
            <Col span={8}>
              <Controller
                control={control}
                name="firstAidTraining"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    // {...register('canDrive')}
                    checked={value}
                  >
                    First Aid Training
                  </Checkbox>
                )}
              />
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="serveSafeKnowledge"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    // {...register('canDrive')}
                    checked={value}
                  >
                    Serve Safe Knowledge
                  </Checkbox>
                )}
              />
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="transportaionExperience"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    // {...register('canDrive')}
                    checked={value}
                  >
                    Transportation Experience
                  </Checkbox>
                )}
              />
            </Col>
            <br />
            <br />
            <Col span={8}>
              <Controller
                control={control}
                name="warehouseExperience"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    // {...register('canDrive')}
                    checked={value}
                  >
                    Moving / Warehouse Experience
                  </Checkbox>
                )}
              />
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="foodServiceKnowledge"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    // {...register('canDrive')}
                    checked={value}
                  >
                    Food Service Industry Knowledge
                  </Checkbox>
                )}
              />
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Street Address" rules={[{ required: true }]}>
        <Input
          // value={eventAddressStreet}
          placeholder="Ex. 123 Banana St."
          // onChange={e => setEventAddressStreet(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="City" rules={[{ required: true }]}>
        <Input
          // value={eventAddressCity}
          placeholder="Austin"
          {...register('eventAddressCity')}
          // onChange={e => setEventAddressCity(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        // value={eventAddressState}
        label="State"
        rules={[{ required: true }]}
        {...register('eventAddressState')}
        // onChange={e => setEventAddressState(e.target.value)}
      >
        <Input placeholder="TX" />
      </Form.Item>
      <Form.Item
        // value={eventAddressZip}
        {...register('eventAddressZip')}
        label="Zipcode"
        rules={[{ required: true }]}
        // onChange={e => setEventAddressZip(e.target.value)}
      >
        <Input placeholder="73301" />
      </Form.Item>
    </div>
  );
};

export default EventsGeneralInfo;
