import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Radio, Input, Row, Col } from 'antd';

import { nullOrErrorMessage } from '../../../util/utils';
import styles from './AdditionalInfo.module.css';

const RequiredStar = () => <span className={styles.required}>*</span>;

const AdditionalInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h1 className={styles.heading}>Additional Information</h1>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={10}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Have you ever been convicted of violation of any law?
          </div>
        </Col>
        <Col span={8}>
          <Controller
            control={control}
            name="criminalHistory"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Radio.Group className={styles.radioInput} {...{ ref, value, onChange }}>
                  <Radio value="true">Yes</Radio>
                  <Radio value="false">No</Radio>
                </Radio.Group>
              </>
            )}
          />
          <p className={styles.errText}>
            {errors.criminalHistory &&
              nullOrErrorMessage('Criminal History', errors.criminalHistory.message)}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={10}>
          <div className={styles.fieldName}>
            If you replied YES to the previous question, please specify your most recent violation.
          </div>
        </Col>
        <Col span={10}>
          <Controller
            control={control}
            name="criminalHistoryDetails"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input.TextArea
                  rows={2}
                  className={styles.fieldInput}
                  {...{ ref, value, onChange }}
                />
              </>
            )}
          />
          <p className={styles.errText}>
            {errors.criminalHistoryDetails && errors.criminalHistoryDetails.message}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={10}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Do you have a DUI (Driving Under Influence) history?
          </div>
        </Col>
        <Col span={8}>
          <Controller
            control={control}
            name="duiHistory"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Radio.Group className={styles.radioInput} {...{ ref, value, onChange }}>
                  <Radio value="true">Yes</Radio>
                  <Radio value="false">No</Radio>
                </Radio.Group>
              </>
            )}
          />
          <p className={styles.errText}>
            {errors.duiHistory && nullOrErrorMessage('DUI History', errors.duiHistory.message)}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={10}>
          <div className={styles.fieldName}>
            If you replied YES to the previous question, please specify your most recent violation.
          </div>
        </Col>
        <Col span={10}>
          <Controller
            control={control}
            name="duiHistoryDetails"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input.TextArea
                  rows={2}
                  className={styles.fieldInput}
                  {...{ ref, value, onChange }}
                />
              </>
            )}
          />
          <p className={styles.errText}>
            {errors.duiHistoryDetails && errors.duiHistoryDetails.message}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={10}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Have you completed Chowmatch Training?
          </div>
        </Col>
        <Col span={8}>
          <Controller
            control={control}
            name="completedChowmatchTraining"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Radio.Group className={styles.radioInput} {...{ ref, value, onChange }}>
                  <Radio value="true">Yes</Radio>
                  <Radio value="false">No</Radio>
                </Radio.Group>
              </>
            )}
          />
          <p className={styles.errText}>
            {errors.completedChowmatchTraining &&
              nullOrErrorMessage(
                'Indicating whether you have completed Chowmatch training',
                errors.completedChowmatchTraining.message,
              )}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={10}>
          <div className={styles.fieldName}>
            Please write down any additional information you would like us to know.
          </div>
        </Col>
        <Col span={10}>
          <Controller
            control={control}
            name="additionalInfo"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input.TextArea
                  rows={3}
                  className={styles.fieldInput}
                  {...{ ref, value, onChange }}
                />
              </>
            )}
          />
          <p className={styles.errText}>{errors.additionalInfo && errors.additionalInfo.message}</p>
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalInfo;
