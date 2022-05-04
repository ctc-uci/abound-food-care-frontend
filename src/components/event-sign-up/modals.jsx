import React from 'react';
import { Modal } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

const successModal = eventData => {
  const startDate = new Date(eventData.startDatetime);
  confirm({
    title: `Success! You have signed up for ${eventData.name}`,
    icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    content: `See you on ${startDate.toLocaleDateString()}.`,
    okText: 'Done',
    cancelButtonProps: { style: { display: 'none' } },
    onOk() {
      console.log('TODO: Redirect to Volunteer Dashboard...');
    },
  });
};

const cancelModal = () => {
  confirm({
    title: `Cancel?`,
    icon: <ExclamationCircleOutlined />,
    content: `You will not be signed up for this event.`,
    okText: 'Done',
    cancelButtonProps: { style: { display: 'none' } },
    onOk() {},
  });
};

const errorModal = () => {
  confirm({
    title: `Error`,
    icon: <CloseCircleOutlined style={{ color: '#FF4D4F' }} />,
    content: `You have not uploaded the required forms to sign up for this event.`,
    okText: 'Done',
    cancelButtonProps: { style: { display: 'none' } },
    onOk() {},
  });
};

const eventConfirmationPopUp = (signUp, eventData) => {
  confirm({
    title: `Sign up for ${eventData.name}?`,
    icon: null,
    onOk() {
      return new Promise((resolve, reject) => {
        signUp(resolve, reject);
      })
        .then(() => successModal(eventData))
        .catch(message => {
          if (message === 'WaiverError') {
            errorModal();
          }
        });
    },
    onCancel() {
      cancelModal();
    },
  });
};

export default eventConfirmationPopUp;
