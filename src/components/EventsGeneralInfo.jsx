import React from 'react';
import { DatePicker, Form, Input, Button, TimePicker, InputNumber, Dropdown, Menu } from 'antd';
import { DownOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const GeneralInfo = () => {
  // const onFinish = values => {
  //   console.log(values);
  // };

  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
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
          {/* TODO: Open popup */}
          <Button>Type</Button>
          <a href="http://">New Event Type</a>
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

        {/* TODO: Add functionality */}
        <Form.Item label="Requirements (optional)">
          <Button>
            First Aid Training <CloseOutlined />
          </Button>
          <Button>
            Can Drive <CloseOutlined />
          </Button>
          <Button>
            Age 18 or Older <CloseOutlined />
          </Button>
          <Button type="dashed" icon={<PlusOutlined />}>
            New Tag
          </Button>
        </Form.Item>

        <Form.Item label="Location">
          <Input placeholder="Ex. Irvine, CA" />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary">Cancel</Button>
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralInfo;
