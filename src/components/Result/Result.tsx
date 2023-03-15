import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface ResultProps {
  valueMatches: number;
  suitMatches: number;
}

export const Result: React.FC<ResultProps> = ({ valueMatches, suitMatches }) => (
  <Row className="d-flex justify-content-center">
    <Col xs={6} md={4}>
      <p className="my-1 text-center">Value matches: {valueMatches}</p>
      <p className="my-1 text-center">Suit matches: {suitMatches}</p>
    </Col>
  </Row>
);
