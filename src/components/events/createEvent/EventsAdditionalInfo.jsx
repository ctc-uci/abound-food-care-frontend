import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Form, Input, Upload, Button, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import WaiversGrid from '../../waivers/WaiversGrid';
import useViewPort from '../../../common/useViewPort';
import styles from './CreateEvent.module.css';

const { TextArea } = Input;
const { Title } = Typography;

const EventsAdditionalInfo = ({ isEdit }) => {
  const { width } = useViewPort();
  const breakpoint = 720;
  const { control } = useFormContext();

  return (
    <div>
      <Title level={2}>Additional Information</Title>
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
                    <Button icon={<RightOutlined />} className={styles.uploadBtn}>
                      {' '}
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
              )}
            />
          )}
        </>
      ) : (
        <div>
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
                    <Button icon={<RightOutlined />} className={styles.uploadBtn}>
                      {' '}
                      Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

EventsAdditionalInfo.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export default EventsAdditionalInfo;
