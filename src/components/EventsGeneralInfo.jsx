import React, { useState } from 'react';
import {
  DatePicker,
  Form,
  Input,
  Button,
  TimePicker,
  InputNumber,
  Dropdown,
  Menu,
  Modal,
  Card,
} from 'antd';
import { DownOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const GeneralInfo = () => {
  // const onFinish = values => {
  //   console.log(values);
  // };

  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // Event Type Modals
  const eventTypeList = [
    {
      name: 'Distribution',
      description:
        'Lorem ipsum dolor sit amex, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      name: 'Food Running',
      description:
        'Lorem ipsum dolor sit amex, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  const eventTypeAddedList = [];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editEventTypeState, setEditEventTypeState] = useState('');
  const [inputEventNameValue, setInputEventNameValue] = useState('');
  const [inputEventDescriptionValue, setInputEventDescriptionValue] = useState('');
  const [eventType, setEventType] = useState(eventTypeList);
  const [eventTypeCardState, setEventTypeCardState] = useState(false);
  const [eventTypeAdded, setEventTypeAdded] = useState(eventTypeAddedList);

  const showModalEventType = () => {
    setEventType(eventTypeList);
    setIsModalVisible(true);
  };

  const showModalAddEventType = () => {
    setIsAddModalVisible(true);
  };

  const showModalEditEventType = e => {
    const { value } = e.target;
    setEditEventTypeState(value);
    setIsModalVisible(false);
    setIsEditModalVisible(true);
  };

  const handleRemoveEventType = e => {
    const name = e.target.getAttribute('name');
    setEventType(eventType.filter(item => item.name !== name));
  };

  const selectEventTypeCard = e => {
    console.log(e.target.getAttribute('name'));
    if (eventTypeCardState) {
      setEventTypeCardState(false);
      e.target.style.background = '#ffffff';
      const name = e.target.getAttribute('name');
      setEventTypeAdded(eventTypeAddedList.filter(item => item.name !== name));
    } else {
      setEventTypeCardState(true);
      e.target.style.background = 'rgba(108, 194, 74, 0.25)';
      const name = e.target.getAttribute('name');
      const description = e.target.getAttribute('description');
      eventTypeAddedList.push({ name, description });
      setEventTypeAdded(eventTypeAddedList);
    }
  };

  const handleOk = () => {
    setEventTypeAdded(eventTypeAddedList);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEventNameChange = e => {
    setInputEventNameValue(e.target.value);
  };

  const handleEventDescriptionChange = e => {
    setInputEventDescriptionValue(e.target.value);
  };

  const handleAddOk = () => {
    setIsAddModalVisible(false);
    eventTypeList.push({ name: inputEventNameValue, description: inputEventDescriptionValue });
    setEventType(eventTypeList);
    setIsModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
    setEventType(eventType.filter(item => item === editEventTypeState));
    eventTypeList.push({ name: inputEventNameValue, description: inputEventDescriptionValue });
    setEventType(eventTypeList);
    setIsModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  // Volunteer Type
  const volunteerTypeMenu = (
    <Menu>
      <Menu.Item>
        <p>type 1</p>
      </Menu.Item>
      <Menu.Item>
        <p>type 2</p>
      </Menu.Item>
      <Menu.Item>
        <p>type 3</p>
      </Menu.Item>
    </Menu>
  );

  // Requirements
  const tagList = [
    { name: 'First Aid Training' },
    { name: 'Can Drive' },
    { name: 'Age 18 or Older' },
  ];

  const [state, setState] = useState('new-tag');
  const [inputTagValue, setInputTagValue] = useState('');
  const [tags, setTags] = useState(tagList);

  const handleInputTagChange = e => {
    setInputTagValue(e.target.value);
  };

  const handleAddNewTag = () => {
    tagList.push({ name: inputTagValue });
    setTags(tagList);
  };

  const handleRemoveTag = e => {
    const name = e.target.getAttribute('name');
    setTags(tags.filter(tag => tag.name !== name));
  };

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
          <Button onClick={showModalEventType}>
            Type <DownOutlined />
          </Button>
          <Button type="link" onClick={showModalAddEventType} style={{ color: '#6CC24A' }}>
            New Event Type
          </Button>
          {/* Event Type Added */}
          {eventTypeAdded.map(item => {
            return (
              <>
                <Card>
                  <b>{item.name}</b>
                  <div>
                    <p>{item.description}</p>
                  </div>
                </Card>
              </>
            );
          })}

          {/* Event Type Pop Up */}
          <Modal
            title="Event Type"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button
                key="submit"
                onClick={handleOk}
                style={{
                  background: '#115740',
                  color: 'white',
                  borderColor: '#115740',
                }}
              >
                Add Event Type
              </Button>,
            ]}
          >
            {eventType.map(item => {
              return (
                <>
                  <Card
                    name={item.name}
                    description={item.description}
                    state={eventTypeCardState}
                    onClick={selectEventTypeCard}
                  >
                    <div>
                      <b>{item.name}</b>
                      <div>
                        <div style={{ display: 'inline-block', float: 'left' }}>
                          <p>{item.description}</p>
                        </div>
                        <div style={{ display: 'inline-block', float: 'right' }}>
                          <Button
                            name={item.name}
                            type="link"
                            onClick={showModalEditEventType}
                            style={{ color: '#6CC24A', display: 'inline-block' }}
                          >
                            Edit
                          </Button>
                          <p style={{ display: 'inline-block' }}>|</p>
                          <Button
                            name={item.name}
                            type="link"
                            onClick={handleRemoveEventType}
                            style={{ color: '#6CC24A', display: 'inline-block' }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              );
            })}
          </Modal>

          {/* Add Event Type Pop Up */}
          <Modal
            title="Event Type"
            visible={isAddModalVisible}
            onOk={handleAddOk}
            onCancel={handleAddCancel}
            footer={[
              <Button key="back" onClick={handleAddCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                onClick={handleAddOk}
                style={{
                  background: '#115740',
                  color: 'white',
                  borderColor: '#115740',
                }}
              >
                Add Event Type
              </Button>,
            ]}
          >
            <Form>
              <Form.Item label="Event Type Name">
                <Input
                  onChange={handleEventNameChange}
                  placeholder="Describe what events should go under this type."
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input
                  onChange={handleEventDescriptionChange}
                  placeholder="Describe what events should go under this type."
                />
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Event Type Pop Up */}
          <Modal
            title="Event Type"
            visible={isEditModalVisible}
            onOk={handleEditOk}
            onCancel={handleEditCancel}
            footer={[
              <Button key="back" onClick={handleEditCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                onClick={handleEditOk}
                style={{
                  background: '#115740',
                  color: 'white',
                  borderColor: '#115740',
                }}
              >
                Save
              </Button>,
            ]}
          >
            <Form>
              {eventType
                .filter(item => item === editEventTypeState)
                .map(item => {
                  return (
                    <>
                      <Form.Item label="Event Type Name">
                        <Input onChange={handleEventNameChange} defaultValue={item.name} />
                      </Form.Item>
                      <Form.Item label="Description">
                        <Input
                          onChange={handleEventDescriptionChange}
                          defaultValue={item.description}
                        />
                      </Form.Item>
                    </>
                  );
                })}
            </Form>
          </Modal>
        </Form.Item>

        <Form.Item label="Num Volunteers" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Volunteer Type">
          <Dropdown overlay={volunteerTypeMenu} placement="bottomCenter">
            <Button>
              Type <DownOutlined />
            </Button>
          </Dropdown>
        </Form.Item>

        <Form.Item label="Requirements (optional)">
          {tags.map(tag => {
            return (
              <>
                <Button
                  name={tag.name}
                  onClick={handleRemoveTag}
                  style={{
                    background: 'rgba(108, 194, 74, 0.25)',
                    color: 'rgba(0, 0, 0, 0.85)',
                    border: 'rgba(17, 87, 64, 0.25)',
                  }}
                >
                  {tag.name} <CloseOutlined />
                </Button>
              </>
            );
          })}

          {state === 'new-tag' && (
            <>
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => setState('add-tag')}>
                New Tag
              </Button>
            </>
          )}

          {state === 'add-tag' && (
            <>
              <Input onChange={handleInputTagChange} onPressEnter={handleAddNewTag} />
            </>
          )}
        </Form.Item>

        <Form.Item label="Location" rules={[{ required: true }]}>
          <Input placeholder="Ex. Irvine, CA" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralInfo;
