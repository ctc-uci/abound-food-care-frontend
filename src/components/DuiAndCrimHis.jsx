import React from 'react';
import { Radio, Form, Input, Button } from 'antd';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const DuiAndCrimHis = () => {
  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <h1>DUI and Criminal History</h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="dui_criminal_history"
        validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Do you have a DUI (Driving Under Influence) history?" required>
          <Radio.Group>
            <Radio value>Yes</Radio>
            <Radio value>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Please elaborate if you checked Yes:">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Do you have a criminal history?" required>
          <Radio.Group>
            <Radio value>Yes</Radio>
            <Radio value>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Please elaborate if you checked Yes:">
          <Input.TextArea />
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
