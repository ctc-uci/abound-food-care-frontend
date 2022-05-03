import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Upload } from 'antd';
import { InboxOutlined, DownloadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Container = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5vh;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
`;

const UploadForms = ({ eventData, setWaiverList }) => {
  return (
    <Container>
      {eventData.waivers.map(waiverInfo => (
        <>
          <Title>{waiverInfo.name}</Title>
          <a href={waiverInfo.link} download>
            <Button icon={<DownloadOutlined />}>Click to Download</Button>
          </a>
        </>
      ))}
      <Dragger
        multiple
        onChange={e => setWaiverList(e.fileList)}
        customRequest={e => e.onSuccess('Ok')}
        style={{ width: '400px' }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: 'black' }} />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </Dragger>
    </Container>
  );
};

UploadForms.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  eventData: PropTypes.object.isRequired,
  setWaiverList: PropTypes.func.isRequired,
};

export default UploadForms;
