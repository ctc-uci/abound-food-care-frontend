/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Upload, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

const EventsAdditionalInfo = ({ states, setStates }) => {
  const [componentSize, setComponentSize] = React.useState('default');

  const { fileAttachments } = states;

  const { setAdditionalInfo, setFileAttachments } = setStates;

  const onFileUpload = fileList => {
    setFileAttachments({ fileAttachments: [...fileList] });
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <h1> Additional Information </h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="nest-messages"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Additional Info" onChange={e => setAdditionalInfo(e.target.value)}>
          <Input placeholder="Ex. This event will take place on December 3, 2021 at 9:00AM." />
        </Form.Item>

        <Form.Item label="Upload Forms">
          <Upload multiple fileList={fileAttachments} onChange={onFileUpload}>
            <Button
              icon={<RightOutlined />}
              style={{
                background: 'rgba(108, 194, 74, 0.25)',
                color: 'rgba(0, 0, 0, 0.85)',
                border: 'rgba(17, 87, 64, 0.25)',
              }}
            >
              {' '}
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </div>
  );
};

EventsAdditionalInfo.propTypes = {
  states: PropTypes.objectOf(PropTypes.any).isRequired,
  setStates: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EventsAdditionalInfo;
