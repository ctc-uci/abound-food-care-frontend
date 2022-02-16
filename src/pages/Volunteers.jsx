import React, { useState } from 'react';
import axios from 'axios';
import GeneralInfo from '../components/GeneralInfo';
import WeeklyInfo from '../components/WeeklyInfo';
import RolesAndSkills from '../components/RolesAndSkills';
import DuiAndCrimHis from '../components/DuiAndCrimHis';

import 'antd/dist/antd.variable.min.css';

function Volunteers() {
  const [currPage, setCurrPage] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [drive, setDrive] = useState('');
  const [drivingMiles, setDrivingMiles] = useState('');
  const [interestedRoles, setInterestedRoles] = useState([]);
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [skills, setSkills] = useState('');
  const [vehicleType, setVehicleType] = useState([]);
  const [weightliftingAbility, setWeightliftingAbility] = useState('');

  const [duiHistory, setDuiHistory] = useState('');
  const [chowmatchTraining, setChowmatchTraining] = useState('');
  const [crimHisElaboration, setCrimHisElaboration] = useState('');
  const [crimHistory, setCrimHistory] = useState('');
  const [duiElaboration, setDuiElaboration] = useState('');

  const setGeneralInfo = values => {
    setFirstName(values.firstName);
    setLastName(values.lastName);
    setEmail(values.email);
    setPhoneNumber(values.phoneNumber);
    setAddress(values.address);
  };
  const setRolesAndSkills = values => {
    setDrive(values.drive);
    setDrivingMiles(values.drivingMiles);
    setInterestedRoles(values.interestedRoles);
    setLanguagesSpoken(values.languagesSpoken);
    setSkills(values.skills);
    setVehicleType(values.vehicleType);
    setWeightliftingAbility(values.weightliftingAbility);
  };
  const setDuiAndCrimHis = values => {
    setDuiHistory(values.DuiHistory);
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
  const submitForm = () => {
    const otherInfo = {
      drive,
      drivingMiles,
      vehicleType,
      languagesSpoken,
    };
    const data = {
      uType: 'volunteer',
      name: `${firstName} ${lastName}`,
      birthdate: 'October 19, 2001',
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
      foodRunsInterest: '',
      specializations: skills,
      volunteeringRolesInterest: interestedRoles,
      additionalInformation: 'N/A',
    };
    console.log(otherInfo);

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
      {currPage === 4 && (
        <DuiAndCrimHis
          prevPage={prevPage}
          submitForm={submitForm}
          setDuiAndCrimHis={setDuiAndCrimHis}
        />
      )}
    </div>
  );
}

export default Volunteers;
