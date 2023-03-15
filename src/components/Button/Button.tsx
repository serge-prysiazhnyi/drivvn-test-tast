import React from 'react';
import BootstarButton from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, disabled }) => (
  <Row className="mt-3 d-flex justify-content-center">
    <Col xs={8} md={4} className="d-flex justify-content-center">
      <BootstarButton variant="primary" onClick={onClick} disabled={disabled}>
        Draw card
      </BootstarButton>
    </Col>
  </Row>
);
