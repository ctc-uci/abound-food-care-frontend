import { React, useState } from 'react';
import { Input, Button, Radio, Row, Col, Card, Typography, Space } from 'antd';
import EventCard from './EventCard';

const { Search } = Input;
const { Title } = Typography;

const AdminEvents = () => {
  const onSearch = value => console.log(value);
  const [eventTypeValue, setEventTypeValue] = useState(1);
  const [eventStatusValue, setEventStatusValue] = useState(1);

  const eventTypeOptions = [
    { label: 'All', value: 1 },
    { label: 'Distributions', value: 2 },
    { label: 'Food Running', value: 3 },
    { label: 'Other', value: 4 },
  ];

  const eventStatusOptions = [
    { label: 'All', value: 1 },
    { label: 'Upcoming', value: 2 },
    { label: 'Past', value: 3 },
  ];

  const onTypeChange = e => {
    console.log('type changed', e.target.value);
    setEventTypeValue(e.target.value);
  };

  const onStatusChange = e => {
    console.log('status changed', e.target.value);
    setEventStatusValue(e.target.value);
  };

  const eventsData = [
    {
      eventId: 1,
      eventTitle: 'Event Title',
      eventDate: 'December 3, 2022',
      eventStarttime: '9:00',
      eventEndtime: '1:30',
      numVolunteers: 13,
      eventCapacity: 15,
    },
    {
      eventId: 2,
      eventTitle: 'Event Title 1',
      eventDate: 'December 3, 2022',
      eventStarttime: '9:01',
      eventEndtime: '1:31',
      numVolunteers: 13,
      eventCapacity: 15,
    },
  ];

  const renderEventsGrid = events => {
    const rows = events.map(event => (
      <Col key={event.eventId} span={8}>
        <EventCard
          eventTitle={event.eventTitle}
          eventDate={event.eventDate}
          eventStarttime={event.eventStarttime}
          eventEndtime={event.eventEndtime}
          numVolunteers={event.numVolunteers}
          eventCapacity={event.eventCapacity}
        />
      </Col>
    ));
    return rows;
  };

  return (
    <div>
      <Card>
        <Title level={3}>Events</Title>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          allowClear
          enterButton="Search"
          style={{ width: 500 }}
        />
      </Card>
      <Card>
        <Space>
          <Radio.Group
            options={eventTypeOptions}
            onChange={onTypeChange}
            value={eventTypeValue}
            optionType="button"
          />
        </Space>
        <Space>
          <Radio.Group
            options={eventStatusOptions}
            onChange={onStatusChange}
            value={eventStatusValue}
            optionType="button"
          />
        </Space>
        <Button type="primary">New Event</Button>
        <Button>New Event Type</Button>
      </Card>
      <Card>
        <Row>{renderEventsGrid(eventsData)}</Row>
      </Card>
    </div>
  );
};

export default AdminEvents;
