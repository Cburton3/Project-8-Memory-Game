import { Board, tablero } from "./modelo";
import {
  startGame,
  canTurnCardOver,
  checkIfPair,
  turnCardOver,
  pairFound,
  pairNotFound,
  isGameComplete,
} from "./motor";

export const createBoard = () => {
  startGameMessage(tablero);
  for (let indice = 0; indice < tablero.cards.length; indice++) {
    mapIndices(tablero, indice);
  }
};

export const prepGame = (): void => {
  const startButton = document.getElementById("start");
  if (startButton && startButton instanceof HTMLButtonElement) {
    startButton.addEventListener("click", () => {
      startGame(tablero);
      startGameMessage(tablero);
    });
  }
};

const mapIndices = (tablero: Board, indice: number): void => {
  const divIndice = `[data-indice-id="${indice}"]`;
  const divElement = document.querySelector(`div${divIndice}`);
  const imgElement = document.querySelector(`img${divIndice}`);
  if (
    divElement &&
    divElement instanceof HTMLDivElement &&
    imgElement &&
    imgElement instanceof HTMLImageElement
  ) {
    divElement.addEventListener("click", () => {
      showCardFx(tablero, indice, imgElement);
    });
  }
};

const showCardFx = (
  tablero: Board,
  indice: number,
  imgElement: HTMLImageElement
): void => {
  if (canTurnCardOver(tablero, indice)) {
    const imgUrl = tablero.cards[indice].image;
    turnCardOver(tablero, indice);
    showImg(imgElement, imgUrl);
    checkIndices(tablero);

    console.log(tablero.cards);
  } else {
    console.log("Card cannot be turned over");
  }
};

const showImg = (imgElement: HTMLImageElement, imgUrl: string) => {
  imgElement.src = imgUrl;
  imgElement.style.backgroundColor = "#B799FF";
  imgElement.style.transform = "rotateY(180deg)";
  imgElement.style.transition = "all 0.5s linear";
};

const checkIndices = (tablero: Board): void => {
  const indiceA = tablero.flippedCardAIndex;
  const indiceB = tablero.flippedCardBIndex;
  if (indiceA !== undefined && indiceB !== undefined) {
    if (checkIfPair(tablero, indiceA, indiceB)) {
      pairFound(tablero, indiceA, indiceB);
      console.log("hello");
      gameComplete(tablero);
    } else {
      pairNotFound(tablero, indiceA, indiceB);
      resetCards(tablero);
    }
  }
};

const resetCards = (tablero: Board): void => {
  setTimeout(() => {
    for (let indice = 0; indice < tablero.cards.length; indice++) {
      if (!tablero.cards[indice].found && !tablero.cards[indice].flipped) {
        const divIndice = `[data-indice-id="${indice}"]`;
        const imgElement = document.querySelector(`img${divIndice}`);
        if (imgElement && imgElement instanceof HTMLImageElement) {
          imgElement.src = "";
        }
      }
    }
  }, 750);
};

const gameComplete = (tablero: Board) => {
  if (isGameComplete(tablero)) {
    const parentElement = document.getElementById("message");
    const newDiv = document.createElement("p");
    newDiv.textContent = "You have successfully completed the game";
    if (
      newDiv instanceof HTMLParagraphElement &&
      parentElement &&
      parentElement instanceof HTMLDivElement
    ) {
      parentElement.appendChild(newDiv);
    }
  }
};

const startGameMessage = (tablero: Board) => {
  const parentElement = document.getElementById("message");
  const newDiv = document.createElement("p");

  if (tablero.gameStatus === "gameNotStarted") {
    newDiv.textContent = "Please press Start Game button to begin";
    newDiv.classList.add("newDiv");
    if (
      newDiv &&
      newDiv instanceof HTMLParagraphElement &&
      parentElement &&
      parentElement instanceof HTMLDivElement
    ) {
      parentElement.appendChild(newDiv);
    }
  } else if (tablero.gameStatus === "zeroCardsFlipped") {
    const div = document.querySelector(".newDiv");
    if (div && div instanceof HTMLParagraphElement) {
      div.style.display = "none";
    }
  }
};
