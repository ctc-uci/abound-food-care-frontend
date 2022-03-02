import React from 'react';
import { Card, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const CreateTrainingAndFormsCard = ({
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

const TrainingAndForms = () => {
  return (
    <div>
      <h1>Training & Forms</h1>
      <Row gutter={[16, 18]}>
        <Col className="gutter-row" span={8}>
          <CreateTrainingAndFormsCard
            waiverName="Waiver Name"
            waiverLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverPictureLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverLinkName="waiver.pdf"
            uploadDate="Uploaded 1/9/2022"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <CreateTrainingAndFormsCard
            waiverName="Waiver Name"
            waiverLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverPictureLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverLinkName="waiver.pdf"
            uploadDate="Uploaded 1/9/2022"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <CreateTrainingAndFormsCard
            waiverName="Waiver Name"
            waiverLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverPictureLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverLinkName="waiver.pdf"
            uploadDate="Uploaded 1/9/2022"
          />
        </Col>
      </Row>
    </div>
  );
};

CreateTrainingAndFormsCard.propTypes = {
  waiverName: PropTypes.string.isRequired,
  waiverLink: PropTypes.string.isRequired,
  waiverPictureLink: PropTypes.string.isRequired,
  waiverLinkName: PropTypes.string.isRequired,
  uploadDate: PropTypes.string.isRequired,
};

export default TrainingAndForms;
