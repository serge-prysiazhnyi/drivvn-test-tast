import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterEach, expect } from 'vitest';

import App from './App';
import { BASE_URL } from './constants';
import {
  generateCards,
  mockDeckId,
  mockDeckResponse,
  mockSigleCardResponse,
  SUIT_MATCHES_RESULT,
  useCounter,
  VALUE_MATCHES_RESULT,
} from './testUtils';
import { cards } from './testUtils/mockDeck';
import { CardItem, FetchCardsResponse } from './types';

let counter: () => number;
let cardsGenerator: Generator<CardItem, any, unknown>;

const server = setupServer(
  rest.get(`${BASE_URL}/new/shuffle/?deck_count=1`, (req, res, ctx) => {
    return res(ctx.json(mockDeckResponse));
  }),

  rest.get(`${BASE_URL}/${mockDeckId}/draw/?count=1`, (req, res, ctx) => {
    const card = cardsGenerator.next().value;
    const newRemaining = cards.length - 1 - counter();

    const response: FetchCardsResponse = {
      ...mockSigleCardResponse,
      cards: [card],
      remaining: newRemaining,
    };

    return res(ctx.json(response));
  }),
);

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Enable request interception.
beforeAll(() => server.listen());

// Refresh counter and cards generator
beforeEach(() => {
  cardsGenerator = generateCards(cards);
  counter = useCounter();
});

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => {
  cleanup();
  return server.resetHandlers();
});

// clean up afterwards.
afterAll(() => server.close());

describe('App', () => {
  it('App: renders components with initial state', () => {
    render(<App />);

    // renders match placeholder
    expect(screen.getByTestId('match-placeholder')).toBeInTheDocument();

    // renders two card placeholders
    expect(screen.getAllByTestId('card-placeholder').length).toBe(2);

    // renders button
    expect(screen.getByRole('button')).toHaveTextContent('Draw card');
  });

  it('App: gets single card by click on `Draw card` button', async () => {
    render(<App />);

    // click to fetch card
    await userEvent.click(screen.getByRole('button'));

    await screen.getByTestId('card-component');

    // card image must be in the document
    expect(screen.getByTestId('card-image')).toHaveAttribute('src', cards[0].image);
  });

  it('App: gets all cards and shows result', async () => {
    render(<App />);

    const drawCardButton = screen.getByText('Draw card');

    // Let's click 52 times to get all cards
    for (let i = 0; i < 52; i++) {
      await userEvent.click(screen.getByRole('button'));
    }

    // Button must be hidden
    expect(drawCardButton).not.toBeInTheDocument();
    // Check the result
    expect(screen.getByTestId('value-matches-count')).toHaveTextContent(
      VALUE_MATCHES_RESULT,
    );
    expect(screen.getByTestId('suit-matches-count')).toHaveTextContent(
      SUIT_MATCHES_RESULT,
    );
  });
});
