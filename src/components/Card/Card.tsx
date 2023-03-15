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
        <Col xs={4} className={styles.CardWrapper}>
          <Image src={card.image} className={styles.CardImage} />
        </Col>
      ) : (
        <div className={styles.CardPlaceholder}></div>
      )}
    </>
  );
};
