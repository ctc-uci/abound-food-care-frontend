import React from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { Button, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useFormContext, Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import { AFCBackend } from '../../util/utils';

const Container = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5vh;
`;

const UploadForms = () => {
  const { control } = useFormContext();

  const { eventId } = useParams();

  const downloadWaivers = async () => {
    const { data } = await AFCBackend(`/waivers/event/download/${eventId}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      responseType: 'blob',
    });
    const { data: eventRes } = await AFCBackend.get(`/events/${eventId}`);
    const name = eventRes[0].name.replace(/\s+/g, '-');
    await saveAs(data, `${name}-waivers.zip`);
  };

  return (
    <Container>
      <Button onClick={downloadWaivers} icon={<DownloadOutlined />}>
        Click to Download Event Waivers
      </Button>
      <Controller
        control={control}
        name="waivers"
        render={({ field: { onChange, value, ref } }) => (
          <Upload
            multiple
            ref={ref}
            onChange={e => onChange(e.fileList)}
            fileList={value}
            customRequest={e => e.onSuccess('Ok')}
          >
            <Button>Click to Upload Signed Waivers</Button>
          </Upload>
        )}
      />
    </Container>
  );
};

export default UploadForms;
