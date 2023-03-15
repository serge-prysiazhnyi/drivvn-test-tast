import './App.css';

import React, { useCallback, useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import { fetchData } from './apiService';
import { Button } from './components/Button';
import { Cards } from './components/Cards';
import { Match } from './components/Match';
import { Result } from './components/Result';
import { BASE_URL } from './constants';
import { getErrorMessage, getMatchMessage } from './helpers';
import { AppState, FetchCardsResponse, FetchDeckResponse } from './types';

function App() {
  const [state, setState] = useState<AppState>({
    deckId: null,
    previousCard: null,
    currentCard: null,
    isLoading: false,
    error: null,
    hasSuitMatch: false,
    hasValueMatch: false,
    remaining: 52,
    valueMatches: 0,
    suitMatches: 0,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
        }));
        const res: FetchDeckResponse = await fetchData(
          `${BASE_URL}/new/shuffle/?deck_count=1`,
        );
        setState((prevState) => ({
          ...prevState,
          deckId: res.deck_id,
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
  }, []);

  const handleGetCard = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const res: FetchCardsResponse = await fetchData(
        `${BASE_URL}/${state.deckId}/draw/?count=1`,
      );

      if (res.success) {
        setState((prevState) => {
          const newCurrent = res.cards[0];
          const hasSuitMatch = prevState.currentCard?.suit === newCurrent.suit;
          const hasValueMatch = prevState.currentCard?.value === newCurrent.value;

          return {
            ...prevState,
            previousCard: prevState.currentCard,
            currentCard: newCurrent,
            isLoading: false,
            hasSuitMatch,
            hasValueMatch,
            valueMatches: hasValueMatch
              ? prevState.valueMatches + 1
              : prevState.valueMatches,
            suitMatches: hasSuitMatch ? prevState.suitMatches + 1 : prevState.suitMatches,
            remaining: res.remaining,
          };
        });
      }
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: getErrorMessage(e),
      }));
    }
  }, [state.deckId]);

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
      {state.remaining > 0 ? (
        <Button onClick={handleGetCard} disabled={state.isLoading} />
      ) : (
        <Result valueMatches={state.valueMatches} suitMatches={state.suitMatches} />
      )}
      {state.error && (
        <Alert variant="danger" onClose={handleClearError} className="mt-3" dismissible>
          {state.error}
        </Alert>
      )}
    </Container>
  );
}

export default App;
