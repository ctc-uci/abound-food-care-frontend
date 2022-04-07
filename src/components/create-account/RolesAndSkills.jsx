/* eslint-disable no-unused-vars */
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// import PropTypes from 'prop-types';
import { Input, Radio, Form, Select, Checkbox, Row } from 'antd';

const { Option } = Select;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Answer to this question is required!',
};

const RolesAndSkills = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  // const { nextPage, prevPage, setRolesAndSkills } = props;
  // const onFinish = values => {
  //   setRolesAndSkills(values);
  //   nextPage();
  // };

  // const [componentSize, setComponentSize] = useState('default');
  // const [requiredMark, setRequiredMarkType] = useState('optional');

  // const onRequiredTypeChange = ({ requiredMarkValue }) => {
  //   setRequiredMarkType(requiredMarkValue);
  // };

  // const onFormLayoutChange = ({ size }) => {
  //   setComponentSize(size);
  // };

  return (
    <div>
      <h1>Interested Roles and Skills</h1>
      {/* <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        name="roles_n_skills"
        size={componentSize}
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={(onRequiredTypeChange, onFormLayoutChange)}
        requiredMark={requiredMark}
      > */}
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
          <Form.Item label="Weightlifting Ability">
            <Input onChange={onChange} ref={ref} placeholder="0 lbs" />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="canDrive"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Can you drive?">
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="willingToDrive"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Are you willing to drive?">
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
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
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="distance"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="How many miles are you comfortable driving?">
            <Input placeholder="0 miles" onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      {/* </Form> */}
    </div>
  );
};

// RolesAndSkills.propTypes = {
//   nextPage: PropTypes.func.isRequired,
//   prevPage: PropTypes.func.isRequired,
//   setRolesAndSkills: PropTypes.func.isRequired,
// };

export default RolesAndSkills;
