import React from 'react';
import { Row, Col } from 'antd';
import TrainingAndFormsCard from './TrainingAndFormsCard';

const TrainingAndForms = () => {
  return (
    <div>
      <Row gutter={[16, 18]}>
        <Col className="gutter-row" span={8}>
          <TrainingAndFormsCard
            waiverName="Waiver Name"
            waiverLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverPictureLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverLinkName="waiver.pdf"
            uploadDate="Uploaded 1/9/2022"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <TrainingAndFormsCard
            waiverName="Waiver Name"
            waiverLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverPictureLink="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            waiverLinkName="waiver.pdf"
            uploadDate="Uploaded 1/9/2022"
          />
        </Col>
        <Col className="gutter-row" span={8}>
          <TrainingAndFormsCard
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

export default TrainingAndForms;
