type Suits = 'HEARTS' | 'DIAMONDS' | 'CLUBS' | 'SPADES';

export interface CardItem {
  code: string;
  image: string;
  images: {
    png: string;
    svg: string;
  };
  suit: Suits;
  value: string;
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
