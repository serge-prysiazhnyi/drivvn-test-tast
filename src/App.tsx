import './App.css';

import React, { useCallback, useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import { fetchData } from './apiService';
import { Button } from './components/Button';
import { Cards } from './components/Cards';
import { Match } from './components/Match';
import { Result } from './components/Result';
import { ProbabilityInfo } from './components/ProbabilityInfo';
import { RemainingCounter } from './components/RemainingCounter';
import { BASE_URL, CARDS_IN_DECK_AMOUNT } from './constants';
import {
  getErrorMessage,
  getMatchMessage,
  initialDeckShape,
  estimateProbabilityGetMatch,
} from './helpers';
import { AppState, FetchCardsResponse, FetchDeckResponse } from './types';

function App() {
  const [state, setState] = useState<AppState>({
    cards: null,
    previousCard: null,
    currentCard: null,
    isLoading: false,
    error: null,
    hasSuitMatch: false,
    hasValueMatch: false,
    remaining: CARDS_IN_DECK_AMOUNT,
    valueMatches: 0,
    suitMatches: 0,
    remainingDeckShape: initialDeckShape,
    probabilityGetValueMatch: null,
    probabilityGetSuitMatch: null,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        const deckDataResponse: FetchDeckResponse = await fetchData(
          `${BASE_URL}/new/shuffle/?deck_count=1`,
        );

        // Fetch all deck to improve performance and avoid unnecessary requests by clicking draw btn
        const cardsResponse: FetchCardsResponse = await fetchData(
          `${BASE_URL}/${deckDataResponse.deck_id}/draw/?count=${CARDS_IN_DECK_AMOUNT}`,
        );

        setState((prevState) => ({
          ...prevState,
          cards: cardsResponse.cards,
          remaining: deckDataResponse.remaining,
          isLoading: false,
        }));
      } catch (e) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: getErrorMessage(e),
        }));
      }
    };
    getData();
  }, [state.error]);

  const handleGetCard = useCallback(async () => {
    setState((prevState) => {
      const newCurrent = prevState.cards[prevState.remaining - 1];
      const hasSuitMatch = prevState.currentCard?.suit === newCurrent.suit;
      const hasValueMatch = prevState.currentCard?.value === newCurrent.value;
      const newRemainingDeckShape = {
        suits: {
          ...prevState.remainingDeckShape.suits,
          [newCurrent.suit]: prevState.remainingDeckShape.suits[newCurrent.suit] - 1,
        },
        values: {
          ...prevState.remainingDeckShape.values,
          [newCurrent.value]: prevState.remainingDeckShape.values[newCurrent.value] - 1,
        },
      };

      return {
        ...prevState,
        currentCard: newCurrent,
        previousCard: prevState.currentCard,
        hasSuitMatch,
        hasValueMatch,
        valueMatches: hasValueMatch ? prevState.valueMatches + 1 : prevState.valueMatches,
        suitMatches: hasSuitMatch ? prevState.suitMatches + 1 : prevState.suitMatches,
        remaining: prevState.remaining - 1,
        remainingDeckShape: newRemainingDeckShape,
        probabilityGetSuitMatch: estimateProbabilityGetMatch(
          newRemainingDeckShape.suits[newCurrent.suit],
          initialDeckShape.suitsNumber - 1,
        ),
        probabilityGetValueMatch: estimateProbabilityGetMatch(
          newRemainingDeckShape.values[newCurrent.value],
          initialDeckShape.valuesNumber - 1,
        ),
      };
    });
  }, [state.remaining]);

  const handleClearError = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  }, []);

  const matchMessage = getMatchMessage(state.hasSuitMatch, state.hasValueMatch);

  return (
    <Container className={state.isLoading ? 'AppLoading my-3' : 'my-3'}>
      {state.remaining > 0 ? <Match message={matchMessage} /> : <Match message={null} />}
      <Cards cards={[state.previousCard, state.currentCard]} />
      {state.error ? (
        <Alert
          variant="danger"
          onClose={handleClearError}
          className="mt-3"
          dismissible
          data-testid="alert-component"
        >
          {`${state.error}`}
        </Alert>
      ) : state.remaining > 0 ? (
        <>
          <Button onClick={handleGetCard} disabled={state.isLoading} />
          <RemainingCounter remaining={state.remaining} />
          <ProbabilityInfo
            label="Probability of suit match:"
            percentage={state.probabilityGetSuitMatch}
            dataTestId="probabilityOfSuitMatch"
          />
          <ProbabilityInfo
            label="Probability of value match:"
            percentage={state.probabilityGetValueMatch}
            dataTestId="probabilityOfValueMatch"
          />
        </>
      ) : (
        <Result valueMatches={state.valueMatches} suitMatches={state.suitMatches} />
      )}
    </Container>
  );
}

export default App;
