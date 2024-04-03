import { barajarCartas, sePuedeVoltearLaCarta, sonPareja } from "./motor";
import { Tablero, cartas } from "./modelo";

//boton para empezar partida que baraja cartas y crear el tablero inicial
const startButton = document.querySelector(".start");
if (
  startButton !== undefined &&
  startButton !== null &&
  startButton instanceof HTMLButtonElement
) {
  startButton.addEventListener("click", () => {
    barajarCartas(cartas);
    cartasBocaAbajo();
    //funcion para crear tablero (display none por defecto?)
  });
}

const cartasBocaAbajo = () => {
  const imageList = document.querySelectorAll(".card-img");
  if (imageList && imageList instanceof NodeList) {
    imageList.forEach((image) => {
      if (image && image instanceof HTMLImageElement) {
        image.src = /*url de un imagen boca abajo*/;
        
      }
    });
  }
};

export const flipCard = (cartaArray: InfoCarta[]) => {
  const gridImages = document.querySelectorAll(".grid-images");
  const imageList = document.querySelectorAll(".card-img");

  if (gridImages && gridImages instanceof NodeList) {
    //cant apply array methods to one html element so needed grid images to be a node list ie needed to select them ALL
    gridImages.forEach((gridImage) => {
      if (
        gridImage instanceof
        HTMLDivElement /*&& sePuedeVoltearLaCarta(carta, indice) === true*/
      ) {
        gridImage.addEventListener("click", () => {
          console.log("click");
          imageList.forEach((image) => {
            if (
              image &&
              image instanceof HTMLImageElement &&
              image.dataset.indiceImage === gridImage.dataset.indiceArray
            ) {
              let i = image.dataset.indiceId;
              if (i) {
                image.src = cartaArray[parseInt(i)].imagen;
              }
            }
          });
        });
      }
    });
  }
};

//comprobar si estamos eligiendo la segunda o primera

const EsLaSegundaCarta = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  if (cartaA.encontrada && cartaB.encontrada) {
    return true;
  } else {
    return false;
  }
};

//Comprobamos si estamos elegiendo una carta o estamos en la segunda.
//Si estamos en la segunda comprobamos si son pareja o no.
//En caso de que si las dejamos fijas.
const voltearCarta = (indiceA: number, indiceB: number, tablero: Tablero) => {
if(EsLaSegundaCarta(indiceA, indiceB, tablero) && sonPareja(indiceA, indiceB, tablero)) {
flipCard(cartaArray)
} else {
  setTimeout(() => {
    console.log("Hola");
  }, 1000);
}
}
