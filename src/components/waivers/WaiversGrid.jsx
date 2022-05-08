import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import WaiverPreviewCard from './WaiverPreviewCard';

const WaiversGrid = ({ waivers }) => (
  <div>
    <Row gutter={[16, 18]}>
      {waivers.map(({ name, link, uploadDate, waiverId }) => (
        <Col className="gutter-row" span={8} key={waiverId}>
          <WaiverPreviewCard name={name} link={link} uploadDate={uploadDate} />
        </Col>
      ))}
    </Row>
  </div>
);

WaiversGrid.propTypes = {
  waivers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      uploadDate: PropTypes.string.isRequired,
      waiverId: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default WaiversGrid;
