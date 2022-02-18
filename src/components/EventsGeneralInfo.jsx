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

  const tagList = [
    { name: 'First Aid Training' },
    { name: 'Can Drive' },
    { name: 'Age 18 or Older' },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [inputTagValue, setInputTagValue] = useState('');
  const [tags, setTags] = useState(tagList);

  const showModalEventType = () => {
    setIsModalVisible(true);
  };

  const showModalAddEventType = () => {
    setIsAddModalVisible(true);
  };

  const showModalEditEventType = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddOk = () => {
    setIsAddModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleInputTagChange = e => {
    setInputTagValue(e.target.value);
  };

  const handleAddNewTag = () => {
    // updateTags()
    tagList.push({ name: inputTagValue });
    setTags(tagList);
  };

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

  const handleRemoveItem = e => {
    const name = e.target.getAttribute('name');
    setTags(tags.filter(item => item.name !== name));
  };

  const [state, setState] = useState('start');

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
            <Card>
              <p>Distribution</p>
              <Button type="link" onClick={showModalEditEventType}>
                Edit
              </Button>
              <Button type="link">Delete</Button>
            </Card>
            <Card>
              <p>Food Running</p>
            </Card>
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
                <Input placeholder="Describe what events should go under this type." />
              </Form.Item>
              <Form.Item label="Description">
                <Input placeholder="Describe what events should go under this type." />
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
              <Form.Item label="Event Type Name">
                <Input placeholder="Food Running" />
              </Form.Item>
              <Form.Item label="Description">
                <Input placeholder="..." />
              </Form.Item>
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
          {/* TODO: Make the deleting smoother */}
          {tags.map(item => {
            return (
              <>
                <Button
                  name={item.name}
                  onClick={handleRemoveItem}
                  style={{
                    background: 'rgba(108, 194, 74, 0.25)',
                    color: 'rgba(0, 0, 0, 0.85)',
                    border: 'rgba(17, 87, 64, 0.25)',
                  }}
                >
                  {item.name} <CloseOutlined />
                </Button>
              </>
            );
          })}

          {state === 'start' && (
            <>
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => setState('add-item')}>
                New Tag
              </Button>
            </>
          )}

          {/* TODO: Fix the enter */}
          {state === 'add-item' && (
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
