export const getErrorMessage = (e: unknown) =>
  e instanceof Error ? e.message : 'Unknown error.';

export const getMatchMessage = (hasSuitMatch: boolean, hasValueMatch: boolean) => {
  if (hasSuitMatch || hasValueMatch) {
    return hasValueMatch ? 'SNAP VALUE!' : 'SNAP SUIT!';
  }

  return null;
};

export const initialDeckShape = {
  suits: {
    CLUBS: 13,
    DIAMONDS: 13,
    HEARTS: 13,
    SPADES: 13,
  },
  values: {
    '2': 4,
    '3': 4,
    '4': 4,
    '5': 4,
    '6': 4,
    '7': 4,
    '8': 4,
    '9': 4,
    '10': 4,
    ACE: 4,
    JACK: 4,
    KING: 4,
    QUEEN: 4,
  },
  suitsNumber: 13,
  valuesNumber: 4,
};

export const estimateProbabilityGetMatch = (
  currentAmount: number,
  initialAmount: number,
) => {
  // Probability in percents
  return Math.round((currentAmount / initialAmount) * 100);
};
