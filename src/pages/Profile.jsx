import React from 'react';
import 'antd/dist/antd.css';
import { Button, Tabs } from 'antd';
import ProfileGeneralInfo from '../components/profile/ProfileGeneralInfo';
import ProfileDUICrimHistory from '../components/profile/ProfileDUICrimHistory';
import ProfileRolesSkills from '../components/profile/ProfileRolesSkills';
import TrainingAndForms from '../components/profile/profile-training-forms/TrainingAndForms';
import WeeklyInfo from '../components/create-account/WeeklyInfo';
import '../components/profile/profile.css';

const { TabPane } = Tabs;
function Profile() {
  const [editMode, setEditMode] = React.useState(false);
  const renderEditButtons = () => {
    if (editMode) {
      return (
        <div>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
          <Button type="primary">Save</Button>
        </div>
      );
    }
    return (
      <Button type="primary" onClick={() => setEditMode(true)}>
        Edit
      </Button>
    );
  };

  return (
    <div>
      <p>This is the volunteer profile page - USER ID OF VOLUNTEER HARDCODED TEMPORARILY</p>
      <h1>[VOLUNTEER NAME HERE]s Profile</h1>
      {renderEditButtons()}
      <Tabs defaultActiveKey="1">
        <TabPane tab="General Information" key="1">
          <ProfileGeneralInfo userId={2} />
        </TabPane>
        <TabPane tab="Availability" key="2">
          <WeeklyInfo />
        </TabPane>
        <TabPane tab="Roles & Skills" key="3">
          <ProfileRolesSkills userId={6} />
        </TabPane>
        <TabPane tab="DUI/Criminal History" key="4">
          <ProfileDUICrimHistory userId={2} />
        </TabPane>
        <TabPane tab="Training & Forms" key="5">
          <TrainingAndForms />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
