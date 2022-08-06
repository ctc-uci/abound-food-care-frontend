import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Typography } from 'antd';

import { AFCBackend } from '../../../util/utils';

import styles from './ViewAdminCodes.module.css';

const { Text } = Typography;

const ViewAdminCodes = ({ isOpen, setIsOpen }) => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const refreshCodes = async () => {
    const { data } = await AFCBackend.get('/adminCode/');
    setCodes(data);
  };

  useEffect(async () => {
    refreshCodes();
    setError(undefined);
  }, [isOpen]);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(false);
      setIsOpen(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onDelete = async code => {
    await AFCBackend.delete(`/adminCode/${code}`);
    refreshCodes();
    setError(undefined);
  };

  const generateAdminCode = async () => {
    try {
      await AFCBackend.post('/adminCode/');
    } catch (err) {
      setError('Reached maximum number of codes');
    }
    await refreshCodes();
  };

  return (
    <Modal
      title="Admin Codes"
      visible={isOpen}
      confirmLoading={loading}
      onOk={onSubmit}
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
      {codes &&
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
        })}
      {error && <Text type="danger">{error}</Text>}
    </Modal>
  );
};

ViewAdminCodes.propTypes = {
  isOpen: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ViewAdminCodes;
