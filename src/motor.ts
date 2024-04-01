import { Carta, Tablero, cartas, infoCartas } from "./modelo";

const barajarCartas = (cartas : Carta[]): Carta[] => { 
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
  const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    const carta = tablero.cartas[indice];
    if (!carta.estaVuelta && !carta.encontrada) {
      return true;
    } else {
      return false;
    }
  }
  
  const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    const carta = tablero.cartas[indice];
    if(sePuedeVoltearLaCarta(tablero, indice) === true) {
      flipCard(cartaArray)
    }
  }
  
  /*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */
  export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    if(infoCartas.idFoto)
  }
  
  /*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
  const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    //...
  }
  
  /*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
  const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    // ...
  }
  
  /*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
  export const esPartidaCompleta(tablero: Tablero) : boolean => {
    //...
  }
  
  /*
  Iniciar partida
  */
  
  export const iniciaPartida = (tablero: Tablero): void => {
    //...
  };