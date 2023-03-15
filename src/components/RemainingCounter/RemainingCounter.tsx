import React from 'react';
import Row from 'react-bootstrap/Row';

interface RemainingCounterProps {
  remaining: number;
}

export const RemainingCounter: React.FC<RemainingCounterProps> = ({ remaining }) => (
  <Row className="mt-2 justify-content-center" data-testid="remaining-counter">
    Cards left: {remaining}
  </Row>
);
