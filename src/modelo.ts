export interface Card {
  idPhoto: number;
  image: string;
  flipped: boolean;
  found: boolean;
}

interface InfoCard {
  idPhoto: number;
  image: string;
}

export const infoCartas: InfoCard[] = [
  {
    idPhoto: 1,
    image:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },

  {
    idPhoto: 2,
    image:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },

  {
    idPhoto: 3,
    image:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },

  {
    idPhoto: 4,
    image:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
  },

  {
    idPhoto: 5,
    image:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
  },

  {
    idPhoto: 6,
    image:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
];

export const createStartingCard = (idPhoto: number, imagen: string): Card => ({
  idPhoto: idPhoto,
  image: imagen,
  flipped: false,
  found: false,
});

type GameStatus =
  | "gameNotStarted"
  | "zeroCardsFlipped"
  | "oneCardFlipped"
  | "twoCardsFlipped"
  | "GameComplete";

export interface Board {
  cards: Card[];
  gameStatus: GameStatus;
  flippedCardAIndex?: number;
  flippedCardBIndex?: number;
}

const doubleCards = (infoCartas: InfoCard[]): Card[] => {
  const newCards: Card[] = infoCartas.map((card) => ({
    idPhoto: card.idPhoto,
    image: card.image,
    found: false,
    flipped: false,
  }));
  return [...newCards, ...newCards];
};

export let cartas: Card[] = doubleCards(infoCartas);

const createStartBoard = (): Board => ({
  cards: cartas,
  gameStatus: "gameNotStarted",
});

export let tablero: Board = createStartBoard();
