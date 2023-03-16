type Suits = 'HEARTS' | 'DIAMONDS' | 'CLUBS' | 'SPADES';

export type Values =
  | 'KING'
  | 'JACK'
  | 'ACE'
  | 'QUEEN'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10';

export interface CardItem {
  code: string;
  image: string;
  images: {
    png: string;
    svg: string;
  };
  suit: Suits;
  value: Values;
}

export interface DeckShape {
  suits: Record<Suits, number>;
  values: Record<Values, number>;
}

export interface AppState {
  cards: CardItem[];
  previousCard: CardItem;
  currentCard: CardItem;
  isLoading: boolean;
  error: unknown;
  hasSuitMatch: boolean;
  hasValueMatch: boolean;
  remaining: number;
  valueMatches: number;
  suitMatches: number;
  remainingDeckShape: DeckShape;
  probabilityGetValueMatch: number;
  probabilityGetSuitMatch: number;
}

interface FetchBaseResponse {
  success: boolean;
  remaining: number;
  deck_id: string;
}

export interface FetchDeckResponse extends FetchBaseResponse {
  shuffled: boolean;
}

export interface FetchCardsResponse extends FetchBaseResponse {
  cards: CardItem[];
}
