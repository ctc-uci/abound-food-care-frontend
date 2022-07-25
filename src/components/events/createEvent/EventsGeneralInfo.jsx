import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Form,
  DatePicker,
  Input,
  Select,
  Button,
  TimePicker,
  Checkbox,
  Row,
  Col,
  Space,
  Tag,
  Typography,
} from 'antd';
import useViewPort from '../../../common/useViewPort';
import EventTypeModal from './EventTypeModal';
import styles from './CreateEvent.module.css';

const { Option } = Select;
const { Text, Title } = Typography;

const EventsGeneralInfo = () => {
  const { width } = useViewPort();
  const breakpoint = 720;
  const {
    control,
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

  const eventTypeMenu = eventsData.map(event => {
    return <Option key={event.name}>{event.name}</Option>;
  });

  return (
    <div>
      <Title level={2}>General Information</Title>
      {width < breakpoint ? (
        <>
          <Controller
            control={control}
            name="eventName"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Event Name">
                <Input
                  placeholder="Ex. Food Running Event"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                />
                <Text type="danger">{errors.eventName && <p>{errors.eventName.message}</p>}</Text>
              </Form.Item>
            )}
          />
          <Space>
            <Controller
              name="eventStartDate"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item label="Start Date">
                  <DatePicker
                    placeholder="Select date"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                  />
                  <Text type="danger">
                    {errors.eventStartDate && <p>{errors.eventStartDate.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              name="eventStartTime"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item label="Start Time">
                  <TimePicker
                    placeholder="Select time"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                  />
                  <Text type="danger">
                    {errors.eventStartTime && <p>{errors.eventStartTime.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
          </Space>
          <Space>
            <Controller
              name="eventEndDate"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item label="End Date">
                  <DatePicker
                    placeholder="Select date"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                  />
                  <Text type="danger">
                    {errors.eventEndDate && <p>{errors.eventEndDate.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              name="eventEndTime"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item label="End Time">
                  <TimePicker
                    placeholder="Select time"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                  />
                  <Text type="danger">
                    {errors.eventEndTime && <p>{errors.eventEndTime.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
          </Space>
          <Controller
            name="eventType"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Event Type">
                <Select placeholder="Type" onChange={onChange} value={value} ref={ref}>
                  {' '}
                  {eventTypeMenu}{' '}
                </Select>
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
                <div>
                  <Button className={styles.btn1} type="link" onClick={handleClickNewEventType}>
                    + New Event Type
                  </Button>
                </div>
                <Text type="danger">{errors.eventType && <p>{errors.eventType.message}</p>}</Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="volunteerCapacity"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Num Volunteers">
                <Input onChange={onChange} value={value} ref={ref} />
                <Text type="danger">
                  {errors.volunteerCapacity && <p>{errors.volunteerCapacity.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
          <Form.Item label="Requirements">
            <Space>
              <Controller
                control={control}
                name="firstAidTraining"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Tag.CheckableTag
                      className={styles.grayBorder}
                      onChange={onChange}
                      checked={value}
                    >
                      First Aid Training
                    </Tag.CheckableTag>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="canDrive"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Tag.CheckableTag
                      className={styles.grayBorder}
                      onChange={onChange}
                      checked={value}
                    >
                      Can Drive
                    </Tag.CheckableTag>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="isAdult"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Tag.CheckableTag
                      className={styles.grayBorder}
                      onChange={onChange}
                      checked={value}
                    >
                      Adult (age 18+)
                    </Tag.CheckableTag>
                  </Form.Item>
                )}
              />
            </Space>
            <Space>
              <Controller
                control={control}
                name="isMinor"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Tag.CheckableTag
                      className={styles.grayBorder}
                      onChange={onChange}
                      checked={value}
                    >
                      Minor (age &lt; 18)
                    </Tag.CheckableTag>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="serveSafeKnowledge"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Tag.CheckableTag
                      className={styles.grayBorder}
                      onChange={onChange}
                      checked={value}
                    >
                      Serve Safe Knowledge
                    </Tag.CheckableTag>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="transportationExperience"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Tag.CheckableTag
                      className={styles.grayBorder}
                      onChange={onChange}
                      checked={value}
                    >
                      Transportation Experience
                    </Tag.CheckableTag>
                  </Form.Item>
                )}
              />
            </Space>
            <Space>
              <Controller
                control={control}
                name="movingWarehouseExperience"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Tag.CheckableTag
                      className={styles.grayBorder}
                      onChange={onChange}
                      checked={value}
                    >
                      Moving / Warehouse Experience
                    </Tag.CheckableTag>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="foodServiceIndustryKnowledge"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Tag.CheckableTag
                      className={styles.grayBorder}
                      onChange={onChange}
                      checked={value}
                    >
                      Food Service Industry Knowledge
                    </Tag.CheckableTag>
                  </Form.Item>
                )}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Location">
            <Controller
              control={control}
              name="addressStreet"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item label="Street Address">
                  <Input
                    placeholder="200 N Tustin Ave"
                    onChange={onChange}
                    value={value}
                    ref={ref}
                  />
                  <Text type="danger">
                    {errors.addressStreet && <p>{errors.addressStreet.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="addressCity"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item label="City">
                  <Input placeholder="Ex. Santa Ana" onChange={onChange} value={value} ref={ref} />
                  <Text type="danger">
                    {errors.addressCity && <p>{errors.addressCity.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="addressState"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item label="State">
                  <Input placeholder="Ex. CA" onChange={onChange} value={value} ref={ref} />
                  <Text type="danger">
                    {errors.addressState && <p>{errors.addressState.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="addressZip"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item label="Zipcode">
                  <Input placeholder="Ex. 92705" onChange={onChange} value={value} ref={ref} />
                  <Text type="danger">
                    {errors.addressZip && <p>{errors.addressZip.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
          </Form.Item>
          <Space />
        </>
      ) : (
        <>
          <Controller
            control={control}
            name="eventName"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Event Name">
                <Input
                  placeholder="Ex. Food Running Event"
                  ref={ref}
                  value={value}
                  onChange={onChange}
                />
                <Text type="danger">{errors.eventName && <p>{errors.eventName.message}</p>}</Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="eventStartDate"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Start Date">
                <DatePicker placeholder="Select date" onChange={onChange} value={value} ref={ref} />
                <Text type="danger">
                  {errors.eventStartDate && <p>{errors.eventStartDate.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="eventStartTime"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Start Time">
                <TimePicker placeholder="Select time" onChange={onChange} value={value} ref={ref} />
                <Text type="danger">
                  {errors.eventStartTime && <p>{errors.eventStartTime.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="eventEndDate"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="End Date">
                <DatePicker placeholder="Select date" onChange={onChange} value={value} ref={ref} />
                <Text type="danger">
                  {errors.eventEndDate && <p>{errors.eventEndDate.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="eventEndTime"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="End Time">
                <TimePicker placeholder="Select time" onChange={onChange} value={value} ref={ref} />
                <Text type="danger">
                  {errors.eventEndTime && <p>{errors.eventEndTime.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="eventType"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Event Type">
                <Select
                  placeholder="Type"
                  className={styles.selectEventTypeMenu}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                >
                  {eventTypeMenu}
                </Select>
                <Button
                  type="link"
                  onClick={handleClickNewEventType}
                  className={styles.newEventTypeBtn}
                >
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
                <Text type="danger">{errors.eventType && <p>{errors.eventType.message}</p>}</Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="volunteerCapacity"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Num Volunteers">
                <Input style={{ width: '200px' }} onChange={onChange} value={value} ref={ref} />
                <Text type="danger">
                  {errors.volunteerCapacity && <p>{errors.volunteerCapacity.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
          <section>
            <Form.Item label="Requirements (optional)">
              <Row>
                <Col span={8}>
                  <Controller
                    control={control}
                    name="canDrive"
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item label="Can Drive">
                        <Checkbox onChange={onChange} ref={ref} checked={value} />
                      </Form.Item>
                    )}
                  />
                  <Controller
                    control={control}
                    name="isAdult"
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item label="Adult (age 18+)">
                        <Checkbox onChange={onChange} ref={ref} checked={value} />
                      </Form.Item>
                    )}
                  />
                  <Controller
                    control={control}
                    name="isMinor"
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item label="Minor (age <18)">
                        <Checkbox onChange={onChange} ref={ref} checked={value} />
                      </Form.Item>
                    )}
                  />
                </Col>
                <br />
                <Col span={8}>
                  <Controller
                    control={control}
                    name="firstAidTraining"
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item label="First Aid Training">
                        <Checkbox onChange={onChange} ref={ref} checked={value} />
                      </Form.Item>
                    )}
                  />
                  <Controller
                    control={control}
                    name="serveSafeKnowledge"
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item label="Serve Safe Knowledge">
                        <Checkbox onChange={onChange} ref={ref} checked={value} />
                      </Form.Item>
                    )}
                  />
                  <Controller
                    control={control}
                    name="transportationExperience"
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item label="Transportation Experience">
                        <Checkbox onChange={onChange} ref={ref} checked={value} />
                      </Form.Item>
                    )}
                  />
                </Col>
                <br />
                <Col span={8}>
                  <Controller
                    control={control}
                    name="movingWarehouseExperience"
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item label="Moving / Warehouse Experience">
                        <Checkbox onChange={onChange} ref={ref} checked={value} />
                      </Form.Item>
                    )}
                  />
                  <Controller
                    control={control}
                    name="foodServiceIndustryKnowledge"
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item label="Food Service Industry Knowledge">
                        <Checkbox onChange={onChange} ref={ref} checked={value} />
                      </Form.Item>
                    )}
                  />
                </Col>
              </Row>
            </Form.Item>
          </section>
          <section>
            <Form.Item label="Location">
              <br />
              <br />
              <Controller
                control={control}
                name="addressStreet"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="Street Address">
                    <Input
                      placeholder="200 N Tustin Ave"
                      onChange={onChange}
                      value={value}
                      ref={ref}
                    />
                    <Text type="danger">
                      {errors.addressStreet && <p>{errors.addressStreet.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="addressCity"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="City">
                    <Input
                      placeholder="Ex. Santa Ana"
                      onChange={onChange}
                      value={value}
                      ref={ref}
                    />
                    <Text type="danger">
                      {errors.addressCity && <p>{errors.addressCity.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="addressState"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="State">
                    <Input placeholder="Ex. CA" onChange={onChange} value={value} ref={ref} />
                    <Text type="danger">
                      {errors.addressState && <p>{errors.addressState.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="addressZip"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="Zipcode">
                    <Input placeholder="Ex. 92705" onChange={onChange} value={value} ref={ref} />
                    <Text type="danger">
                      {errors.addressZip && <p>{errors.addressZip.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Form.Item>
          </section>
        </>
      )}
    </div>
  );
};

export default EventsGeneralInfo;
