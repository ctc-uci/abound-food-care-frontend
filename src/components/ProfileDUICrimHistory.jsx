import React, { useState } from 'react';
import { Radio, Form, Input } from 'antd';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Answer to this question is required!',
};

const ProfileDUIAndCrimHistory = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '50%',
  };

  return (
    <div>
      <h1>PROFILE DUI/Criminal History</h1>
      <Form
        layout="vertical"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        name="dui_criminal_history"
        validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item
          name="convictHistory"
          label="Have you ever been convicted of violation of any law?"
        >
          <Radio.Group disabled>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
            <Radio value="preferNot">Prefer not to say</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="convictSpecification"
          label="If you replied YES to the previous question, please specify your most recent violation."
        >
          <Input.TextArea style={inputBoxStyle} disabled />
        </Form.Item>

        <Form.Item name="duiHistory" label="Do you have any DUI history?">
          <Radio.Group disabled>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
            <Radio value="preferNot">Prefer not to say</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="duiSpecification"
          label="If you replied YES to the previous question, please specify your most recent DUI violation."
        >
          <Input.TextArea style={inputBoxStyle} disabled />
        </Form.Item>

        <Form.Item label="Please write down any additional information you would like us to know:">
          <Input.TextArea style={inputBoxStyle} disabled />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileDUIAndCrimHistory;
