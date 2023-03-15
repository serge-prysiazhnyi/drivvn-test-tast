import React from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { CardItem } from '../../types';
import styles from './Card.module.css';

interface CardProps {
  card: CardItem;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <>
      {card ? (
        <Col
          xs={4}
          className={`${styles.CardWrapper} ${styles.spinner}`}
          data-testid="card-component"
        >
          <Image src={card.image} className={styles.CardImage} data-testid="card-image" />
        </Col>
      ) : (
        <div className={styles.CardPlaceholder} data-testid="card-placeholder"></div>
      )}
    </>
  );
};
