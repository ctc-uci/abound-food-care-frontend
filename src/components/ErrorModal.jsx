import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const ErrorModal = () => {
  return (
    <div
      style={{
        borderRadius: '.5em',
        position: 'fixed',
        bottom: '37.5vh',
        right: '30.5vw',
        backgroundColor: '#FFFFFF',
        width: '39vw',
        height: '25vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        boxShadow:
          '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', height: '39%', width: '89%' }}>
        <CloseCircleOutlined style={{ color: '#FF4D4F', fontSize: 24, marginRight: '4%' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <p style={{ fontSize: '1em', height: '12.5%', fontWeight: 800 }}>Error</p>
          <p style={{ fontSize: '1em', height: '38%', lineHeight: '1.3em' }}>
            Please fill in all the input fields to submit your hours.
          </p>
        </div>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '85%' }}
      >
        <Button type="primary">Done</Button>
      </div>
    </div>
  );
};

export default ErrorModal;
