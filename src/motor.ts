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

export const startGame = (tablero: Tablero): void => {
  const cartasBarajadas = barajarCartas(tablero.cartas);
  tablero.cartas = [...cartasBarajadas]; 
  tablero.estadoPartida = "CeroCartasLevantadas";
  console.log('startGame clicked')
};

export const canTurnCardOver = (tablero: Tablero, indice: number): boolean => {
  const carta = tablero.cartas[indice];
  if (!carta.encontrada && !carta.estaVuelta &&
    tablero.estadoPartida !== "PartidaNoIniciada" ) {
    return true;
  } else {
    return false;
  }
};

export const turnCardOver = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice; 
    tablero.estadoPartida = "UnaCartaLevantada";
    //here cannot click on the pics
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};


export const checkIfPair = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): boolean => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];
  if (cartaA.idFoto === cartaB.idFoto) {
    return true;
  } else {
    return false;
  }
};

export const pairFound = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];
  cartaA.encontrada = true;
  cartaA.estaVuelta = true;
  cartaB.encontrada = true;
  cartaB.estaVuelta = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const pairNotFound = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  const cartaA = tablero.cartas[indiceA];
  const cartaB = tablero.cartas[indiceB];
  cartaA.encontrada = false;
  cartaA.estaVuelta = false;
  cartaB.encontrada = false;
  cartaB.estaVuelta = false;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const isGameComplete = (tablero: Tablero): boolean => {
  if (
    tablero.cartas.every((carta) => {
      return carta.estaVuelta === true && carta.encontrada === true;
    })
  ) {
    return true;
  } else {
    return false;
  }
};
