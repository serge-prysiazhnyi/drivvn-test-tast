import React from 'react';
import Row from 'react-bootstrap/Row';

import styles from './Match.module.css';

interface MatchProps {
  message: string;
}

export const Match: React.FC<MatchProps> = ({ message }) => (
  <>
    {message ? (
      <Row className="d-flex justify-content-center">{message}</Row>
    ) : (
      <div className={styles.MatchPlaceholder}></div>
    )}
  </>
);
