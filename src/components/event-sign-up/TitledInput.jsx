import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const TitledInput = ({ title, val, disabled, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <p style={{ marginBottom: '.5vh' }}>{title}</p>
      <Input disabled={disabled} style={{ color: 'black' }} value={val} onChange={onChange} />
    </div>
  );
};

TitledInput.propTypes = {
  title: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

TitledInput.defaultProps = {
  onChange: x => x,
};

export default TitledInput;
