import React, { useState } from 'react';
// import axios from 'axios';
import { Form, Button } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GeneralInfo from '../components/create-account/GeneralInfo';
import DuiAndCrimHis from '../components/create-account/DuiAndCrimHis';
import RolesAndSkills from '../components/create-account/RolesAndSkills';
import WeeklyInfo from '../components/create-account/WeeklyInfo';

const CreateAccount = () => {
  const [formStep, setFormStep] = useState(0);

  const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    role: yup.string().required(),
    organization: yup.string().required(),
    birthdate: yup.date().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    preferredContactMethod: yup.string().required(),
    addressStreet: yup.string().required(),
    addressZip: yup
      .string()
      .test('len', 'Zipcode must contain only 5 digits', val => val.length === 5)
      .required(),
    addressCity: yup.string().required(),
    addressState: yup
      .string()
      .test('len', 'Must be a 2-letter state code', val => val.length === 2)
      .required(),
    weightLiftingAbility: yup.number().integer().required(),
    criminalHistory: yup.bool().required(),
    criminalHistoryDetails: yup.string(),
    duiHistory: yup.bool().required(),
    duiHistoryDetails: yup.string(),
    completedChowmatchTraining: yup.bool().required(),
    foodRunsInterest: yup.bool().required(),
    distributionInterest: yup.bool().required(),
    canDrive: yup.bool().required(),
    willingToDrive: yup.bool().required(),
    vehicleType: yup.string().required(),
    distance: yup.number().integer().required(),
    firstAidTraining: yup.bool().required(),
    serveSafeKnowledge: yup.bool().required(),
    transportationExperience: yup.bool().required(),
    movingWarehouseExperience: yup.bool().required(),
    foodServiceIndustryKnowledge: yup.bool().required(),
    languages: yup.array().of(yup.string()),
    additionalInformation: yup.string(),
    availabilities: yup.array(
      yup.object({
        dayOfWeek: yup.string().required(),
        startTime: yup.date().required(),
        endTime: yup.date().required(),
      }),
    ),
  });

  const methods = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      role: 'volunteer',
      organization: '',
      birthdate: '',
      email: '',
      phone: '',
      preferredContactMethod: '',
      addressStreet: '',
      addressZip: '',
      addressCity: '',
      addressState: '',
      weightLiftingAbility: null,
      criminalHistory: false,
      criminalHistoryDetails: '',
      duiHistory: false,
      duiHistoryDetails: '',
      completedChowmatchTraining: false,
      foodRunsInterest: false,
      distributionInterest: false,
      canDrive: false,
      willingToDrive: false,
      vehicleType: '',
      distance: null,
      firstAidTraining: false,
      serveSafeKnowledge: false,
      transportationExperience: false,
      movingWarehouseExperience: false,
      foodServiceIndustryKnowledge: false,
      languages: [],
      additionalInformation: '',
      availabilities: [],
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
    delayError: 750,
  });

  const incrementFormStep = () => {
    setFormStep(cur => cur + 1);
  };

  const decrementFormStep = () => {
    setFormStep(cur => cur - 1);
  };

  const buildLanguagesArray = values => {
    const languages = [];
    if (values.english) {
      languages.push('english');
    }
    if (values.spanish) {
      languages.push('spanish');
    }
    if (values.french) {
      languages.push('french');
    }
    if (values.chinese) {
      languages.push('chinese');
    }
    if (values.tagalog) {
      languages.push('tagalog');
    }
    if (values.korean) {
      languages.push('korean');
    }
    if (values.arabic) {
      languages.push('arabic');
    }
    if (values.german) {
      languages.push('german');
    }
    if (values.vietnamese) {
      languages.push('vietnamese');
    }

    return languages;
  };

  const onSubmit = values => {
    try {
      // TODO: build languages array, availabilities array
      const languages = buildLanguagesArray(values);

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        organization: values.organization,
        birthdate: values.birthdate,
        email: values.email,
        phone: values.phone,
        preferredContactMethod: values.preferredContactMethod,
        addressStreet: values.addressStreet,
        addressZip: values.addressZip,
        addressCity: values.addressCity,
        addressState: values.addressState,
        weightLiftingAbility: values.weightLiftingAbility,
        criminalHistory: values.criminalHistory,
        criminalHistoryDetails: values.criminalHistoryDetails,
        duiHistory: values.duiHistory,
        duiHistoryDetails: values.duiHistoryDetails,
        completedChowmatchTraining: values.completedChowmatchTraining,
        foodRunsInterest: values.foodRunsInterest,
        distributionInterest: values.distributionInterest,
        canDrive: values.canDrive,
        willingToDrive: values.willingToDrive,
        vehicleType: values.vehicleType,
        distance: values.distance,
        firstAidTraining: values.firstAidTraining,
        serveSafeKnowledge: values.serveSafeKnowledge,
        transportationExperience: values.transportationExperience,
        movingWarehouseExperience: values.movingWarehouseExperience,
        foodServiceIndustryKnowledge: values.foodServiceIndustryKnowledge,
        languages,
        additionalInformation: values.additionalInformation,
        availabilities: values.availabilities,
      };

      console.log(payload);
      // await axios.post('http://localhost:3001/users/', payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div>
      <FormProvider {...methods}>
        <Form onFinish={methods.handleSubmit(onSubmit, onError)}>
          {formStep >= 0 && (
            <section hidden={formStep !== 0}>
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
          {formStep >= 1 && (
            <section hidden={formStep !== 1}>
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
          {formStep >= 2 && (
            <section hidden={formStep !== 2}>
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
          {formStep >= 3 && (
            <section hidden={formStep !== 3}>
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