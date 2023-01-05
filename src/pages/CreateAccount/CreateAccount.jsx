import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { Card, Form, Button, Steps, Typography } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GeneralInfo from '../../components/create-account/GeneralInfo/GeneralInfo';
import RolesAndSkills from '../../components/create-account/RolesAndSkills/RolesAndSkills';
import AdditionalInfo from '../../components/create-account/AdditionalInfo/AdditionalInfo';
import AvailabilityChart from '../../components/AvailabilityChart/AvailabilityChart';

import {
  AFCBackend,
  buildLanguagesArray,
  phoneRegExp,
  zipRegExp,
  stateAbbrs,
} from '../../util/utils';
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
  GENERAL_INFO: 'General',
  AVAILABILITY: 'Availability',
  ROLES_AND_SKILLS: 'Roles & Skills',
  ADDITIONAL_INFO: 'Additional Info',
};

const CreateAccount = ({ setPageState, firstName, lastName, email, password, role, code }) => {
  const [formStep, setFormStep] = useState(PAGE_NAME.GENERAL_INFO);
  const [progressNum, setProgressNum] = useState(0);
  const [availability, setAvailability] = useState([]);
  const [missingAvailabilityErrorMessage, setMissingAvailabilityErrorMessage] = useState('');
  const [componentSize, setComponentSize] = useState('default');

  const navigate = useNavigate();

  const onFormLayoutChange = ({ size }) => setComponentSize(size);

  const schema = yup.object({
    firstName: yup.string().required('First name is a required field'),
    lastName: yup.string().required('Last name is a required field'),
    password: yup
      .string()
      .matches(
        passwordRegex,
        'Password must have at least 8 characters, with at least 1 lowercase letter, 1 uppercase letter, and 1 symbol',
      ),
    role: yup.string().required('Role is a required field'),
    organization: yup.string().required('Organization is a required field'),
    birthdate: yup
      .date()
      .required()
      .nullable()
      .typeError('Birthdate is a required field')
      .max(new Date(), `Birthdate must be before today`),
    email: yup.string().email('Invalid email').required('Email is a required field'),
    phone: yup
      .string()
      .required('Phone number is a required field')
      .matches(phoneRegExp, 'Phone number is not valid'),
    preferredContactMethod: yup.string().required('Preferred contact method is a required field'),
    addressStreet: yup.string().required('Street address is a required field'),
    addressZip: yup
      .string()
      .required('Zipcode is a required field')
      .matches(zipRegExp, 'Zipcode is not valid')
      .test('len', 'Zipcode must contain only 5 digits', val => val.length === 5),
    addressCity: yup.string().required('City is a required field'),
    addressState: yup
      .string()
      .required('State is a required field')
      .test('len', 'State must be a valid 2-letter state code', val =>
        stateAbbrs.includes(val.toUpperCase()),
      ),
    weightLiftingAbility: yup.number().integer().required('Liftable weight is a required field'),
    criminalHistory: yup.bool().required('Criminal history is a required field'),
    criminalHistoryDetails: yup.string().nullable(true),
    duiHistory: yup.bool().required('DUI history is a required field'),
    duiHistoryDetails: yup.string().nullable(true),
    completedChowmatchTraining: yup
      .bool()
      .required('You must indicate whether you have completed Chowmatch training'),
    foodRunsInterest: yup
      .bool()
      .required('You must indicate whether you are interested in food running events'),
    distributionInterest: yup
      .bool()
      .required('You must indicate whether you are interested in distribution events'),
    canDrive: yup.bool().required('Driving ability is a required field'),
    willingToDrive: yup.bool().required('You must indicate whether you are willing to drive'),
    vehicleType: yup.string(),
    distance: yup.number().integer().nullable(true),
    firstAidTraining: yup
      .bool()
      .required('You must indicate whether you have completed first aid training'),
    serveSafeKnowledge: yup
      .bool()
      .required('You must indicate whether you have completed ServeSafe training'),
    transportationExperience: yup
      .bool()
      .required('You must indicate whether you have transportation experience'),
    movingWarehouseExperience: yup
      .bool()
      .required('You must indicate whether you have moving or warehouse experience'),
    foodServiceIndustryKnowledge: yup
      .bool()
      .required('You must indicate whether you have food industry knowledge'),
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

  const onSubmit = async values => {
    try {
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
    } catch (e) {
      toast.error(`Error submitting registration: ${e.message}`);
    }
  };

  const NavButtons = () => (
    <div className={styles['nav-buttons']}>
      <Button
        className={styles['previous-button']}
        onClick={
          formStep === PAGE_NAME.GENERAL_INFO ? () => setPageState('login') : decrementFormStep
        }
      >
        {formStep === PAGE_NAME.GENERAL_INFO ? 'Cancel' : 'Back'}
      </Button>
      <Button
        type="primary"
        onClick={
          formStep === PAGE_NAME.ADDITIONAL_INFO
            ? () => onSubmit(methods.getValues())
            : incrementFormStep
        }
      >
        {formStep === PAGE_NAME.ADDITIONAL_INFO ? 'Finish' : 'Next'}
      </Button>
    </div>
  );

  return (
    <Card className={styles.wrapper}>
      <FormProvider {...methods}>
        <Form
          labelWrap
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 8 }}
          size={componentSize}
          onValuesChange={onFormLayoutChange}
          onFinish={methods.handleSubmit(onSubmit)}
        >
          <Steps progressDot current={progressNum} className={styles.steps}>
            {Object.values(PAGE_NAME).map(
              pgName =>
                (pgName !== PAGE_NAME.AVAILABILITY || role === AUTH_ROLES.VOLUNTEER_ROLE) && (
                  <Step key={pgName} title={<span className={styles.stepTitle}>{pgName}</span>} />
                ),
            )}
          </Steps>
          <section hidden={formStep !== PAGE_NAME.GENERAL_INFO}>
            <GeneralInfo
              firstName={firstName}
              lastName={lastName}
              email={email}
              password={password}
            />
            <NavButtons />
          </section>
          <section hidden={formStep !== PAGE_NAME.AVAILABILITY}>
            <AvailabilityChart
              availability={availability}
              setAvailability={setAvailability}
              title="Weekly Availability"
              days={7}
            />
            <Text type="danger">{missingAvailabilityErrorMessage}</Text>
            <NavButtons />
          </section>
          <section hidden={formStep !== PAGE_NAME.ROLES_AND_SKILLS}>
            <RolesAndSkills />
            <NavButtons />
          </section>
          <section hidden={formStep !== PAGE_NAME.ADDITIONAL_INFO}>
            <AdditionalInfo />
            <NavButtons />
          </section>
        </Form>
      </FormProvider>
    </Card>
  );
};

CreateAccount.propTypes = {
  setPageState: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  code: PropTypes.string,
};

CreateAccount.defaultProps = {
  code: null,
};

export default CreateAccount;
