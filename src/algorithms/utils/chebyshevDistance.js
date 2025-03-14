export default function chebyshevDistance(n1, n2) {
    const x = Math.abs(n2.col - n1.col);
    const y = Math.abs(n2.row - n1.row);
    return Math.max(x, y);
}
