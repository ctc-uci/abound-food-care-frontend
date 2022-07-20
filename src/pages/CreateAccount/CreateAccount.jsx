import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Steps } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GeneralInfo from '../../components/create-account/GeneralInfo/GeneralInfo';
import DuiAndCrimHis from '../../components/create-account/DuiAndCrimHis/DuiAndCrimHis';
import RolesAndSkills from '../../components/create-account/RolesAndSkills/RolesAndSkills';
import WeeklyInfo from '../../components/create-account/WeeklyInfo/WeeklyInfo';
import { AFCBackend } from '../../util/utils';

import styles from './CreateAccount.module.css';

const { Step } = Steps;

const CreateAccount = ({ setPageState, firstName, lastName, email }) => {
  const [formStep, setFormStep] = useState(0);
  const [availability, setAvailability] = useState([]);
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const zipRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

  const schema = yup.object({
    firstName: yup.string().required('First name is a required field'),
    lastName: yup.string().required('Last name is a required field'),
    role: yup.string().required(),
    organization: yup.string().required(),
    birthdate: yup.date().required(),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is a required field'),
    preferredContactMethod: yup.string().required(),
    addressStreet: yup.string().required('Street address is a required field'),
    addressZip: yup
      .string()
      .matches(zipRegExp, 'Zipcode is not valid')
      .required('Zipcode is required')
      .test('len', 'Zipcode must contain only 5 digits', val => val.length === 5),
    addressCity: yup.string().required('City is a required field'),
    addressState: yup
      .string()
      .test('len', 'Must be a 2-letter state code', val => val.length === 2)
      .required('State is a required field'),
    weightLiftingAbility: yup.number().integer().required(),
    criminalHistory: yup.bool().required(),
    criminalHistoryDetails: yup.string().nullable(true),
    duiHistory: yup.bool().required(),
    duiHistoryDetails: yup.string().nullable(true),
    completedChowmatchTraining: yup.bool().required(),
    foodRunsInterest: yup.bool().required(),
    distributionInterest: yup.bool().required(),
    canDrive: yup.bool().required(),
    willingToDrive: yup.bool().required(),
    vehicleType: yup.string(),
    distance: yup.number().integer().nullable(true),
    firstAidTraining: yup.bool().required(),
    serveSafeKnowledge: yup.bool().required(),
    transportationExperience: yup.bool().required(),
    movingWarehouseExperience: yup.bool().required(),
    foodServiceIndustryKnowledge: yup.bool().required(),
    languages: yup.array().of(yup.string()),
    additionalInformation: yup.string().nullable(true),
  });

  const methods = useForm({
    defaultValues: {
      firstName,
      lastName,
      role: 'volunteer',
      organization: '',
      birthdate: '',
      email,
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

  // TODO: backend connection once auth is finalized
  const onSubmit = async values => {
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
      availabilities: availability,
    };
    await AFCBackend.post('/users/', payload);
  };

  return (
    <div className={styles.wrapper}>
      <FormProvider {...methods}>
        <Form
          labelWrap
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 8 }}
          size={componentSize}
          onValuesChange={onFormLayoutChange}
          onFinish={methods.handleSubmit(onSubmit)}
        >
          <Steps progressDot current={formStep}>
            <Step title="General" />
            <Step title="Availability" />
            <Step title="Roles &amp; Skills" />
            <Step title="Additional Info" />
          </Steps>
          {formStep >= 0 && (
            <section hidden={formStep !== 0}>
              <GeneralInfo firstName={firstName} lastName={lastName} email={email} />
              <div>
                <Button
                  className={styles['login-signup-button']}
                  onClick={() => setPageState('login')}
                >
                  Back
                </Button>
              </div>
              <div>
                <Button className={styles['next-button']} onClick={incrementFormStep}>
                  Next
                </Button>
              </div>
            </section>
          )}
          {formStep >= 1 && (
            <section hidden={formStep !== 1}>
              <WeeklyInfo availability={availability} setAvailability={setAvailability} />
              <div>
                <Button className={styles['previous-button']} onClick={decrementFormStep}>
                  Previous
                </Button>
                <Button className={styles['next-button']} onClick={incrementFormStep}>
                  Next
                </Button>
              </div>
            </section>
          )}
          {formStep >= 2 && (
            <section hidden={formStep !== 2}>
              <RolesAndSkills />
              <div>
                <Button className={styles['previous-button']} onClick={decrementFormStep}>
                  Previous
                </Button>
                <Button className={styles['next-button']} onClick={incrementFormStep}>
                  Next
                </Button>
              </div>
            </section>
          )}
          {formStep >= 3 && (
            <section hidden={formStep !== 3}>
              <DuiAndCrimHis />
              <div>
                <Button className={styles['previous-button']} onClick={decrementFormStep}>
                  Previous
                </Button>
                <Button className={styles['next-button']} htmlType="submit">
                  Finish
                </Button>
              </div>
            </section>
          )}
        </Form>
      </FormProvider>
    </div>
  );
};

CreateAccount.propTypes = {
  setPageState: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default CreateAccount;
