export const getErrorMessage = (e: unknown) =>
  e instanceof Error ? e.message : 'Unknown error.';

export const getMatchMessage = (hasSuitMatch: boolean, hasValueMatch: boolean) => {
  if (hasSuitMatch || hasValueMatch) {
    return hasValueMatch ? 'SNAP VALUE!' : 'SNAP SUIT!';
  }

  return null;
};
