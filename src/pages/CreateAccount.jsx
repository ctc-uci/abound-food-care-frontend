import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import GeneralInfo from '../components/create-account/GeneralInfo';
import DuiAndCrimHis from '../components/create-account/DuiAndCrimHis';
import RolesAndSkills from '../components/create-account/RolesAndSkills';
import WeeklyInfo from '../components/create-account/WeeklyInfo';

const CreateAccount = () => {
  const [formStep, setFormStep] = useState(0);

  const methods = useForm({});

  const incrementFormStep = () => {
    setFormStep(cur => cur + 1);
  };

  const decrementFormStep = () => {
    setFormStep(cur => cur - 1);
  };

  const onSubmit = values => {
    try {
      console.log(JSON.stringify(values, null, 2));
    } catch (e) {
      console.log(e.message);
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div>
      <FormProvider {...methods}>
        <Form onFinish={methods.handleSubmit(onSubmit, onError)}>
          {formStep === 0 && (
            <section>
              <GeneralInfo />
              <div>
                <Button
                  style={{
                    background: '#115740',
                    color: 'white',
                    borderColor: '#115740',
                    float: 'right',
                  }}
                  onClick={incrementFormStep}
                >
                  Next
                </Button>
              </div>
            </section>
          )}
          {formStep === 1 && (
            <section>
              <WeeklyInfo />
              <div>
                <Button
                  style={{
                    borderColor: '#D9D9D9',
                  }}
                  onClick={decrementFormStep}
                >
                  Previous
                </Button>
                <Button
                  style={{
                    background: '#115740',
                    color: 'white',
                    borderColor: '#115740',
                    float: 'right',
                  }}
                  onClick={incrementFormStep}
                >
                  Next
                </Button>
              </div>
            </section>
          )}
          {formStep === 2 && (
            <section>
              <RolesAndSkills />
              <div>
                <Button
                  style={{
                    borderColor: '#D9D9D9',
                  }}
                  onClick={decrementFormStep}
                >
                  Previous
                </Button>
                <Button
                  style={{
                    background: '#115740',
                    color: 'white',
                    borderColor: '#115740',
                    float: 'right',
                  }}
                  onClick={incrementFormStep}
                >
                  Next
                </Button>
              </div>
            </section>
          )}
          {formStep === 3 && (
            <section>
              <DuiAndCrimHis />
              <div>
                <Button
                  style={{
                    borderColor: '#D9D9D9',
                  }}
                  onClick={decrementFormStep}
                >
                  Previous
                </Button>
                <Button
                  style={{
                    background: '#115740',
                    color: 'white',
                    borderColor: '#115740',
                    float: 'right',
                  }}
                  htmlType="submit"
                >
                  Finish
                </Button>
              </div>
            </section>
          )}
          <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
        </Form>
      </FormProvider>
    </div>
  );
};

export default CreateAccount;
