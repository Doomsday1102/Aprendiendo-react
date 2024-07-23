import { WINNER_COMBOS } from "../constants";
export const checkWinner = (boardTocheck) => {
  //revisamos las combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardTocheck[a] &&
      boardTocheck[a] === boardTocheck[b] &&
      boardTocheck[a] === boardTocheck[c]
    ) {
      return boardTocheck[a]; // x u o
    }
  }
  // si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  //revisamos si hay empate
  return newBoard.every((Square) => Square !== null);
};
