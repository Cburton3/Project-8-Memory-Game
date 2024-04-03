import { Carta, Tablero, cartas, } from "./modelo";
import { flipCard } from "./ui";

export const barajarCartas = (cartas : Carta[]): Carta[] => { 
    const shuffledArray: Carta[] = cartas.slice();
  
    // Start from the end of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) { //what this work in positive?
      // Generate a random index between 0 and i (inclusive)
      const randomIndex: number = Math.floor(Math.random() * (i + 1));
  
      // Swap elements between current index and random index
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
  
    return shuffledArray;
  }
  
  /*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
  export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    const carta = tablero.cartas[indice];
    if (!carta.estaVuelta && !carta.encontrada) {
      return true;
    } else {
      return false;
    }
  }
  
  const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    if(sePuedeVoltearLaCarta(tablero, indice) === true) {
      flipCard(cartaArray) //need to export from ui
    }
  }
  
  /*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */
  export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    const cartaA = tablero.cartas[indiceA];//this is an index used to access an element within 'cartas' and not a property that is in the interface
    const cartaB = tablero.cartas[indiceB];

    if (cartaA.idFoto === cartaB.idFoto) {
      return true;
    } else {
      return false;
    }
    // if (tablero.indiceCartaVolteadaA === tablero.indiceCartaVolteadaB) {
    //   return true; you wouldnt use these are we are just putting the parameters not the actual things
    // } 
  }
  
  /*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
  const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];
    if(sonPareja(indiceA, indiceB, tablero) === true){
      cartaA.encontrada && cartaB.encontrada === true;
    }
  }
  
  /*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
  const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {//how to get back to original 
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];
    if (cartaA.idFoto !== cartaB.idFoto) {
      tablero.cartas[indiceA].estaVuelta = false;
      tablero.cartas[indiceB].estaVuelta = false; 
      //fx que los pone boca abajo?
      }
    }
  
  /*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
  export const esPartidaCompleta = (tablero: Tablero) : boolean => {
    const cartas = tablero.cartas;

    for (let i = 0; i < cartas.length; i++) {
      const carta = cartas[i];

      if (!carta.encontrada) {
        return false;
      }
    }
    return true;
  }
  
  /*
  Iniciar partida
  */
  
  export const iniciaPartida = (tablero: Tablero): void => {
    barajarCartas(cartas); 
    //voltearLaCarta(cartas, idFoto); no para empezar sino para cuando user haga click
    //parejaEncontrada(tablero, indiceA, indiceB)
    //parejaNoEncontrada(tablero, indiceA, indiceB)
  };

  //here i put a fx with 'cartas' butneed to use tablero as 'cartas is part of tablero