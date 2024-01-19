export default interface responsePredictProps {
  boxes: Array<[number, number, number, number]>; // Un arreglo de arreglos de cuatro números
  labels: string[]; // Un arreglo de strings
  scores: number[]; // Un arreglo de números
  image_width: number; // Un número
  image_height: number;
}
