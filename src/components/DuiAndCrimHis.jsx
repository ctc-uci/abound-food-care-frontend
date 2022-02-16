import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio, Form, Input, Button } from 'antd';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Answer to this question is required!',
};

const DuiAndCrimHis = props => {
  const { submitForm, prevPage, setDuiAndCrimHis } = props;
  const onFinish = values => {
    setDuiAndCrimHis(values);
    submitForm();
  };

  const [componentSize, setComponentSize] = useState('default');
  const [requiredMark, setRequiredMarkType] = useState('optional');

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
        onFinish={onFinish}
        validateMessages={validateMessages}
        size={componentSize}
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={(onRequiredTypeChange, onFormLayoutChange)}
        requiredMark={requiredMark}
      >
        <Form.Item
          name="DuiHistory"
          label="Do you have a DUI (Driving Under Influence) history?"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="duiElaboration"
          label="If yes, please elaborate:"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="crimHistory"
          label="Do you have a criminal history?"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="crimHisElaboration"
          label="If yes, please elaborate:"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="chowmatchTraining"
          label="Have you completed the Chowmatch Training?"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Additional Information:">
          <Input.TextArea placeholder="Please write anything we should know." />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button type="primary" htmlType="button" onClick={prevPage}>
            Previous
          </Button>
          <Button type="primary" htmlType="submit">
            Finish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

DuiAndCrimHis.propTypes = {
  submitForm: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  setDuiAndCrimHis: PropTypes.func.isRequired,
};

export default DuiAndCrimHis;
