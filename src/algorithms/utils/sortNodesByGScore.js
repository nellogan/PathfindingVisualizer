export default function sortNodesByGScore(openList) {
  openList.sort((nodeA, nodeB) => (nodeA.gscore - nodeB.gscore));
}
