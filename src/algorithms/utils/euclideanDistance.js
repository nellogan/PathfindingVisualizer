export default function euclideanDistance(n1, n2) {
  const dy = n2.row - n1.row;
  const dx = n2.col - n1.col;
  return Math.sqrt((dx*dx) + (dy*dy));
}
