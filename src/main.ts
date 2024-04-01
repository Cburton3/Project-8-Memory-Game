interface InfoCarta {
  idFoto: number;
  imagen: string;
}

// Prueba 5

const cartaArray: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },
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
    idFoto: 5,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
  },
  {
    idFoto: 6,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
  {
    idFoto: 6,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
];

const flipCard = (cartaArray: InfoCarta[]) => {
  const gridImages = document.querySelectorAll(".grid-images");
  const imageList = document.querySelectorAll(".card-img");

  if (gridImages && gridImages instanceof NodeList) {
    gridImages.forEach((gridImage) => {
      if (gridImage instanceof HTMLDivElement) {
        gridImage.addEventListener("click", () => {
          console.log("click");
          imageList.forEach((image) => {
            if (
              image &&
              image instanceof HTMLImageElement &&
              image.dataset.indiceId === gridImage.dataset.indiceId
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
flipCard(cartaArray);
