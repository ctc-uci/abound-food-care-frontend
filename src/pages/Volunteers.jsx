import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import RolesAndSkills from '../components/RolesAndSkills';
import DuiAndCrimHis from '../components/DuiAndCrimHis';
import VolunteeringHistory from '../components/VolunteeringHistory';
import 'antd/dist/antd.variable.min.css';

function Volunteers() {
  const [currPage, setCurrPage] = useState(1);
  const [birthdate, setBirthdate] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [drive, setDrive] = useState(false);
  // const [drivingMiles, setDrivingMiles] = useState('');
  const [interestedRoles, setInterestedRoles] = useState([]);
  // const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [skills, setSkills] = useState('');
  // const [vehicleType, setVehicleType] = useState([]);
  const [weightliftingAbility, setWeightliftingAbility] = useState('');
  const [foodRunsInterest, setFoodRunsInterest] = useState(false);

  const [duiHistory, setDuiHistory] = useState(false);
  const [chowmatchTraining, setChowmatchTraining] = useState(false);
  const [crimHisElaboration, setCrimHisElaboration] = useState('placeholder');
  const [crimHistory, setCrimHistory] = useState(false);
  const [duiElaboration, setDuiElaboration] = useState('');
  const [data, setData] = useState({});

  const submitForm = async () => {
    axios.post('http://localhost:3001/users/create', data);
    setCurrPage(currPage + 1);
  };

  useEffect(() => {
    if (crimHisElaboration !== 'placeholder') {
      setData({
        uType: 'volunteer',
        name: `${firstName} ${lastName}`,
        birthdate,
        email,
        phone: phoneNumber,
        preferredContactMethod: 'email',
        city: 'Irvine',
        physicalAddress: address,
        weightLiftingAbility: weightliftingAbility,
        criminalHistory: crimHistory,
        duiHistory,
        duiHistoryDetails: duiElaboration,
        criminalHistoryDetails: crimHisElaboration,
        completedChowmatchTraining: chowmatchTraining,
        drive,
        foodRunsInterest,
        specializations: skills,
        volunteeringRolesInterest: interestedRoles,
        additionalInformation: 'N/A',
      });
    }
  }, [duiElaboration]);

  useEffect(() => {
    if (crimHisElaboration !== 'placeholder') {
      submitForm(data);
    }
  }, [data]);

  const setGeneralInfo = async values => {
    setBirthdate(values.birthdate);
    setFirstName(values.firstName);
    setLastName(values.lastName);
    setEmail(values.email);
    setPhoneNumber(values.phoneNumber);
    setAddress(values.address);
  };
  const setRolesAndSkills = values => {
    setDrive(values.drive);
    // setDrivingMiles(values.drivingMiles);
    setInterestedRoles(values.interestedRoles);
    // setLanguagesSpoken(values.languagesSpoken);
    setSkills(values.skills);
    // setVehicleType(values.vehicleType);
    setWeightliftingAbility(values.weightliftingAbility);
    setFoodRunsInterest(values.foodRunsInterest);
  };
  const setDuiAndCrimHis = values => {
    setDuiHistory(values.duiHistory);
    setChowmatchTraining(values.chowmatchTraining);
    setCrimHisElaboration(values.crimHisElaboration);
    setCrimHistory(values.crimHistory);
    setDuiElaboration(values.duiElaboration);
  };

  const nextPage = () => {
    setCurrPage(currPage + 1);
  };
  const prevPage = () => {
    setCurrPage(currPage - 1);
  };

  return (
    <div>
      <p>This is the volunteers page</p>
      {currPage === 1 && <GeneralInfo nextPage={nextPage} setGeneralInfo={setGeneralInfo} />}
      {currPage === 2 && <WeeklyInfo nextPage={nextPage} prevPage={prevPage} />}
      {currPage === 3 && (
        <RolesAndSkills
          nextPage={nextPage}
          prevPage={prevPage}
          setRolesAndSkills={setRolesAndSkills}
        />
      )}
      {currPage === 4 && <DuiAndCrimHis prevPage={prevPage} setDuiAndCrimHis={setDuiAndCrimHis} />}
      {currPage === 5 && <VolunteeringHistory />}
    </div>
  );
}

export default Volunteers;
