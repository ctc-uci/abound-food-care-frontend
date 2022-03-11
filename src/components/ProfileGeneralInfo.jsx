import React from 'react';
import { DatePicker, Form, Input, Radio, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';

const ProfileGeneralInfo = ({ userId }) => {
  // const onFinish = values => {
  //   console.log(values);
  // };

  const [form] = Form.useForm();

  const [componentSize, setComponentSize] = React.useState('default');
  const [isEditable] = React.useState(false);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '50%',
  };

  React.useEffect(() => {
    const getVolunteerData = async () => {
      let data = {};
      await axios.get(`http://localhost:3001/users/${userId}`).then(res => {
        data = res.data;
      });
      const [volunteerData] = data;
      console.log(volunteerData.zipcode);
      form.setFieldsValue({
        firstName: volunteerData.first_name,
        lastName: volunteerData.last_name,
        dateOfBirth: moment(
          new Date(volunteerData.birthdate).toISOString().split('T')[0],
          'YYYY-MM-DD',
        ),
        email: volunteerData.email,
        phoneNumber: volunteerData.phone,
        contactMethod: volunteerData.preferred_contact_method,
        streetAddress: volunteerData.physical_address,
        city: volunteerData.city,
        state: volunteerData.state,
        zipcode: volunteerData.zipcode,
      });
    };
    getVolunteerData();
  }, []);

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
        form={form}
      >
        <Row>
          <Col span={6}>
            <Form.Item name="firstName" label="First Name">
              <Input placeholder="Enter first name" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="lastName" label="Last Name">
              <Input placeholder="Enter last name" disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="dateOfBirth" label="Date of Birth">
          <DatePicker placeholder="Select date" format="MM/DD/YYYY" disabled={!isEditable} />
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
          <Input style={inputBoxStyle} placeholder="" disabled={!isEditable} />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Phone">
          <Input
            style={inputBoxStyle}
            placeholder="Please enter your work goals"
            disabled={!isEditable}
          />
        </Form.Item>

        <Form.Item name="contactMethod" label="Preferred Contact Method">
          <Radio.Group disabled>
            <Radio value="email">Email</Radio>
            <Radio value="phone">Phone</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="streetAddress" label="Street Address">
          <Input
            style={inputBoxStyle}
            placeholder="Please enter your work goals"
            disabled={!isEditable}
          />
        </Form.Item>

        <Row>
          <Col span={6}>
            <Form.Item name="city" label="City">
              <Input placeholder="" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="state" label="State">
              <Input placeholder="" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="zipcode" label="Zip Code">
              <Input placeholder="" disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

ProfileGeneralInfo.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileGeneralInfo;
