export function sortNodesByFScore(openList)
{
  openList.sort((nodeA, nodeB) => (nodeA.fscore - nodeB.fscore));
}