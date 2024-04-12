import {
  sePuedeVoltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
  iniciaPartida,
  voltearLaCarta,
} from "./motor";

import { Tablero, tablero } from "./modelo";

//boton para empezar partida que baraja cartas y crear el tablero inicial

export const agregarEventoInicioPartida = () => {
  const startButton = document.getElementById("start");
  if (startButton && startButton instanceof HTMLButtonElement) {
    startButton.addEventListener("click", () => {
      clickButtonEmpezarPartida();
    });
  }
};

export const crearTablero = () => {
  for (let i = 0; i < tablero.cartas.length; i++) {
    mapearDivsCartas(i, tablero);
  }
};

const mapearDivsCartas = (indice: number, tablero: Tablero) => {
  const dataIndiceId = `[data-indice-id="${indice}"]`; //nombre del propriedad
  const elementoDiv = document.querySelector(`div${dataIndiceId}`); // ref elemento del div
  const elementoImg = document.querySelector(`img${dataIndiceId}`); // ref imagen
  if (
    elementoDiv &&
    elementoDiv instanceof HTMLDivElement &&
    elementoImg &&
    elementoImg instanceof HTMLImageElement
  ) {
    elementoDiv.addEventListener("click", () => {
      handleDivCarta(elementoImg, tablero, indice);
    });
  }
};

const handleDivCarta = (
  elementoImg: HTMLImageElement,
  tablero: Tablero,
  indiceCarta: number
) => {
  if (sePuedeVoltearLaCarta(tablero, indiceCarta)) {
    const urlImg = tablero.cartas[indiceCarta].imagen;
    console.log(urlImg);
    voltearLaCarta(tablero, indiceCarta);//good
    mostrarImagenAnimal(elementoImg, urlImg);//good
    esPareja(tablero);
    console.log(tablero.cartas);
  } else {
    console.log("No se puede voltear la carta");
  }
};

const esPareja = (tablero: Tablero) => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;

  if (indiceA && indiceB) {
    if (sonPareja(indiceA, indiceB, tablero)) {
      parejaEncontrada(tablero, indiceA, indiceB);
    } else {
      parejaNoEncontrada(tablero, indiceA, indiceB);
      resetearCartas(tablero);
    }
  }
};

const mostrarImagenAnimal = (elementoImg: HTMLImageElement, urlImg: string) => {
  elementoImg.src = urlImg;
  elementoImg.style.backgroundColor = "#B799FF";
  elementoImg.style.transform = "rotateY(180deg)"; //le da la vuelta
  elementoImg.style.transition = "all 0.5s linear";
};

const clickButtonEmpezarPartida = () => {
  iniciaPartida(tablero);
};

const resetearCartas = (
  tablero: Tablero
  // indiceA: number,
  // indiceB: number
): void => {
  // const cartaA = tablero.cartas[indiceA];
  // const cartaB = tablero.cartas[indiceB];
  // if(cartaA.estaVuelta === true && cartaB.estaVuelta === true && !cartaB.encontrada) {
  //   cartaA.imagen = '';
  //   cartaB.imagen = '';
  // }
  for (let indice = 0; indice < tablero.cartas.length; indice++) {
    if (
      tablero.cartas[indice].estaVuelta &&
      !tablero.cartas[indice].encontrada
    ) {
      const dataIndiceId = `[data-indice-id="${indice}"]`; //nombre del propriedad
      const elementoImg = document.querySelector(`img${dataIndiceId}`); // ref imagen. this is just how to select the data set from inside the html tag
      if (elementoImg && elementoImg instanceof HTMLImageElement) {
        elementoImg.src = "";
      }
    }
  }
}; //un bucle mejor

//encontrada es que se ha encontrado la pareja

//Issue is the cards are created as an obj but the function that assigns the src to the html for the second set isnt working

//things left to do:

//make sure the shuffle actually works cos first 6 clicks work then nothing. no alli por defecto, its just the first 6
//cards need to be turned back over if second has got same indice
//when 2 cards have been flipped, and no pareja, flip back
//when click empezar partida, all cards ned to flip back

// const cartasBocaAbajo = () => {
//   const imageList = document.querySelectorAll(".card-img");
//   if (imageList && imageList instanceof NodeList) {
//     imageList.forEach((image) => {
//       if (image && image instanceof HTMLImageElement) {
//         image.src = /*url de un imagen boca abajo*/;

//       }
//     });
//   }
// };

// const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
//   if(sePuedeVoltearLaCarta(tablero, indice) === true) {
//     flipCard(cartaArray) //need to export from ui (no mesclar motor con ui (al reves ok))
//   }
// }

// const flipCard = (cartaArray: InfoCarta[]) => {
//   const gridImages = document.querySelectorAll(".grid-images");
//   const imageList = document.querySelectorAll(".card-img");

//   if (gridImages && gridImages instanceof NodeList) {
//     //cant apply array methods to one html element so needed grid images to be a node list ie needed to select them ALL
//     gridImages.forEach((gridImage) => {
//       if (
//         gridImage instanceof
//         HTMLDivElement /*&& sePuedeVoltearLaCarta(carta, indice) === true*/
//       ) {
//         gridImage.addEventListener("click", () => {
//           console.log("click");
//           imageList.forEach((image) => {
//             if (
//               image &&
//               image instanceof HTMLImageElement &&
//               image.dataset.indiceImage === gridImage.dataset.indiceId
//             ) {
//               let i = image.dataset.indiceId;
//               if (i) {
//                 image.src = cartaArray[parseInt(i)].imagen;
//               }
//             }
//           });
//         });
//       }
//     });
//   }
// };

//comprobar si estamos eligiendo la segunda o primera
// const primeraOSegundaCarta = (tablero: Tablero) : boolean => {
// if(tablero.estadoPartida === "UnaCartaLevantada") {
//   return
// }
// if(tablero.estadoPartida === "DosCartasLevantadas")
// }

// if(sonPareja(indiceA, indiceB, tablero) === true){ //this in ui if no pareja no encontrada
//   cartaA.encontrada && cartaB.encontrada === true;

// const EsLaSegundaCarta = (
//   indiceA: number,
//   indiceB: number,
//   tablero: Tablero
// ): boolean => {
//   const cartaA = tablero.cartas[indiceA];
//   const cartaB = tablero.cartas[indiceB];

//   if (cartaA.encontrada && cartaB.encontrada) {
//     return tablero.estadoPartida === "UnaCartaLevantada";//true
//   } else {
//     return tablero.estadoPartida === "DosCartasLevantadas"; //false
//   }
// };

//Comprobamos si estamos elegiendo una carta o estamos en la segunda.
//Si estamos en la segunda comprobamos si son pareja o no.
//En caso de que si las dejamos fijas.
// const voltearCarta = (indiceA: number, indiceB: number, tablero: Tablero) => {
// if(EsLaSegundaCarta(indiceA, indiceB, tablero) && sonPareja(indiceA, indiceB, tablero)) {
// flipCard(cartaArray)
// } else {
//   setTimeout((cartas : Carta[]) => {
//     //pon estado sin voltear
//     const cartaA = tablero.cartas[indiceA].estaVuelta === false; //this only works as the [indice makes it one carta]
//     const cartaB = tablero.cartas[indiceB].estaVuelta === false;
//   }, 1000);
// }
// }
