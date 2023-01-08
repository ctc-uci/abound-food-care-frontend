import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputNumber, Radio, Select, Checkbox, Row, Col } from 'antd';

import { languageOptions, nullOrErrorMessage } from '../../../util/utils';
import styles from './RolesAndSkills.module.css';

const RequiredStar = () => <span className={styles.required}>*</span>;

const RolesAndSkills = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // for showing optional fields
  const [willDrive, setWillDrive] = useState(false);

  return (
    <div>
      <h1 className={styles.heading}>Interested Roles &amp; Skills</h1>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={7}>
          <div className={styles.fieldName}>Events Interested In:</div>
        </Col>
        <Col span={10}>
          <Controller
            control={control}
            name="foodRunning"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Checkbox className={styles.checkbox} {...{ ref, value, onChange }}>
                  Food Running
                </Checkbox>
              </>
            )}
          />
          <Controller
            control={control}
            name="distribution"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Checkbox className={styles.checkbox} {...{ ref, value, onChange }}>
                  Distribution
                </Checkbox>
              </>
            )}
          />
          <p className={styles.errText}>
            {(errors.foodRunning && errors.foodRunning.message) ||
              (errors.distribution && errors.distribution.message)}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={7}>
          <div className={styles.fieldName}>Skills & Experience:</div>
        </Col>
        <Col span={10}>
          <Row>
            <Controller
              control={control}
              name="transportationExperience"
              render={({ field: { onChange, value, ref } }) => (
                <>
                  <Checkbox className={styles.longCheckbox} {...{ ref, value, onChange }}>
                    Transportation
                  </Checkbox>
                </>
              )}
            />
            <Controller
              control={control}
              name="movingWarehouseExperience"
              render={({ field: { onChange, value, ref } }) => (
                <>
                  <Checkbox className={styles.longCheckbox} {...{ ref, value, onChange }}>
                    Moving/Warehouse
                  </Checkbox>
                </>
              )}
            />
            <Controller
              control={control}
              name="serveSafeKnowledge"
              render={({ field: { onChange, value, ref } }) => (
                <>
                  <Checkbox className={styles.longCheckbox} {...{ ref, value, onChange }}>
                    Serve Safe Knowledge
                  </Checkbox>
                </>
              )}
            />
            <Controller
              control={control}
              name="foodServiceIndustryKnowledge"
              render={({ field: { onChange, value, ref } }) => (
                <>
                  <Checkbox className={styles.longCheckbox} {...{ ref, value, onChange }}>
                    Food Service Industry Knowledge
                  </Checkbox>
                </>
              )}
            />
            <Controller
              control={control}
              name="firstAidTraining"
              render={({ field: { onChange, value, ref } }) => (
                <>
                  <Checkbox className={styles.longCheckbox} {...{ ref, value, onChange }}>
                    First Aid Training
                  </Checkbox>
                </>
              )}
            />
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={7}>
          <div className={styles.fieldName}>Languages Spoken:</div>
        </Col>
        <Col span={10}>
          <Row>
            {languageOptions.map(lang => (
              <Controller
                control={control}
                name={lang}
                key={lang}
                render={({ field: { onChange, value, ref } }) => (
                  <>
                    <Checkbox
                      className={`${styles.langCheckbox} ${styles.checkbox}`}
                      {...{ ref, value, onChange }}
                    >
                      {lang.charAt(0).toUpperCase() + lang.substring(1)}
                    </Checkbox>
                  </>
                )}
              />
            ))}
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={7}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Weightlifting Ability:
          </div>
        </Col>
        <Col span={4}>
          <Controller
            control={control}
            name="weightLiftingAbility"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <InputNumber
                  className={styles.fieldInput}
                  min={0}
                  size="medium"
                  {...{ ref, value, onChange }}
                />
                <span className={styles.wlText}>lbs</span>
              </>
            )}
          />
          <p className={styles.errText}>
            {errors.weightLiftingAbility &&
              nullOrErrorMessage('Weightlifting ability', errors.weightLiftingAbility.message)}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={7}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Can you drive?
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="canDrive"
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
            {errors.canDrive && nullOrErrorMessage('Driving ability', errors.canDrive.message)}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={7}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Are you willing to drive?
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="willingToDrive"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Radio.Group className={styles.radioInput} {...{ ref, value, onChange }}>
                  <Radio value="true" onClick={() => setWillDrive(true)}>
                    Yes
                  </Radio>
                  <Radio value="false" onClick={() => setWillDrive(false)}>
                    No
                  </Radio>
                </Radio.Group>
              </>
            )}
          />
          <p className={styles.errText}>
            {errors.willingToDrive &&
              nullOrErrorMessage('Driving preference', errors.willingToDrive.message)}
          </p>
        </Col>
      </Row>
      {willDrive && (
        <>
          <Row gutter={[16, 16]} className={styles.fieldRow}>
            <Col span={7}>
              <div className={styles.fieldName}>Vehicle Type:</div>
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="distance"
                render={({ field: { onChange, value, ref } }) => (
                  <>
                    <Select
                      className={styles.select}
                      placeholder="Please select"
                      {...{ ref, value, onChange }}
                    >
                      {[
                        'Large vehicle (Van, Truck, SUV)',
                        'Mid-Size Vehicle',
                        'Small Vehicle (Compact, Sedan)',
                      ].map(vType => (
                        <Select.Option key={vType} value={vType}>
                          {vType}
                        </Select.Option>
                      ))}
                    </Select>
                  </>
                )}
              />
              <p className={styles.errText}>{errors.vehicleType && errors.vehicleType.message}</p>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className={styles.fieldRow}>
            <Col span={7}>
              <div className={styles.fieldName}>How many miles are you comfortable driving?</div>
            </Col>
            <Col span={4}>
              <Controller
                control={control}
                name="vehicleType"
                render={({ field: { onChange, value, ref } }) => (
                  <>
                    <InputNumber
                      className={styles.fieldInput}
                      min={0}
                      defaultValue={0}
                      size="medium"
                      {...{ ref, value, onChange }}
                    />
                    <span className={styles.wlText}>miles</span>
                  </>
                )}
              />
              <p className={styles.errText}>
                {errors.vehicleType &&
                  nullOrErrorMessage('Driving distance', errors.vehicleType.message)}
              </p>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default RolesAndSkills;
