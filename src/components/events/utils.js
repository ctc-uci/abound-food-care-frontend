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

export default uploadBoxPhoto;
