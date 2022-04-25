import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Form, Input, Upload, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import WaiversGrid from '../../waivers/WaiversGrid';

const EventsAdditionalInfo = ({ isEdit }) => {
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
      {isEdit ? (
        <>
          <Controller
            control={control}
            name="waivers"
            render={({ field: { value } }) => (
              <>
                <h1>
                  Waivers ({value.length}) {value.length > 0 ? ':' : ''}
                </h1>
                <WaiversGrid waivers={value} />
              </>
            )}
          />
          <br />
        </>
      ) : (
        <Controller
          control={control}
          name="waivers"
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item label="Upload Forms">
              <Upload
                multiple
                ref={ref}
                onChange={e => onChange(e.fileList)}
                fileList={value}
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
      )}
    </div>
  );
};

EventsAdditionalInfo.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export default EventsAdditionalInfo;
