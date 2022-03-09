import React, { useState } from 'react';
import { Radio, Form, Input } from 'antd';
import axios from 'axios';

// const validateMessages = {
//   // eslint-disable-next-line no-template-curly-in-string
//   required: 'Answer to this question is required!',
// };

const ProfileDUIAndCrimHistory = () => {
  const [form] = Form.useForm();

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '50%',
  };

  React.useEffect(() => {
    const getVolunteerData = async () => {
      let data = {};
      await axios.get('http://localhost:3001/users/121').then(res => {
        data = res.data;
      });
      const [volunteerData] = data;
      // console.log(volunteerData);
      form.setFieldsValue({
        criminalHistory: volunteerData.criminal_history.toString(),
        criminalHistoryDetails: volunteerData.criminal_history_details,
        duiHistory: volunteerData.dui_history.toString(),
        duiHistoryDetails: volunteerData.dui_history_details,
        additionalInformation: volunteerData.additional_information,
      });
    };
    getVolunteerData();
  }, []);

  return (
    <div>
      <h1>PROFILE DUI/Criminal History</h1>
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
          <Radio.Group disabled>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
            <Radio value="prefer not to say">Prefer not to say</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="criminalHistoryDetails"
          label="If you replied YES to the previous question, please specify your most recent violation."
        >
          <Input.TextArea style={inputBoxStyle} disabled />
        </Form.Item>

        <Form.Item name="duiHistory" label="Do you have any DUI history?">
          <Radio.Group disabled>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
            <Radio value="prefer not to say">Prefer not to say</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="duiHistoryDetails"
          label="If you replied YES to the previous question, please specify your most recent DUI violation."
        >
          <Input.TextArea style={inputBoxStyle} disabled />
        </Form.Item>

        <Form.Item
          name="additionalInformation"
          label="Please write down any additional information you would like us to know:"
        >
          <Input.TextArea style={inputBoxStyle} disabled />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileDUIAndCrimHistory;
