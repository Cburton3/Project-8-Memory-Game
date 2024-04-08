import { sePuedeVoltearLaCarta, sonPareja, parejaEncontrada, parejaNoEncontrada, iniciaPartida, voltearLaCarta} from "./motor";
import { Carta, Tablero, cartas, tablero } from "./modelo";

//boton para empezar partida que baraja cartas y crear el tablero inicial


export const agregarEventoInicioPartida = () => {
  const startButton = document.getElementById("start");
  if (
    startButton &&
    startButton instanceof HTMLButtonElement
  ) {
    startButton.addEventListener("click", () => {
    clickButtonEmpezarPartida();
    });
  }
};

export const crearTablero = () => {
  for(let i = 0; i < tablero.cartas.length; i++ ) {
    mapearDivsCartas(i, tablero)
  }
}

const mapearDivsCartas = (indice : number, tablero : Tablero) => {
  const dataIndiceId = `[data-indice-id="${indice}"]`;//nombre del propriedad
  const elementoDiv = document.querySelector(`div${dataIndiceId}`); // ref elemento del div
  const elementoImg = document.querySelector(`img${dataIndiceId}`);// ref imagen
  if(elementoDiv && elementoDiv instanceof HTMLDivElement && elementoImg && elementoImg instanceof HTMLImageElement) {
    elementoDiv.addEventListener('click', () => {
      handleDivCarta(elementoImg, tablero, indice)
    })
  }
}

const handleDivCarta = (elementoImg: HTMLImageElement, tablero: Tablero, indiceCarta: number) => {
  if(sePuedeVoltearLaCarta(tablero, indiceCarta)) {
    const urlImg = tablero.cartas[indiceCarta].imagen;
    voltearLaCarta(tablero, indiceCarta);
    mostrarImagenAnimal(elementoImg, urlImg);
    esPareja(tablero, indiceA, indice);
    //fx that son pareja o no por los indices esta vuelta true, estado partida goes to 0cartas levantadas si no son pareja, esta vuelta/encontrada == false y estado partida = 0 cartas levantadas
    console.log(tablero.cartas)
  } else {
    console.log('No se puede voltear la carta')
  }
};

const esPareja = (tablero: Tablero, indiceA: number, indiceB: number) => {
if (sonPareja(indiceA, indiceB, tablero) === true) {
  parejaEncontrada(tablero, indiceA, indiceB)
} else {
  parejaNoEncontrada(tablero, indiceA, indiceB)
}
};

const mostrarImagenAnimal = (elementoImg: HTMLImageElement, urlImg: string) => {
  elementoImg.src = urlImg
  elementoImg.style.backgroundColor = "#B799FF";
  elementoImg.style.transform = "rotateY(180deg)";//le da la vuelta
  elementoImg.style.transition = "all 0.5s linear";
};



const clickButtonEmpezarPartida = () => {
  iniciaPartida(tablero);
};



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
