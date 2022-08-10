import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Steps, Typography } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GeneralInfo from '../../components/create-account/GeneralInfo/GeneralInfo';
import DuiAndCrimHis from '../../components/create-account/DuiAndCrimHis/DuiAndCrimHis';
import RolesAndSkills from '../../components/create-account/RolesAndSkills/RolesAndSkills';
import WeeklyInfo from '../../components/create-account/WeeklyInfo/WeeklyInfo';
import { AFCBackend, phoneRegExp, zipRegExp } from '../../util/utils';

import {
  AUTH_ROLES,
  registerWithEmailAndPassword,
  useNavigate,
  passwordRegex,
} from '../../util/auth_utils';

import styles from './CreateAccount.module.css';

const { Text } = Typography;

const { Step } = Steps;

const PAGE_NAME = {
  GENERAL_INFO: 'GeneralInfo',
  AVAILABILITY: 'Availability',
  ROLES_AND_SKILLS: 'RolesAndSkills',
  ADDITIONAL_INFO: 'AdditionalInfo',
};

const CreateAccount = ({ setPageState, firstName, lastName, email, password, role, code }) => {
  const [formStep, setFormStep] = useState(PAGE_NAME.GENERAL_INFO);
  const [progressNum, setProgressNum] = useState(0);
  const [availability, setAvailability] = useState([]);
  const [missingAvailabilityErrorMessage, setMissingAvailabilityErrorMessage] = useState('');
  const [componentSize, setComponentSize] = useState('default');

  const navigate = useNavigate();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const schema = yup.object({
    firstName: yup.string().required('First name is a required field'),
    lastName: yup.string().required('Last name is a required field'),
    password: yup
      .string()
      .matches(
        passwordRegex,
        'Password must have at least 8 characters, with at least 1 lowercase letter, 1 uppercase letter, and 1 symbol',
      ),
    role: yup.string().required(),
    organization: yup.string().required(),
    birthdate: yup
      .date()
      .required()
      .nullable()
      .typeError('Birthdate is required')
      .max(new Date(), `You couldn't possibly be born after today if you're signing up now!`),
    email: yup.string().email('Must be a valid email'),
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
      password,
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
      criminalHistory: null,
      criminalHistoryDetails: '',
      duiHistory: null,
      duiHistoryDetails: '',
      completedChowmatchTraining: null,
      foodRunsInterest: false,
      distributionInterest: false,
      canDrive: null,
      willingToDrive: null,
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

  const incrementFormStep = async () => {
    const triggers = {
      [PAGE_NAME.GENERAL_INFO]: [
        'firstName',
        'lastName',
        'password',
        'organization',
        'birthdate',
        'email',
        'phone',
        'preferredContactMethod',
        'addressStreet',
        'addressCity',
        'addressState',
        'addressZip',
      ],
      [PAGE_NAME.AVAILABILITY]: [],
      [PAGE_NAME.ROLES_AND_SKILLS]: ['weightLiftingAbility', 'canDrive', 'willingToDrive'],
    };
    const nextStepsVolunteer = {
      [PAGE_NAME.GENERAL_INFO]: PAGE_NAME.AVAILABILITY,
      [PAGE_NAME.AVAILABILITY]: PAGE_NAME.ROLES_AND_SKILLS,
      [PAGE_NAME.ROLES_AND_SKILLS]: PAGE_NAME.ADDITIONAL_INFO,
    };
    const nextStepsAdmin = {
      [PAGE_NAME.GENERAL_INFO]: PAGE_NAME.ROLES_AND_SKILLS,
      [PAGE_NAME.ROLES_AND_SKILLS]: PAGE_NAME.ADDITIONAL_INFO,
    };

    if (formStep === PAGE_NAME.AVAILABILITY && availability.length === 0) {
      setMissingAvailabilityErrorMessage('Please select at least one availability slot.');
      return;
    }
    const result = await methods.trigger(triggers[formStep]);
    if (result) {
      if (role === AUTH_ROLES.VOLUNTEER_ROLE) {
        setFormStep(cur => nextStepsVolunteer[cur]);
      } else {
        setFormStep(cur => nextStepsAdmin[cur]);
      }
      setProgressNum(cur => cur + 1);
    }
  };

  const decrementFormStep = () => {
    const prevStepsVolunteer = {
      [PAGE_NAME.AVAILABILITY]: PAGE_NAME.GENERAL_INFO,
      [PAGE_NAME.ROLES_AND_SKILLS]: PAGE_NAME.AVAILABILITY,
      [PAGE_NAME.ADDITIONAL_INFO]: PAGE_NAME.ROLES_AND_SKILLS,
    };
    const prevStepsAdmin = {
      [PAGE_NAME.ROLES_AND_SKILLS]: PAGE_NAME.GENERAL_INFO,
      [PAGE_NAME.ADDITIONAL_INFO]: PAGE_NAME.ROLES_AND_SKILLS,
    };

    if (role === AUTH_ROLES.VOLUNTEER_ROLE) {
      setFormStep(cur => prevStepsVolunteer[cur]);
    } else {
      setFormStep(cur => prevStepsAdmin[cur]);
    }
    setProgressNum(cur => cur - 1);
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

  const onSubmit = async values => {
    const result = await methods.trigger([
      'duiHistory',
      'criminalHistory',
      'completedChowmatchTraining',
    ]);
    if (!result) {
      return;
    }
    const languages = buildLanguagesArray(values);
    const { uid } = await registerWithEmailAndPassword(values.email, values.password, role);

    const payload = {
      ...values,
      userId: uid,
      role,
      languages,
      availabilities: availability,
    };
    await AFCBackend.post('/users/', payload);

    await AFCBackend.delete(`/adminCode/${code}`);

    navigate('/');
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
          <Steps progressDot current={progressNum}>
            <Step key={PAGE_NAME.GENERAL_INFO} title="General" />
            {role === AUTH_ROLES.VOLUNTEER_ROLE && (
              <Step key={PAGE_NAME.AVAILABILITY} title="Availability" />
            )}
            <Step key={PAGE_NAME.ROLES_AND_SKILLS} title="Roles &amp; Skills" />
            <Step key={PAGE_NAME.ADDITIONAL_INFO} title="Additional Info" />
          </Steps>
          <section hidden={formStep !== PAGE_NAME.GENERAL_INFO}>
            <GeneralInfo
              firstName={firstName}
              lastName={lastName}
              email={email}
              password={password}
            />
            <div className={styles['nav-buttons']}>
              <Button className={styles['previous-button']} onClick={() => setPageState('login')}>
                Back
              </Button>
              <Button className={styles['next-button']} onClick={incrementFormStep}>
                Next
              </Button>
            </div>
          </section>
          <section hidden={formStep !== PAGE_NAME.AVAILABILITY}>
            <WeeklyInfo availability={availability} setAvailability={setAvailability} />
            <Text type="danger">{missingAvailabilityErrorMessage}</Text>
            <div className={styles['nav-buttons']}>
              <Button className={styles['previous-button']} onClick={decrementFormStep}>
                Previous
              </Button>
              <Button className={styles['next-button']} onClick={incrementFormStep}>
                Next
              </Button>
            </div>
          </section>
          <section hidden={formStep !== PAGE_NAME.ROLES_AND_SKILLS}>
            <RolesAndSkills />
            <div className={styles['nav-buttons']}>
              <Button className={styles['previous-button']} onClick={decrementFormStep}>
                Previous
              </Button>
              <Button className={styles['next-button']} onClick={incrementFormStep}>
                Next
              </Button>
            </div>
          </section>
          <section hidden={formStep !== PAGE_NAME.ADDITIONAL_INFO}>
            <DuiAndCrimHis />
            <div className={styles['nav-buttons']}>
              <Button className={styles['previous-button']} onClick={decrementFormStep}>
                Previous
              </Button>
              <Button
                className={styles['next-button']}
                onClick={() => onSubmit(methods.getValues())}
              >
                Finish
              </Button>
            </div>
          </section>
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
  password: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default CreateAccount;
