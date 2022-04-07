/* eslint-disable no-unused-vars */
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// import PropTypes from 'prop-types';
import { DatePicker, Form, Input, Radio } from 'antd';

const GeneralInfo = () => {
  // const { nextPage, setGeneralInfo } = props;
  // const onFinish = values => {
  //   setGeneralInfo(values);
  //   nextPage();
  // };

  // const [componentSize, setComponentSize] = useState('default');

  // const onFormLayoutChange = ({ size }) => {
  //   setComponentSize(size);
  // };

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h1> General Information </h1>
      {/* <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="nest-messages"
        onFinish={onFinish}
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      > */}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="First Name" required>
            <Input onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Last Name" required>
            <Input onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="birthdate"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Birthday" required>
            <DatePicker placeholder="Select date" onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Email" required>
            <Input onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Phone Number" required>
            <Input onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="preferredContactMethod"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Preferred Contact Method" required>
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="email">Email</Radio>
              <Radio value="phone">Phone</Radio>
            </Radio.Group>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="addressStreet"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Street Address" required>
            <Input placeholder="200 N Tustin Ave" onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="addressCity"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="City" required>
            <Input placeholder="Ex. Santa Ana" onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="addressState"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="State" required>
            <Input placeholder="Ex. CA" onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="addressZip"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Zipcode" required>
            <Input placeholder="Ex. 92705" onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
    </div>
  );
};

// GeneralInfo.propTypes = {
//   nextPage: PropTypes.func.isRequired,
//   setGeneralInfo: PropTypes.func.isRequired,
// };

export default GeneralInfo;
