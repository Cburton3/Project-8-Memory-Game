import { Tablero, tablero } from "./modelo";

import {
  startGame,
  canTurnCardOver,
  checkIfPair,
  turnCardOver,
  pairFound,
  pairNotFound,
  isGameComplete,
} from "./motor";

export const prepGame = (): void => {
  const startButton = document.getElementById("start");
  if (startButton && startButton instanceof HTMLButtonElement) {
    startButton.addEventListener("click", () => startGame(tablero));
  }
};

export const crearTablero = () => {
  for (let indice = 0; indice < tablero.cartas.length; indice++) {
    mapIndices(tablero, indice);
  }
};

const mapIndices = (tablero: Tablero, indice: number): void => {
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
  tablero: Tablero,
  indice: number,
  imgElement: HTMLImageElement
): void => {
  if (canTurnCardOver(tablero, indice)) {
    const imgUrl = tablero.cartas[indice].imagen;
    turnCardOver(tablero, indice);
    showImg(imgElement, imgUrl);
    checkIndices(tablero);

    console.log(tablero.cartas);
  } else {
    console.log("No se puede voltear la carta");
  }
};

const showImg = (imgElement: HTMLImageElement, imgUrl: string) => {
  imgElement.src = imgUrl;
  imgElement.style.backgroundColor = "#B799FF";
  imgElement.style.transform = "rotateY(180deg)";
  imgElement.style.transition = "all 0.5s linear";
};

const checkIndices = (tablero: Tablero): void => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
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

const resetCards = (tablero: Tablero): void => {
  setTimeout(() => {
    for (let indice = 0; indice < tablero.cartas.length; indice++) {
      if (
        !tablero.cartas[indice].encontrada &&
        !tablero.cartas[indice].estaVuelta
      ) {
        const divIndice = `[data-indice-id="${indice}"]`;
        const imgElement = document.querySelector(`img${divIndice}`);
        if (imgElement && imgElement instanceof HTMLImageElement) {
          imgElement.src = "";
        }
      }
    }
  }, 1000);
};

const gameComplete = (tablero: Tablero) => {
  if (isGameComplete(tablero)) {
    const parentElement = document.getElementById("endGame");
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
