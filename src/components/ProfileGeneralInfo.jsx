import React from 'react';
import { DatePicker, Form, Input, Radio, Row, Col } from 'antd';

const ProfileGeneralInfo = () => {
  // const onFinish = values => {
  //   console.log(values);
  // };

  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // Load in data!
  // Form data should NOT be editable?
  const inputBoxStyle = {
    width: '50%',
  };

  return (
    <div>
      <h1> PROFILE General Information </h1>
      <Form
        layout="vertical"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        name="nest-messages"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Row>
          <Col span={6}>
            <Form.Item name="firstName" label="First Name">
              <Input placeholder="Give the target a name" disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="lastName" label="Last Name">
              <Input placeholder="Give the target a name" disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Date of Birth">
          <DatePicker placeholder="Select date" disabled />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input style={inputBoxStyle} placeholder="" disabled />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Phone">
          <Input style={inputBoxStyle} placeholder="Please enter your work goals" disabled />
        </Form.Item>

        <Form.Item label="Preferred Contact Method">
          <Radio.Group>
            <Radio value="email" disabled>
              Email
            </Radio>
            <Radio value="phone" disabled>
              Phone
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="street-address" label="Street Address">
          <Input style={inputBoxStyle} placeholder="Please enter your work goals" disabled />
        </Form.Item>

        <Row>
          <Col span={6}>
            <Form.Item name="city" label="City">
              <Input placeholder="" disabled />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="state" label="State">
              <Input placeholder="" disabled />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="zip-code" label="Zip Code">
              <Input placeholder="" disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProfileGeneralInfo;
