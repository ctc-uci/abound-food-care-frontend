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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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

  const volunteerTypeMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  const tagList = [
    { name: 'First Aid Training' },
    { name: 'Can Drive' },
    { name: 'Age 18 or Older' },
  ];

  const [list, updateList] = useState(tagList);

  const handleRemoveItem = e => {
    const name = e.target.getAttribute('name');
    updateList(list.filter(item => item.name !== name));
  };

  const [state, setState] = useState('start');

  const addItem = item => {
    tagList.name = item.target.value;
  };

  return (
    <div>
      <h1> General Information </h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="nest-messages"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Event Name">
          <Input placeholder="Ex. Food Running Event" />
        </Form.Item>

        <Form.Item label="Date / Time">
          <DatePicker placeholder="Select date" />
          <TimePicker placeholder="Select time" />
        </Form.Item>

        <Form.Item label="Event Type">
          <Button onClick={showModalEventType}>Type</Button>
          <Button type="link" onClick={showModalAddEventType}>
            New Event Type
          </Button>
          {/* Event Type Pop Up */}
          <Modal
            title="Event Type"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
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
              <Button key="submit" type="primary" onClick={handleAddOk}>
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
              <Button key="submit" type="primary" onClick={handleEditOk}>
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

        <Form.Item label="Num Volunteers">
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
          {list.map(item => {
            return (
              <>
                <Button name={item.name} onClick={handleRemoveItem}>
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
              <Input onKeyDown={e => e.key === 'Enter' && addItem} />
            </>
          )}
        </Form.Item>

        <Form.Item label="Location">
          <Input placeholder="Ex. Irvine, CA" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralInfo;
