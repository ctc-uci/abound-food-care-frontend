import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Form, Input, Upload, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useViewPort from '../../../common/useViewPort';
import './createEvent.css';

const { TextArea } = Input;

const EventsAdditionalInfo = () => {
  const { width } = useViewPort();
  const breakpoint = 720;
  const { control } = useFormContext();

  return (
    <div>
      <h1> Additional Info </h1>
      <div className="description">
        <h2>Include additional information you would like your volunteers to know.</h2>
      </div>
      {width < breakpoint ? (
        <>
          <br />
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Additional Info">
                <TextArea
                  placeholder="Ex: This event will take place on December 3, 2021 at 9:00AM"
                  autoSize={{ minRows: 7, maxRows: 7 }}
                  ref={ref}
                  onChange={onChange}
                  value={value}
                />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="fileAttachments"
            render={({ field: { onChange, ref } }) => (
              <Form.Item label="Upload Forms">
                <Upload multiple ref={ref} onChange={onChange}>
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
            )}
          />
        </>
      ) : (
        <div>
          <h1> Additional Information </h1>
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Additional Info">
                <Input
                  placeholder="Ex. This event will take place on December 3, 2021 at 9:00AM."
                  ref={ref}
                  onChange={onChange}
                  value={value}
                />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="fileAttachments"
            render={({ field: { onChange, ref } }) => (
              <Form.Item label="Upload Forms">
                <Upload multiple ref={ref} onChange={onChange}>
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
            )}
          />
        </div>
      )}
    </div>
  );
};

export default EventsAdditionalInfo;
