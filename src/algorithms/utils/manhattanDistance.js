export default function manhattanDistance(n1, n2) {
  const dy = Math.abs(n2.row - n1.row);
  const dx = Math.abs(n2.col - n1.col);
  return dx + dy;
}
