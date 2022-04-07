import React from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { TextArea } = Input;

// import useMobileWidth from '../../../common/useMobileWidth';

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

const isMobile = true;

const EventsAdditionalInfo = () => {
  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <h1> Additional Information </h1>
      <h1>Include additional information you would like your volunteers to know.</h1>

      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="nest-messages"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        {isMobile ? (
          <>
            <Form.Item label="Additional Info">
              <TextArea placeholder="Controlled autosize" autoSize={{ minRows: 7, maxRows: 7 }} />
            </Form.Item>
            <Form.Item label="Upload Forms">
              <Upload>
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
          </>
        ) : (
          <>
            <Form.Item label="Additional Info">
              <Input placeholder="Ex. This event will take place on December 3, 2021 at 9:00AM." />
            </Form.Item>
            <Form.Item label="Upload Forms">
              <Upload>
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
          </>
        )}
      </Form>
    </div>
  );
};

export default EventsAdditionalInfo;
