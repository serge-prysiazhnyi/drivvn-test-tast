import React from 'react';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { Variant } from 'react-bootstrap/types';

interface ProbabilityInfoProps {
  percentage: number;
  label: string;
  dataTestId: string;
}

const getBadgeProps = (
  percentage: number,
): { badgeColor: Variant; badgeLabel: string } => {
  // more then two thirds
  if (percentage > Math.round(100 / 1.5)) {
    return {
      badgeColor: 'warning',
      badgeLabel: 'higher',
    };
  }

  // more then third less then two thirds
  if (percentage > Math.round(100 / 3)) {
    return {
      badgeColor: 'success',
      badgeLabel: 'medium',
    };
  }

  // more zero less third
  if (percentage > 0) {
    return {
      badgeColor: 'primary',
      badgeLabel: 'low',
    };
  }

  // zero
  return {
    badgeColor: 'secondary',
    badgeLabel: 'no chances',
  };
};

export const ProbabilityInfo: React.FC<ProbabilityInfoProps> = ({
  percentage = null,
  label,
  dataTestId,
}) => {
  const { badgeColor, badgeLabel } = getBadgeProps(percentage);

  if (typeof percentage !== 'number') {
    return null;
  }

  return (
    <Row className="d-flex flex-column justify-content-center align-items-center">
      <p className="mb-2 w-auto">{label}</p>
      <Badge className="w-auto" bg={badgeColor} data-testid={dataTestId}>
        {badgeLabel}
      </Badge>
    </Row>
  );
};
