import React from 'react';
import { DatePicker, Form, Input, Radio, Row, Col } from 'antd';
import axios from 'axios';

const ProfileGeneralInfo = () => {
  // const onFinish = values => {
  //   console.log(values);
  // };

  const [componentSize, setComponentSize] = React.useState('default');
  const [firstName, setFirstName] = React.useState('');
  // const [lastName, setLastName] = React.useState('');
  // const [dateOfBirth, setDateOfBirth] = React.useState('');
  // const [email, setEmail] = React.useState('');
  // const [phone, setPhone] = React.useState('');
  // const [preferredContactMethod, setPreferredContactMethod] = React.useState('');
  // const [streetAddress, setStreetAddress] = React.useState('');
  // const [city, setCity] = React.useState('');
  // const [state, setState] = React.useState('');
  // const [zipCode, setZipCode] = React.useState('');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // Load in data!
  // Form data should NOT be editable?
  const inputBoxStyle = {
    width: '50%',
  };

  React.useEffect(() => {
    const getVolunteerData = async () => {
      let data = {};
      await axios.get('http://localhost:3001/users/6').then(res => {
        data = res.data;
      });
      const [volunteerData] = data;
      // update state
      setFirstName(volunteerData.name);
      // setLastName(volunteerData['name']);
      // setDateOfBirth(volunteerData['birthdate']);
      // setEmail(volunteerData['email']);
      // setPhone(volunteerData['phone']);
      // setPreferredContactMethod(volunteerData['preferred_contact_method']);
      // setStreetAddress(volunteerData['physical_address']);
      // setCity(volunteerData['city']);
      // setState('N/A'); // TODO: FIX THIS
      // setZipCode('N/A'); // TODO: FIX THIS
    };
    console.log(firstName);
    getVolunteerData();
  }, []);

  React.useEffect(() => {
    console.log(firstName);
  }, [firstName]);

  return (
    <div>
      <h1> PROFILE General Information </h1>
      <Form
        layout="vertical"
        labelCol={{ span: 20 }}
        name="nest-messages"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
        initialValues={{ firstName }}
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
