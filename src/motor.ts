import { Card, Board } from "./modelo";

const generateRandomNumber = (arrayIndex: number) =>
  Math.floor(Math.random() * (arrayIndex + 1));

const shuffleCards = (cards: Card[]): Card[] => {
  const cardsCopy = [...cards];
  for (let index = cardsCopy.length - 1; index > 0; index--) {
    let randomIndex = generateRandomNumber(index);
    [{ ...cardsCopy[index] }, { ...cardsCopy[randomIndex] }] = [
      cardsCopy[randomIndex],
      cardsCopy[index],
    ];
  }
  return cardsCopy;
};

export const startGame = (tablero: Board): void => {
  if (tablero.gameStatus === "gameNotStarted") {
    const shuffledCards = shuffleCards(tablero.cards);
    tablero.cards = [...shuffledCards];
    tablero.gameStatus = "zeroCardsFlipped";
    console.log("startGame clicked");
  }
};

export const canTurnCardOver = (tablero: Board, index: number): boolean => {
  const card = tablero.cards[index];
  if (!card.found && !card.flipped && tablero.gameStatus !== "gameNotStarted") {
    return true;
  } else {
    return false;
  }
};

export const turnCardOver = (tablero: Board, indice: number): void => {
  tablero.cards[indice].flipped = true;
  if (tablero.gameStatus === "zeroCardsFlipped") {
    tablero.flippedCardAIndex = indice;
    tablero.gameStatus = "oneCardFlipped";
  } else if (tablero.gameStatus === "oneCardFlipped") {
    tablero.flippedCardBIndex = indice;
    tablero.gameStatus = "twoCardsFlipped";
  }
};

export const checkIfPair = (
  tablero: Board,
  indiceA: number,
  indiceB: number
): boolean => {
  const cartaA = tablero.cards[indiceA];
  const cartaB = tablero.cards[indiceB];
  if (cartaA.idPhoto === cartaB.idPhoto) {
    return true;
  } else {
    return false;
  }
};

export const pairFound = (
  tablero: Board,
  indiceA: number,
  indiceB: number
): void => {
  const cartaA = tablero.cards[indiceA];
  const cartaB = tablero.cards[indiceB];
  cartaA.found = true;
  cartaA.flipped = true;
  cartaB.found = true;
  cartaB.flipped = true;
  tablero.gameStatus = "zeroCardsFlipped";
  tablero.flippedCardAIndex = undefined;
  tablero.flippedCardBIndex = undefined;
};

export const pairNotFound = (
  tablero: Board,
  indiceA: number,
  indiceB: number
) => {
  const cartaA = tablero.cards[indiceA];
  const cartaB = tablero.cards[indiceB];
  cartaA.found = false;
  cartaA.flipped = false;
  cartaB.found = false;
  cartaB.flipped = false;
  tablero.gameStatus = "zeroCardsFlipped";
  tablero.flippedCardAIndex = undefined;
  tablero.flippedCardBIndex = undefined;
};

export const isGameComplete = (tablero: Board): boolean => {
  if (
    tablero.cards.every((card) => {
      return card.flipped === true && card.found === true;
    })
  ) {
    return true;
  } else {
    return false;
  }
};
