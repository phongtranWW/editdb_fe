// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateNodePosition(index: number, existingNodes: any[]) {
  const gridSize = 400;
  const cols = 4;

  let row = Math.floor(index / cols);
  let col = index % cols;

  let position = {
    x: col * gridSize,
    y: row * gridSize,
  };

  while (
    existingNodes.some(
      (node) =>
        Math.abs(node.position.x - position.x) < 250 &&
        Math.abs(node.position.y - position.y) < 200
    )
  ) {
    col++;
    if (col >= cols) {
      col = 0;
      row++;
    }
    position = {
      x: col * gridSize,
      y: row * gridSize,
    };
  }

  return position;
}
