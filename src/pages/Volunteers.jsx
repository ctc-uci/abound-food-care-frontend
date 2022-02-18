import React, { useState } from 'react';
import axios from 'axios';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import RolesAndSkills from '../components/RolesAndSkills';
import DuiAndCrimHis from '../components/DuiAndCrimHis';

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
  const [drivingMiles, setDrivingMiles] = useState('');
  const [interestedRoles, setInterestedRoles] = useState([]);
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [skills, setSkills] = useState('');
  const [vehicleType, setVehicleType] = useState([]);
  const [weightliftingAbility, setWeightliftingAbility] = useState('');
  const [foodRunsInterest, setFoodRunsInterest] = useState(false);

  const [duiHistory, setDuiHistory] = useState(false);
  const [chowmatchTraining, setChowmatchTraining] = useState(false);
  const [crimHisElaboration, setCrimHisElaboration] = useState('');
  const [crimHistory, setCrimHistory] = useState(false);
  const [duiElaboration, setDuiElaboration] = useState('');
  const [data, setData] = useState({});

  const submitForm = async () => {
    axios
      .post('http://localhost:3001/users/create', data)
      .then(response => {
        console.log(`Status: ${response.status}`);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Something went wrong!', error);
      });
  };

  const setGeneralInfo = async values => {
    await setBirthdate(values.birthdate);
    await setFirstName(values.firstName);
    await setLastName(values.lastName);
    await setEmail(values.email);
    await setPhoneNumber(values.phoneNumber);
    await setAddress(values.address);
  };
  const setRolesAndSkills = async values => {
    await setDrive(values.drive);
    await setDrivingMiles(values.drivingMiles);
    await setInterestedRoles(values.interestedRoles);
    await setLanguagesSpoken(values.languagesSpoken);
    await setSkills(values.skills);
    await setVehicleType(values.vehicleType);
    await setWeightliftingAbility(values.weightliftingAbility);
    await setFoodRunsInterest(values.foodRunsInterest);
  };
  const setDuiAndCrimHis = async values => {
    await setDuiHistory(values.duiHistory);
    await setChowmatchTraining(values.chowmatchTraining);
    await setCrimHisElaboration(values.crimHisElaboration);
    await setCrimHistory(values.crimHistory);
    await setDuiElaboration(values.duiElaboration);
    let otherInfo = {};

    otherInfo = {
      drive,
      drivingMiles,
      vehicleType,
      languagesSpoken,
    };
    console.log(otherInfo);
    await setData({
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
    submitForm(data);
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
    </div>
  );
}

export default Volunteers;
