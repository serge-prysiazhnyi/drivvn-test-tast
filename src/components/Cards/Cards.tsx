import React from 'react';
import Row from 'react-bootstrap/Row';
import uuid4 from 'uuid4';

import { CardItem } from '../../types';
import { Card } from '../Card';

interface CardsProps {
  cards: CardItem[];
}

export const Cards: React.FC<CardsProps> = ({ cards }) => (
  <>
    {cards.length > 0 && (
      <Row className="d-flex justify-content-center" data-testid="cards-component">
        {cards.map((card) => (
          <Card key={uuid4()} card={card} />
        ))}
      </Row>
    )}
  </>
);
