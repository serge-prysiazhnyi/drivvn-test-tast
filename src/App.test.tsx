import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterEach, expect } from 'vitest';

import App from './App';
import { BASE_URL, CARDS_IN_DECK_AMOUNT } from './constants';
import {
  mockDeckId,
  mockDeckResponse,
  mockSigleCardResponse,
  SUIT_MATCHES_RESULT,
  useCounter,
  VALUE_MATCHES_RESULT,
} from './testUtils';
import { mockedCardsCollection } from './testUtils/mockDeck';
import { FetchCardsResponse } from './types';

let responseCounter: () => number;

const server = setupServer(
  rest.get(`${BASE_URL}/new/shuffle/?deck_count=1`, (req, res, ctx) => {
    return res(ctx.json(mockDeckResponse));
  }),

  rest.get(`${BASE_URL}/${mockDeckId}/draw/?count=1`, (req, res, ctx) => {
    const count = responseCounter();
    const card = mockedCardsCollection[count];
    const newRemaining = mockedCardsCollection.length - 1 - count;

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
  responseCounter = useCounter();
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

    // renders cards counter
    expect(screen.getByTestId('remaining-counter')).toHaveTextContent(
      `Cards left: ${CARDS_IN_DECK_AMOUNT}`,
    );
  });

  it('App: gets single card by click on `Draw card` button', async () => {
    render(<App />);

    // click to fetch card
    await userEvent.click(screen.getByRole('button'));

    await screen.getByTestId('card-component');

    // card image must be in the document
    expect(screen.getByTestId('card-image')).toHaveAttribute(
      'src',
      mockedCardsCollection[0].image,
    );

    // cards counter shows correct number of rest cards
    expect(screen.getByTestId('remaining-counter')).toHaveTextContent(
      `Cards left: ${CARDS_IN_DECK_AMOUNT - 1}`,
    );
  });

  it('App: gets all cards and shows result', async () => {
    render(<App />);

    const drawCardButton = screen.getByText('Draw card');
    const cardsCounter = screen.getByTestId('remaining-counter');

    // Let's click 52 times to get all cards
    for (let i = 0; i < CARDS_IN_DECK_AMOUNT; i++) {
      await userEvent.click(screen.getByRole('button'));
    }

    // Button must be hidden
    expect(drawCardButton).not.toBeInTheDocument();

    // cards counter is hidden
    expect(cardsCounter).not.toBeInTheDocument();

    // Check the result
    expect(screen.getByTestId('value-matches-count')).toHaveTextContent(
      VALUE_MATCHES_RESULT,
    );
    expect(screen.getByTestId('suit-matches-count')).toHaveTextContent(
      SUIT_MATCHES_RESULT,
    );
  });

  it('App: shows alert component on fetch data error', async () => {
    // Throw en error
    server.use(
      rest.get(`${BASE_URL}/${mockDeckId}/draw/?count=1`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const alert = await screen.getByTestId('alert-component');

    expect(alert).toBeInTheDocument();
  });
});
