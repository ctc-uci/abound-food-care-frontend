/* eslint-disable no-unused-vars */
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Radio, Form, Input } from 'antd';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Answer to this question is required!',
};

const DuiAndCrimHis = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  // const { prevPage, setDuiAndCrimHis } = props;
  // const onFinish = async values => {
  //   await setDuiAndCrimHis(values);
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
      <h1>DUI/Criminal History, Training, & Additional History</h1>
      {/* <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="dui_criminal_history"
        onFinish={onFinish}
        validateMessages={validateMessages}
        size={componentSize}
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={(onRequiredTypeChange, onFormLayoutChange)}
        requiredMark={requiredMark}
      > */}
      <Controller
        control={control}
        name="duiHistory"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Do you have a DUI (Driving Under Influence) history?">
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="duiHistoryDetails"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="If yes, please elaborate:">
            <Input.TextArea onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="criminalHistory"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Do you have a criminal history?">
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="criminalHistoryDetails"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="If yes, please elaborate:">
            <Input.TextArea onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="completedChowmatch"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Completed Chowmatch Training?">
            <Radio.Group onChange={onChange} ref={ref} value={value}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="additionalInfo"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Additional Information (optional)">
            <Input.TextArea onChange={onChange} ref={ref} />
          </Form.Item>
        )}
      />
      {/* </Form> */}
    </div>
  );
};

// DuiAndCrimHis.propTypes = {
//   prevPage: PropTypes.func.isRequired,
//   setDuiAndCrimHis: PropTypes.func.isRequired,
// };

export default DuiAndCrimHis;
