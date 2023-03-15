import { CardItem, FetchCardsResponse, FetchDeckResponse } from '../types';
import { cards } from './mockDeck';

export const mockDeckId = '12345';

export const mockDeckResponse: FetchDeckResponse = {
  deck_id: mockDeckId,
  remaining: 52,
  shuffled: true,
  success: true,
};

export const mockSigleCardResponse: FetchCardsResponse = {
  cards,
  deck_id: mockDeckId,
  remaining: 51,
  success: true,
};

export const VALUE_MATCHES_RESULT = 'Value matches: 1';
export const SUIT_MATCHES_RESULT = 'Suit matches: 12';

export function* generateCards(cards: CardItem[]): Generator<CardItem> {
  for (const card of cards) {
    yield card;
  }
}

export const useCounter = () => {
  let counter = 0;

  return () => counter++;
};
