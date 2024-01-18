const getRandomRgbColor = (a = 1) => {
  // Número aleatorio entre 0 y 255 para rojo
  const red = Math.floor(Math.random() * 256);
  // Número aleatorio entre 0 y 255 para verde
  const green = Math.floor(Math.random() * 256);
  // Número aleatorio entre 0 y 255 para azul
  const blue = Math.floor(Math.random() * 256);

  return `rgba(${red}, ${green}, ${blue}, ${a})`;
};

export default getRandomRgbColor;
