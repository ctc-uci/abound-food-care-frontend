import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Radio, Form, Input, Typography } from 'antd';

import styles from './DuiAndCrimHis.module.css';

const { Text } = Typography;

const DuiAndCrimHis = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <center>
        <h1 className={styles.heading}>DUI/Criminal History, Training, & Additional History</h1>
      </center>
      <Controller
        control={control}
        name="duiHistory"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Do you have a DUI (Driving Under Influence) history?" required>
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
            <Text type="danger">{errors.duiHistory && <p>{errors.duiHistory.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="duiHistoryDetails"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="If yes, please elaborate:">
            <Input.TextArea onChange={onChange} ref={ref} />
            <Text type="danger">
              {errors.duiHistoryDetails && <p>{errors.duiHistoryDetails.message}</p>}
            </Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="criminalHistory"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Do you have a criminal history?" required>
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
            <Text type="danger">
              {errors.criminalHistory && <p>{errors.criminalHistory.message}</p>}
            </Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="criminalHistoryDetails"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="If yes, please elaborate:">
            <Input.TextArea onChange={onChange} ref={ref} />
            <Text type="danger">
              {errors.criminalHistoryDetails && <p>{errors.criminalHistoryDetails.message}</p>}
            </Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="completedChowmatch"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Completed Chowmatch Training?" required>
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
            <Text type="danger">
              {errors.completedChowmatch && <p>{errors.completedChowmatch.message}</p>}
            </Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="additionalInfo"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Additional Information (optional)">
            <Input.TextArea onChange={onChange} ref={ref} />
            <Text type="danger">
              {errors.additionalInfo && <p>{errors.additionalInfo.message}</p>}
            </Text>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default DuiAndCrimHis;
