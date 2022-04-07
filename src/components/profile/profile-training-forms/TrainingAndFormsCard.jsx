import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const TrainingAndFormsCard = ({
  waiverName,
  waiverLink,
  waiverPictureLink,
  waiverLinkName,
  uploadDate,
}) => {
  const { Meta } = Card;
  return (
    <div className="app">
      <Card
        extra={
          <a href={waiverLink} download>
            Download
          </a>
        }
        title={waiverName}
        style={{ width: 300 }}
        cover={<img alt="example" src={waiverPictureLink} />}
      >
        <Meta title={waiverLinkName} description={uploadDate} />
      </Card>
    </div>
  );
};

TrainingAndFormsCard.propTypes = {
  waiverName: PropTypes.string.isRequired,
  waiverLink: PropTypes.string.isRequired,
  waiverPictureLink: PropTypes.string.isRequired,
  waiverLinkName: PropTypes.string.isRequired,
  uploadDate: PropTypes.string.isRequired,
};

export default TrainingAndFormsCard;
