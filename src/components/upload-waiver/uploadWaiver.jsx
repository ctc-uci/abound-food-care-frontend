import React, { useState } from 'react';
import axios from 'axios';

const uploadBoxPhoto = async file => {
  // get S3 upload url from server
  const { data: uploadUrl } = await axios.get(`http://localhost:3001/s3Upload`);
  // upload image directly to S3 bucket
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // return box image url
  const imageUrl = uploadUrl.split('?')[0];
  return imageUrl;
};

const UploadWaiver = () => {
  const [files, setFiles] = useState([]);

  const onSubmit = async () => {
    const waiverURL = files.length > 0 ? await uploadBoxPhoto(files[0]) : '';
    console.log(waiverURL);
    // send form data to server
  };

  return (
    <div>
      <input onChange={e => setFiles(e.target.files)} type="file" />
      <button type="button" onClick={onSubmit}>
        Upload Waiver
      </button>
    </div>
  );
};

export default UploadWaiver;
