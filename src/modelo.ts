export interface Carta {
  idFoto: number; // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
  // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
  imagen: string; // por comodidad repetimos la url de la imagen
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

export const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },

  {
    idFoto: 2,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },

  {
    idFoto: 3,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },

  {
    idFoto: 4,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
  },

  {
    idFoto: 5,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
  },

  {
    idFoto: 6,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});
//crearCartaInicial(idFoto, imagen);

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  const newCards: Carta[] = infoCartas.map((carta) => ({
    idFoto: carta.idFoto,
    imagen: carta.imagen,
    estaVuelta: false,
    encontrada: false,
  }));
  return [...newCards, ...newCards];
};

//flat gets rid of nested elements. add num in brackets to increase the depth

// spead operator here: It's essentially an object with a property pointing to the same carta object, rather than being a duplicate. If hadnt used, would result in the second element of each inner array being an object containing a reference to the original carta object, rather than a duplicate of the carta object. This might lead to unexpected behavior if you modify properties of the carta object later, as it would affect both the original and the referenced objects.
//conc, if you dont make a copy, it modies the original which fucks up other fucntions.

//const coleccionDeCartas: Carta[] = [];

// infoCartas.forEach((infoCarta) => {
//   coleccionDeCartas.push({
//     idFoto: infoCarta.idFoto,
//     imagen: infoCarta.imagen,
//     estaVuelta: false,
//     encontrada: false,
//   });
//   coleccionDeCartas.push({
//     idFoto: infoCarta.idFoto,
//     imagen: infoCarta.imagen,
//     estaVuelta: false,
//     encontrada: false,
//   });
// });
//map mejor tranformar infocarta a carta y luego duplicar spread operator '...' [...arrayTransformado, ...arrayTransformado]
//red cos only including 2 properties of carta when we need 4 (esta vuelta and encontrada)

/* Aquí crearemos un array de cartas a partir de un array de infoCartas
       y duplicaremos las cartas para que haya dos de cada tipo.
    */

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

/*
    Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
    EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
  */

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
});

export let tablero: Tablero = crearTableroInicial();
