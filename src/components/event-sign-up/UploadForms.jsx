import React from 'react';
import styled from 'styled-components';
import { Button, Upload, message } from 'antd';
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

// Update props when connecting to backend
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const UploadForms = () => {
  return (
    <Container>
      <Title>Waiver Name</Title>
      <Button icon={<DownloadOutlined />}>Click to Download</Button>
      <Dragger {...props} style={{ width: '400px' }}>
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

export default UploadForms;
