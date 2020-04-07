import React from "react";
import {
  Row,
  Col,
  CardBody
} from "@/components";
import styles from './Loading.css';

const Loading = () => {
  return (
    <React.Fragment>
      <CardBody>
        <Row>
          <Col>
            <div className={styles.loader}></div>
          </Col>
        </Row>
      </CardBody>
    </React.Fragment>
  );
};

export default Loading;
