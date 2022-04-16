import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Form, Input, Upload, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const EventsAdditionalInfo = () => {
  const { control } = useFormContext();
  return (
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
        name="waiverAttachments"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Upload Forms">
            <Upload
              multiple
              ref={ref}
              onChange={e => onChange(e.fileList)}
              customRequest={e => e.onSuccess('Ok')}
            >
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
      {/* <Form.Item label="Upload Forms">
        <Upload
          multiple
          onChange={e => setFilesList(e.fileList)}
          customRequest={e => e.onSuccess('Ok')}
        >
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
      </Form.Item> */}
    </div>
  );
};

export default EventsAdditionalInfo;
