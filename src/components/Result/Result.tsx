import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface ResultProps {
  valueMatches: number;
  suitMatches: number;
}

export const Result: React.FC<ResultProps> = ({ valueMatches, suitMatches }) => (
  <Row className="d-flex justify-content-center" data-testid="result-component">
    <Col xs={6} md={4}>
      <p className="my-1 text-center" data-testid="value-matches-count">
        Value matches: {valueMatches}
      </p>
      <p className="my-1 text-center" data-testid="suit-matches-count">
        Suit matches: {suitMatches}
      </p>
    </Col>
  </Row>
);
