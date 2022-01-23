import React from 'react';
import { Radio, Form, Input, Button } from 'antd';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const DuiAndCrimHis = () => {
  const [componentSize, setComponentSize] = React.useState('default');
  const [requiredMark, setRequiredMarkType] = React.useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <h1>DUI/Criminal History, Training, & Additional History</h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="dui_criminal_history"
        validateMessages={validateMessages}
        size={componentSize}
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={(onRequiredTypeChange, onFormLayoutChange)}
        requiredMark={requiredMark}
      >
        <Form.Item label="Do you have a DUI (Driving Under Influence) history?" required>
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="If yes, please elaborate:" required>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Do you have a criminal history?" required>
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="If yes, please elaborate:" required>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Have you completed the Chowmatch Training?" required>
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Additional Information:">
          <Input.TextArea placeholder="Please write anything we should know." />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DuiAndCrimHis;
