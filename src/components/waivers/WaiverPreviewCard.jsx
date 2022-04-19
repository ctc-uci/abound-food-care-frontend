import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const WaiverPreviewCard = ({ name, link, uploadDate }) => {
  const { Meta } = Card;
  return (
    <div className="app">
      <Card
        extra={
          <a href={link} download>
            Download
          </a>
        }
        title={name}
        style={{ width: 300 }}
        cover={<img alt="" src={link} />}
      >
        <Meta title={name} description={uploadDate} />
      </Card>
    </div>
  );
};

WaiverPreviewCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  uploadDate: PropTypes.string.isRequired,
};

export default WaiverPreviewCard;
