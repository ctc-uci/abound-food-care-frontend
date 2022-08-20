import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const TitledInput = ({ title, defaultValue, disabled, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <p style={{ marginBottom: '.5vh' }}>{title}</p>
      <Input
        disabled={disabled}
        style={{ color: 'black' }}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

TitledInput.propTypes = {
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

TitledInput.defaultProps = {
  disabled: false,
  onChange: x => x,
};

export default TitledInput;
