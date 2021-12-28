import React from 'react';
import { DatePicker, Form, Input, Radio, Button } from 'antd';

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const GeneralInfo = () => {
  const onFinish = values => {
    console.log(values);
  };

  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      size={componentSize}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Give the target a name" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Give the target a name" />
      </Form.Item>

      <Form.Item label="Birthday" required>
        <DatePicker placeholder="Select date" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            required: true,
          },
        ]}
      >
        <Input placeholder="Please enter your work goals" />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Please enter your work goals" />
      </Form.Item>

      <Form.Item label="Preferred Contact" required>
        <Radio.Group>
          <Radio value="email">Email</Radio>
          <Radio value="phone">Phone</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Please enter your work goals" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 19 }}>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeneralInfo;
