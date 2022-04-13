import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, Radio, Form, Select, Checkbox, Row, Typography } from 'antd';

const { Text } = Typography;

const { Option } = Select;

const RolesAndSkills = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h1>Interested Roles and Skills</h1>
      <section>
        <Form.Item label="Events Interested In">
          <Row>
            <Controller
              control={control}
              name="foodRunning"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Food Running
                  </Checkbox>
                  <Text type="danger">
                    {errors.foodRunning && <p>{errors.foodRunning.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="distribution"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Distribution
                  </Checkbox>
                  <Text type="danger">
                    {errors.distribution && <p>{errors.distribution.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
          </Row>
        </Form.Item>
      </section>
      <section>
        <Form.Item label="Skills (optional)">
          <Row>
            <Controller
              control={control}
              name="firstAidTraining"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    First Aid Training
                  </Checkbox>
                  <Text type="danger">
                    {errors.firstAidTraining && <p>{errors.firstAidTraining.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="serveSafeKnowledge"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Serve Safe Knowledge
                  </Checkbox>
                  <Text type="danger">
                    {errors.serveSafeKnowledge && <p>{errors.serveSafeKnowledge.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="transportationExperience"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Transportation Experience
                  </Checkbox>
                  <Text type="danger">
                    {errors.transportationExperience && (
                      <p>{errors.transportationExperience.message}</p>
                    )}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="movingWarehouseExperience"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Moving/Warehouse Experience
                  </Checkbox>
                  <Text type="danger">
                    {errors.movingWarehouseExperience && (
                      <p>{errors.movingWarehouseExperience.message}</p>
                    )}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="foodServiceIndustryKnowledge"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Food Service Industry Knowledge
                  </Checkbox>
                  <Text type="danger">
                    {errors.foodServiceIndustryKnowledge && (
                      <p>{errors.foodServiceIndustryKnowledge.message}</p>
                    )}
                  </Text>
                </Form.Item>
              )}
            />
          </Row>
        </Form.Item>
      </section>
      <section>
        <Form.Item label="Languages Spoken">
          <Row>
            <Controller
              control={control}
              name="english"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    English
                  </Checkbox>
                  <Text type="danger">{errors.english && <p>{errors.english.message}</p>}</Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="spanish"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Spanish
                  </Checkbox>
                  <Text type="danger">{errors.spanish && <p>{errors.spanish.message}</p>}</Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="french"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    French
                  </Checkbox>
                  {errors.french && <p>{errors.french.message}</p>}
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="chinese"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Chinese
                  </Checkbox>
                  <Text type="danger">{errors.chinese && <p>{errors.chinese.message}</p>}</Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="tagalog"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Tagalog
                  </Checkbox>
                  <Text type="danger" />
                  {errors.tagalog && <p>{errors.tagalog.message}</p>}
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="korean"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Korean
                  </Checkbox>
                  <Text type="danger">{errors.korean && <p>{errors.korean.message}</p>}</Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="arabic"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Arabic
                  </Checkbox>
                  <Text type="danger">{errors.arabic && <p>{errors.arabic.message}</p>}</Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="german"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    German
                  </Checkbox>
                  <Text type="danger">{errors.german && <p>{errors.german.message}</p>}</Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="vietnamese"
              render={({ field: { onChange, value, ref } }) => (
                <Form.Item>
                  <Checkbox onChange={onChange} ref={ref} checked={value}>
                    Vietnamese
                  </Checkbox>
                  <Text type="danger">
                    {errors.vietnamese && <p>{errors.vietnamese.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
          </Row>
        </Form.Item>
      </section>
      <Controller
        control={control}
        name="weightLiftingAbility"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Weightlifting Ability" required>
            <Input onChange={onChange} ref={ref} placeholder="0 lbs" />
            <Text type="danger">
              {errors.weightLiftingAbility && <p>{errors.weightLiftingAbility.message}</p>}
            </Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="canDrive"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Can you drive?" required>
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
            <Text type="danger">{errors.canDrive && <p>{errors.canDrive.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="willingToDrive"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Are you willing to drive?" required>
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
            <Text type="danger">
              {errors.willingToDrive && <p>{errors.willingToDrive.message}</p>}
            </Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="vehicleType"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Vehicle Type:">
            <Select placeholder="Please select" onChange={onChange} ref={ref}>
              <Option value="Large Vehicle (Van, Truck, SUV)">
                Large Vehicle (Van, Truck, SUV)
              </Option>
              <Option value="Mid-Size Vehicle">Mid-Size Vehicle</Option>
              <Option value="Small Vehicle (Compact, Sedan)">Small Vehicle (Compact, Sedan)</Option>
            </Select>
            <Text type="danger">{errors.vehicleType && <p>{errors.vehicleType.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="distance"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="How many miles are you comfortable driving?">
            <Input
              placeholder="Ex. 0, 10, 15, 20"
              onChange={onChange}
              ref={ref}
              style={{ width: '200px' }}
            />
            <Text type="danger">{errors.distance && <p>{errors.distance.message}</p>}</Text>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default RolesAndSkills;
