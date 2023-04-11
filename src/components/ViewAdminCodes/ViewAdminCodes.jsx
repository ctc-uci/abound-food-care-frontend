import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Typography } from 'antd';

import { AFCBackend } from '../../util/utils';

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
        setError('You can only have up to 5 total active codes at a time.');
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
      <>
        <p className={styles.noCodesWarning}>
          To invite a user as an admin, select{' '}
          <span className={styles.noCodesBold}>Generate Admin Code</span> and give them the
          resulting code to use.
        </p>
        <p className={styles.noCodesWarning}>
          There will be an <span className={styles.noCodesBold}>Admin Code</span> field during
          registration where they can enter this code to become an administrator.
        </p>
      </>
      <div className={styles.codes}>
        {codes.length > 0 &&
          codes
            .sort((a, b) => a.code.localeCompare(b.code))
            .map(data => (
              <div key={data.code} className={styles['admin-code-container']}>
                <p className={styles.code}>{data.code}</p>
                <Button
                  type="danger"
                  className={styles['delete-button']}
                  onClick={() => onDelete(data.code)}
                >
                  Delete
                </Button>
              </div>
            ))}
      </div>
      {error && <Text type="danger">{error}</Text>}
    </Modal>
  );
};

ViewAdminCodes.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ViewAdminCodes;
