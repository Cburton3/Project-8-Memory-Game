import { Carta, Tablero } from "./modelo";

const generarNumeroAleatorio = (indiceDelArray: number) =>
  Math.floor(Math.random() * (indiceDelArray + 1));
const barajarCartas = (cartas: Carta[]): Carta[] => {
  const copiaCartas = [...cartas];
  for (let indice = copiaCartas.length - 1; indice > 0; indice--) {
    let indiceAleatorio = generarNumeroAleatorio(indice);
    [{ ...copiaCartas[indice] }, { ...copiaCartas[indiceAleatorio] }] = [
      copiaCartas[indiceAleatorio],
      copiaCartas[indice],
    ];
  }
  return copiaCartas;
};





// export const barajarCartas = (cartas: Carta[]): Carta[] => {//doesnt work cos the indice for 2 cards is the same 
//   const shuffledArray: Carta[] = cartas.slice();

//   // Start from the end of the array
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     //what this work in positive?
//     // Generate a random index between 0 and i (inclusive)
//     const randomIndex: number = Math.floor(Math.random() * (i + 1));

//     // Swap elements between current index and random index
//     [shuffledArray[i], shuffledArray[randomIndex]] = [
//       shuffledArray[randomIndex],
//       shuffledArray[i],
//     ];
//   }

//   return shuffledArray;
// };

/*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const carta = tablero.cartas[indice];
  return !carta.estaVuelta && !carta.encontrada; //returns true/false
}; //doesnt work cos the indice was already used?

/*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */
export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  const cartaA = tablero.cartas[indiceA]; //this is an index used to access an element within 'cartas' and not a property that is in the interface
  const cartaB = tablero.cartas[indiceB];

  if (cartaA.idFoto === cartaB.idFoto) {
    return true;
  } else {
    return false;
  }
  // if (tablero.indiceCartaVolteadaA === tablero.indiceCartaVolteadaB) {
  //   return true; you wouldnt use these are we are just putting the parameters not the actual things
  // }
};

/*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  //this void means it dont return no value
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  cartaA.estaVuelta = true;
  cartaA.encontrada = true;
  cartaB.estaVuelta = true;
  cartaB.encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas"; //resetea
};

/*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
export const parejaNoEncontrada = (//this function is wrong as the cards are flipped
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];

  cartaA.estaVuelta = false;
  cartaA.encontrada = false;
  cartaB.estaVuelta = false;
  cartaB.encontrada = false;
  tablero.estadoPartida = "CeroCartasLevantadas";
};

/*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
export const esPartidaCompleta = (tablero: Tablero): boolean => {
  if (
    tablero.cartas.every((carta) => {
      carta.estaVuelta === true;
      carta.encontrada === true;
    })
  ) {
    return true;
  } else {
    return false;
  }
};

/*
  Iniciar partida
  */

export const iniciaPartida = (tablero: Tablero): void => {
  const cartasBarajadas = barajarCartas(tablero.cartas);
  tablero.cartas = [...cartasBarajadas]; //this assigns the array of cartasBarajadas as a copy. without ... i'm assigning the var and not the array itself so any changes to tablero.cartas will also affect cartasBarajadas. By making a copy, they dont. As I use and make changes to tablero.cartas, it would change cartasBarajadas
  tablero.estadoPartida = "CeroCartasLevantadas";
};

export const voltearLaCarta = (tablero: Tablero, indice: number) => {
  tablero.cartas[indice].estaVuelta = true;
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

//here i put a fx with 'cartas' butneed to use tablero as 'cartas is part of tablero as cant access cartas WITHOUT tablero...only exists there
