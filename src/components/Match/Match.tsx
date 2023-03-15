import React from 'react';
import Row from 'react-bootstrap/Row';

import styles from './Match.module.css';

interface MatchProps {
  hasSuitMatch: boolean;
  hasValueMatch: boolean;
}

export const Match: React.FC<MatchProps> = ({ hasSuitMatch, hasValueMatch }) => {
  if (!hasSuitMatch && !hasValueMatch) {
    return <div className={styles.MatchPlaceholder}></div>;
  }

  const message = hasSuitMatch ? 'SNAP SUIT!' : 'SNAP VALUE!';

  return <Row className="d-flex justify-content-center">{message}</Row>;
};
