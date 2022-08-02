import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button } from 'antd';

import { AFCBackend } from '../../../util/utils';

import styles from './ViewAdminCodes.module.css';

const ViewAdminCodes = ({ isOpen, setIsOpen }) => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshCodes = async () => {
    const { data } = await AFCBackend.get('/adminCode/');
    setCodes(data);
  };

  useEffect(async () => {
    refreshCodes();
  }, [isOpen]);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(false);
      setIsOpen(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const onDelete = async code => {
    await AFCBackend.delete(`/adminCode/${code}`);
    refreshCodes();
  };

  const generateAdminCode = async () => {
    await AFCBackend.post('/adminCode/');
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
    </Modal>
  );
};

ViewAdminCodes.propTypes = {
  isOpen: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ViewAdminCodes;
