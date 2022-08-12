import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Typography } from 'antd';

import { AFCBackend } from '../../../util/utils';

import styles from './ViewAdminCodes.module.css';

const { Text } = Typography;

const ViewAdminCodes = ({ isOpen, setIsOpen }) => {
  const [codes, setCodes] = useState([]);
  const [error, setError] = useState(false);

  const refreshCodes = async () => {
    const { data } = await AFCBackend.get('/adminCode/');
    setCodes(data);
  };

  useEffect(async () => {
    refreshCodes();
    setError(undefined);
  }, [isOpen]);

  const onDelete = async code => {
    await AFCBackend.delete(`/adminCode/${code}`);
    refreshCodes();
    setError(undefined);
  };

  const generateAdminCode = async () => {
    try {
      await AFCBackend.post('/adminCode/');
    } catch (err) {
      if (codes.length >= 5) {
        setError('Reached maximum number of codes');
      } else {
        setError(err.message);
      }
    }
    await refreshCodes();
  };

  return (
    <Modal
      title="Admin Codes"
      visible={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={
        <Button
          type="primary"
          className={styles['generate-admin-code-button']}
          onClick={generateAdminCode}
        >
          Generate Admin Code
        </Button>
      }
    >
      {codes.length > 0 ? (
        codes.map(data => {
          return (
            <div key={data.code} className={styles['admin-code-container']}>
              <p>{data.code}</p>
              <Button
                type="danger"
                className={styles['delete-button']}
                onClick={() => onDelete(data.code)}
              >
                Delete
              </Button>
            </div>
          );
        })
      ) : (
        <Text type="danger">
          You have not generated any codes yet for admin signups, select <b>Generate Admin Code</b>{' '}
          to do so
        </Text>
      )}
      {error && <Text type="danger">{error}</Text>}
    </Modal>
  );
};

ViewAdminCodes.propTypes = {
  isOpen: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ViewAdminCodes;
