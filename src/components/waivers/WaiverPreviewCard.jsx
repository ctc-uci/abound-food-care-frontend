import React from 'react';
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

const WaiverPreviewCard = ({ eventName, waiverName, link, imgSrc, description }) => {
  const { Meta } = Card;
  return (
    <div className="app">
      <Card
        extra={
          <a href={link} download>
            Download
          </a>
        }
        title={
          <Title level={4} ellipsis>
            {eventName}
          </Title>
        }
        style={{ width: '400px' }}
        cover={<img alt="" src={imgSrc} />}
      >
        <Meta title={waiverName} description={description} />
      </Card>
    </div>
  );
};

WaiverPreviewCard.propTypes = {
  eventName: PropTypes.string.isRequired,
  waiverName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default WaiverPreviewCard;
