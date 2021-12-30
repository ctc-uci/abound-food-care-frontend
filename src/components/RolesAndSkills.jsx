import React from 'react';
import { Input, Radio, Form, Select, Option, InputNumber, Button } from 'antd';

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
};

/* eslint-disable no-template-curly-in-string */

const RolesAndSkills = () => {
  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      name="roles_n_skills"
      validateMessages={validateMessages}
      size={componentSize}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item
        name="weightlifting"
        label="Weightlifting Ability"
        rules={[
          {
            type: 'number',
            required: true,
            message: validateMessages,
          },
        ]}
      >
        <Input placeholder="0 lbs" />
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Can you drive?"
        rules={[
          {
            required: true,
            message: validateMessages,
          },
        ]}
      >
        <Radio.Group>
          <Radio value>Yes</Radio>
          <Radio value>No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="vehicle_types"
        label="Vehicle Type:"
        rules={[
          {
            required: true,
            message: validateMessages,
          },
        ]}
      >
        <Select mode="multiple" placeholder="Select all that apply.">
          <Option value="opt1">opt1</Option>
          <Option value="opt2">opt2</Option>
          <Option value="opt3">opt3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="drivingMiles"
        label="How far are you comfortable driving?"
        rules={[
          {
            required: true,
            message: validateMessages,
            type: 'number',
          },
        ]}
      >
        <Input placeholder="0 miles" />
        <InputNumber />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 19 }}>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RolesAndSkills;
