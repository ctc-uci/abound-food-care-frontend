import React, { useState, useEffect } from 'react';
import { Radio, Form, Input } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

// const validateMessages = {
//   // eslint-disable-next-line no-template-curly-in-string
//   required: 'Answer to this question is required!',
// };

const ProfileDUIAndCrimHistory = ({ userId }) => {
  const [form] = Form.useForm();

  const [componentSize, setComponentSize] = useState('default');
  const [isEditable] = useState(true);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '50%',
  };

  const getVolunteerData = async () => {
    try {
      const { data: volunteerData } = await axios.get(`http://localhost:3001/users/${userId}`);
      form.setFieldsValue({
        criminalHistory: volunteerData.criminalHistory.toString(),
        criminalHistoryDetails: volunteerData.criminalHistoryDetails,
        duiHistory: volunteerData.duiHistory.toString(),
        duiHistoryDetails: volunteerData.duiHistoryDetails,
        additionalInformation: volunteerData.additionalInformation,
      });
    } catch (e) {
      console.log('Error while getting volunteer data!');
    }
  };

  useEffect(() => {
    getVolunteerData();
  }, []);

  return (
    <div>
      <Form
        layout="vertical"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        name="dui_criminal_history"
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
        form={form}
      >
        <Form.Item
          name="criminalHistory"
          label="Have you ever been convicted of violation of any law?"
        >
          <Radio.Group disabled={!isEditable}>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
            <Radio value="prefer not to say">Prefer not to say</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="criminalHistoryDetails"
          label="If you replied YES to the previous question, please specify your most recent violation."
        >
          <Input.TextArea style={inputBoxStyle} disabled={!isEditable} />
        </Form.Item>

        <Form.Item name="duiHistory" label="Do you have any DUI history?">
          <Radio.Group disabled={!isEditable}>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
            <Radio value="prefer not to say">Prefer not to say</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="duiHistoryDetails"
          label="If you replied YES to the previous question, please specify your most recent DUI violation."
        >
          <Input.TextArea style={inputBoxStyle} disabled={!isEditable} />
        </Form.Item>

        <Form.Item
          name="additionalInformation"
          label="Please write down any additional information you would like us to know:"
        >
          <Input.TextArea style={inputBoxStyle} disabled={!isEditable} />
        </Form.Item>
      </Form>
    </div>
  );
};

ProfileDUIAndCrimHistory.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileDUIAndCrimHistory;
