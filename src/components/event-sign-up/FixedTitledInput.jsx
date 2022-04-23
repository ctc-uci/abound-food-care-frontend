import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const TitledInput = props => {
  const { title, val } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <p style={{ marginBottom: '.5vh' }}>{title}</p>
      <Input disabled style={{ color: 'black' }} value={val} />
    </div>
  );
};

export default TitledInput;

TitledInput.propTypes = {
  title: PropTypes.string,
  val: PropTypes.string,
};

TitledInput.defaultProps = {
  title: '',
  val: '',
};
