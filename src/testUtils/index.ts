import { FetchCardsResponse, FetchDeckResponse } from '../types';
import { mockedCardsCollection } from './mockDeck';
import { CARDS_IN_DECK_AMOUNT } from '../constants';

export const mockDeckId = '12345';

export const mockDeckResponse: FetchDeckResponse = {
  deck_id: mockDeckId,
  remaining: CARDS_IN_DECK_AMOUNT,
  shuffled: true,
  success: true,
};

export const mockCardsResponse: FetchCardsResponse = {
  cards: mockedCardsCollection,
  deck_id: mockDeckId,
  remaining: CARDS_IN_DECK_AMOUNT - 1,
  success: true,
};

export const VALUE_MATCHES_RESULT = 'Value matches: 1';
export const SUIT_MATCHES_RESULT = 'Suit matches: 12';
